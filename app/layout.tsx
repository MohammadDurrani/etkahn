import type { Metadata } from "next";
import { Instrument_Sans, Syne } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "etkahn.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const title = "Etkahn — Technology & Automation Studio";
  const description =
    "Etkahn engineers websites, automations, integrations, and data systems that grow revenue and give ambitious businesses their time back.";

  return {
    metadataBase: baseUrl,
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "Etkahn",
      type: "website",
      images: [{ url: new URL("/og.png", baseUrl), width: 1678, height: 941, alt: "Etkahn — Technology that drives revenue." }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/og.png", baseUrl)],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${syne.variable}`}>
        {children}
      </body>
    </html>
  );
}
