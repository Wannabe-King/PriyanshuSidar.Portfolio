import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Fraunces,
  Instrument_Serif,
  Outfit,
  Manrope,
} from "next/font/google";
import "./globals.css";
import { LoadingGate } from "@/components/LoadingGate";
import { Navbar } from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Hero-only pairing, consumed by the #home block in globals.css. Self-hosted
// through next/font rather than a Google <link> so there is no extra request
// and no swap flash.
// `axes` matters here. next/font requests only the weight axis by default,
// which pins Fraunces' optical size at its default of 14 - the text cut - so
// the display sizes render chunky and low-contrast. Asking for opsz restores
// font-optical-sizing: auto, letting the large hero lines use the display cut.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

// Instrument Serif is not a variable font - it ships regular only.
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });

// Work experience section. Weight is Manrope's only axis, so no `axes` needed.
const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Priyanshu Sidar",
  description: "Priyashu Portfolio Website",
};

// Runs before first paint so the stored theme is on <html> ahead of the CSS,
// which is what stops the page flashing the default before switching.
// Keep the fallback in sync with DEFAULT_THEME in ThemeProvider.
const themeScript = `
(function () {
  try {
    var stored = window.localStorage.getItem("portfolio-theme");
    var theme = stored === "light" || stored === "dark" ? stored : "light";
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${instrumentSerif.variable} ${outfit.variable} ${manrope.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <LoadingGate>
            <ThemeToggle />
            <Navbar />
            {children}
          </LoadingGate>
        </ThemeProvider>
      </body>
    </html>
  );
}
