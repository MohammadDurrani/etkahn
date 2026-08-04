import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function render(pathname) {
  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the Etkahn homepage and eight USD packages", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Etkahn — Technology that moves business forward/i);
  assert.match(html, /Technology should amplify your business/i);
  const packageIds = new Set(
    [...html.matchAll(/data-add-product=(?:&quot;|\")([^&\"]+)/g)].map((match) => match[1]),
  );
  assert.equal(packageIds.size, 8);

  for (const price of ["350", "800", "1,000", "1,600", "1,150", "850", "300", "625"]) {
    assert.match(html, new RegExp(`USD ${price.replace(",", ",?")}`));
  }

  assert.match(html, /Privacy policy/i);
  assert.match(html, /Terms &amp; conditions/i);
  assert.match(html, /Returns &amp; refunds/i);
  assert.match(html, /Shipping &amp; service delivery/i);
});

test("renders checkout and every required policy route", async () => {
  const routes = [
    ["/checkout", /Invoice-based checkout/i],
    ["/privacy", /Privacy Policy/i],
    ["/terms", /Terms &amp; Conditions/i],
    ["/returns-refunds", /Returns &amp; Refunds Policy/i],
    ["/service-delivery", /Shipping &amp; Service Delivery Policy/i],
  ];

  for (const [pathname, marker] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), marker, pathname);
  }
});

test("ships the persistent cart and invoice checkout modules", async () => {
  const [store, checkout] = await Promise.all([
    readFile(new URL("../public/site/store.js", import.meta.url), "utf8"),
    readFile(new URL("../public/site/checkout.js", import.meta.url), "utf8"),
  ]);

  assert.match(store, /localStorage/);
  assert.match(store, /workflow-diagnostic/);
  assert.match(store, /technology-partner/);
  assert.match(checkout, /mailto:/);
  assert.match(checkout, /USD/);
});
