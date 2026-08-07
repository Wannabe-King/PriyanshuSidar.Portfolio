import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <ThemeToggle />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
