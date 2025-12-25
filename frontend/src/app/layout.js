import { Analytics } from "@vercel/analytics/next"
import { NavbarDemo } from "@/components/Navbar"
import { AuthProvider } from "./context/AuthContext"
import React from "react";
import "./globals.css";



export const metadata = {
  title: "ExamMate | Your Smart Exam Preparation Partner",
  description:
    "ExamMate helps students prepare smarter with AI-generated coding, MCQ, and conceptual questions for any topic and difficulty level. One platform for all your exam needs.",
  keywords: [
    "ExamMate",
    "Exam Preparation",
    "AI Question Generator",
    "MCQ Generator",
    "Coding Questions",
    "Conceptual Questions",
    "Interview Prep",
    "Student Dashboard",
    "Smart Study Tool",
    "Online Exam Practice",
  ],
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      <body className="dark">
        <AuthProvider>
          <NavbarDemo />
          {children}
          <Analytics />
        </AuthProvider>
      </body>
    </html>
  );
}
