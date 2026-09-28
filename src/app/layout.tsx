import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { SectionRail } from "@/components/section-rail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import {
  BackgroundTone,
  Cursor,
  MagneticLayer,
  ScrollProgress,
  SectionSpy,
} from "@/components/scroll-chrome";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IPLens — From formulation to protection",
  description:
    "AI-powered IP and regulatory intelligence for Ayurveda. IPLens classifies your formulation, searches prior art, checks biodiversity and export rules, and returns one evidence-backed commercialisation roadmap.",
};

const WATCHED = [
  "problem",
  "classify",
  "agents",
  "jurisdiction",
  "evidence",
  "simulation",
  "workflow",
  "compare",
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${instrument.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <SmoothScroll />
        <ScrollProgress />
        <BackgroundTone />
        <Cursor />
        <MagneticLayer />
        <SectionSpy ids={WATCHED} />
        <SectionRail />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
