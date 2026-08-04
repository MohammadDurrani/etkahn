import type { Metadata } from "next";
import deliveryDocument from "../content/service-delivery.html?raw";
import StaticDocumentPage from "../static-document-page";

export const metadata: Metadata = {
  title: "Shipping & Service Delivery Policy — Etkahn",
  description: "How Etkahn schedules, ships, delivers, hands over, and supports services and digital deliverables.",
};

export default function ServiceDeliveryPage() {
  return <StaticDocumentPage bodyClass="legal-page" document={deliveryDocument} script="/site/main.js" />;
}
