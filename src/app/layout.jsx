import "@/styles/globals.css";
import { IBM_Plex_Mono, Playfair_Display } from "next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
});

export const metadata = {
  title: "Survey Data Interpretation | ARVA.ai",
  description: "Interactive slide-style interpretation of survey results.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${playfairDisplay.variable}`}>
      <body>{children}</body>
    </html>
  );
}