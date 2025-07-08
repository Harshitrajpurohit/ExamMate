import { SessionProvider } from "next-auth/react"
import {NavbarDemo} from "@/components/Navbar"
import React from "react";

import "./globals.css";



export const metadata = {
  title: "AI Interview Question Generator",
  description: "Generate coding, MCQ, and conceptual interview questions with AI for any topic and difficulty level.",
  keywords: ["AI Interview", "Question Generator", "LangChain", "LLM", "Next.js"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
        <NavbarDemo/>
        {children}
        </SessionProvider>
      </body>
    </html>
  );
}
