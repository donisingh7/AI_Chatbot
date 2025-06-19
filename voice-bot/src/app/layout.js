import "../styles/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


export const metadata = {
  title: "Voice Bot Demo",
  description: "A simple voice-powered ChatGPT demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       {children}
      </body>
    </html>
  );
}
