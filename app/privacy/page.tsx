import type { Metadata } from "next";
import privacyDocument from "../content/privacy.html?raw";
import StaticDocumentPage from "../static-document-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Etkahn",
  description: "How Etkahn collects, uses, stores, and protects personal information.",
};

export default function PrivacyPage() {
  return <StaticDocumentPage bodyClass="legal-page" document={privacyDocument} script="/site/main.js" />;
}
