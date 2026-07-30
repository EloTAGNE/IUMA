import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IUMA Campus of Legends",
  description: "Rejoins le Campus of Legends - IUMA x Xkorienta. Inscris-toi et entre dans la l\u00e9gende.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
