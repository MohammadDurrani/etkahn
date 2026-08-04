import homeDocument from "./content/home.html?raw";
import StaticDocumentPage from "./static-document-page";

export default function Home() {
  return <StaticDocumentPage document={homeDocument} script="/site/main.js" />;
}
