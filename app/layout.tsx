import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "etkahn.com";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);
  const title = "Etkahn — Technology that moves business forward";
  const description =
    "Etkahn finds what is slowing your business down, improves the workflows, connects the systems, trains the team, and builds what is missing.";

  return {
    metadataBase: baseUrl,
    title,
    description,
    icons: { icon: "/favicon.svg" },
    openGraph: {
      title,
      description: "Less friction. Better systems. More time to grow your business.",
      siteName: "Etkahn",
      type: "website",
      images: [
        {
          url: new URL("/images/team-systems.webp", baseUrl),
          width: 1800,
          height: 1201,
          alt: "A collaborative technology workspace viewed from above",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: "Less friction. Better systems. More time to grow your business.",
      images: [new URL("/images/team-systems.webp", baseUrl)],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
