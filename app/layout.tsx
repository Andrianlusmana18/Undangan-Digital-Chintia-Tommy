import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#efedea",
  colorScheme: "only light",
};

export const metadata: Metadata = {
  title: "The Wedding of Chintia & Tommy",
  description: "Sabtu, 28 November 2026 - Undangan Pernikahan Chintia & Tommy",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: {
    title: "The Wedding of Chintia & Tommy",
    description: "Sabtu, 28 November 2026 - Undangan Pernikahan Digital",
    type: "website",
  },
  other: {
    "color-scheme": "only light",
    "supported-color-schemes": "only light light",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" style={{ colorScheme: "only light" }}>
      <head>
        <meta name="color-scheme" content="only light" />
        <meta name="supported-color-schemes" content="only light light" />
        <meta name="theme-color" content="#efedea" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Amiri:ital,wght@0,400;0,700;1,400&family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Great+Vibes&family=Montserrat:wght@300;400;500;600&family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Poppins:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen" style={{ colorScheme: "only light" }}>{children}</body>
    </html>
  );
}
