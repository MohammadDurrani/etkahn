import type { Metadata } from "next";
import checkoutDocument from "../content/checkout.html?raw";
import StaticDocumentPage from "../static-document-page";

export const metadata: Metadata = {
  title: "Checkout — Etkahn",
  description: "Review Etkahn service packages and prepare an invoice request.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <StaticDocumentPage bodyClass="checkout-page" document={checkoutDocument} script="/site/checkout.js" />;
}
