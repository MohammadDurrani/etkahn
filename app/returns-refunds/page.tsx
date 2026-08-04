import type { Metadata } from "next";
import returnsDocument from "../content/returns-refunds.html?raw";
import StaticDocumentPage from "../static-document-page";

export const metadata: Metadata = {
  title: "Returns & Refunds Policy — Etkahn",
  description: "Etkahn’s policy for service cancellations, returns, corrections, and refunds.",
};

export default function ReturnsPage() {
  return <StaticDocumentPage bodyClass="legal-page" document={returnsDocument} script="/site/main.js" />;
}
