type StaticDocumentPageProps = {
  document: string;
  bodyClass?: string;
  script: "/site/main.js" | "/site/checkout.js";
};

const extractBody = (document: string) => {
  const match = document.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match?.[1] ?? document;
};

export default function StaticDocumentPage({ document, bodyClass, script }: StaticDocumentPageProps) {
  return (
    <>
      <div
        className={bodyClass}
        dangerouslySetInnerHTML={{ __html: extractBody(document) }}
        suppressHydrationWarning
      />
      <script type="module" src={script} defer />
    </>
  );
}
