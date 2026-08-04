import type { Metadata } from "next";
import termsDocument from "../content/terms.html?raw";
import StaticDocumentPage from "../static-document-page";

export const metadata: Metadata = {
  title: "Terms & Conditions — Etkahn",
  description: "Terms and conditions for using the Etkahn website and engaging Etkahn for services.",
};

export default function TermsPage() {
  return <StaticDocumentPage bodyClass="legal-page" document={termsDocument} script="/site/main.js" />;
}
