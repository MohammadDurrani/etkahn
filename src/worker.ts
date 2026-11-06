import { email, otherService, services } from './data/site';

const maxBodyBytes = 16_384;
const serviceOptions = new Set([...services.map(({ title }) => title), otherService]);
const replyAddress = /^[a-z\d!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z\d!#$%&'*+/=?^_`{|}~-]+)*@[a-z\d](?:[a-z\d-]*[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]*[a-z\d])?)+$/i;

async function readInquiry(body: ReadableStream<Uint8Array>) {
  const reader = body.getReader();
  const bytes = new Uint8Array(maxBodyBytes);
  let length = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (length + value.length > maxBodyBytes) {
        await reader.cancel();
        return { tooLarge: true } as const;
      }
      bytes.set(value, length);
      length += value.length;
    }
    const data: unknown = JSON.parse(new TextDecoder().decode(bytes.subarray(0, length)));
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      return { fields: data as Record<string, unknown> };
    }
  } catch {
    return {};
  } finally {
    reader.releaseLock();
  }
  return {};
}

function validWebsite(value: string) {
  if (!value) return true;
  const url = URL.parse(value);
  return url?.protocol === 'https:' || url?.protocol === 'http:';
}

function json(status: number, sent = false, headers?: HeadersInit) {
  const response = Response.json({ sent }, { status, headers });
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/contact') return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return json(405, false, { Allow: 'POST' });
    if (request.headers.get('Origin') !== url.origin) return json(403);
    const contentType = request.headers.get('Content-Type')?.split(';', 1)[0].trim().toLowerCase();
    if (contentType !== 'application/json' || !request.body) return json(415);
    if (Number(request.headers.get('Content-Length')) > maxBodyBytes) return json(413);

    const key = request.headers.get('CF-Connecting-IP') ?? 'unknown';
    const { success } = await env.CONTACT_RATE_LIMIT.limit({ key });
    if (!success) return json(429, false, { 'Retry-After': '60' });

    const { fields, tooLarge } = await readInquiry(request.body);
    if (tooLarge) return json(413);
    if (!fields) return json(400);
    const { name, email: visitor, service = '', project, website = '', fax = '' } = fields;
    if (typeof name !== 'string' || !name.trim() || name.length > 120 ||
        typeof visitor !== 'string' || visitor.length > 254 || !replyAddress.test(visitor.trim()) ||
        typeof service !== 'string' || (service !== '' && !serviceOptions.has(service)) ||
        typeof project !== 'string' || !project.trim() || project.length > 1000 ||
        typeof website !== 'string' || website.length > 350 || !validWebsite(website.trim()) || fax !== '') {
      return json(400);
    }

    const replyTo = visitor.trim();
    const lines = [`Name: ${name.trim()}`, `Email: ${replyTo}`];
    if (service) lines.push(`Help with: ${service}`);
    if (website.trim()) lines.push(`Website: ${website.trim()}`);
    lines.push('', 'Project details:', project.trim());

    try {
      await env.CONTACT_EMAIL.send({
        from: { email: 'website@etkahn.com', name: 'Etkahn Website' },
        to: email,
        replyTo,
        subject: 'Project inquiry for Etkahn',
        text: lines.join('\n'),
      });
    } catch {
      console.error('Contact form email delivery failed');
      return json(502);
    }

    return json(200, true);
  },
} satisfies ExportedHandler<Env>;
