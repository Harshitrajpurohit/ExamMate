"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export default function InfiniteCards() {
  return (
    
    <div
      className="h-[20rem] rounded-md flex flex-col antialiased  dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <h2 className="text-3xl md:text-4xl mb-2">Reviews</h2>
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "ExamMate has completely changed the way I prepare for interviews. The AI-generated questions are always unique and relevant.",
    name: "Rahul Sharma",
    title: "B.Tech Student, LPU",
  },
  {
    quote:
      "I love the simplicity of the platform. One-click login, personalized dashboard, and accurate question sets — everything just works.",
    name: "Ananya Iyer",
    title: "Software Engineer Intern",
  },
  {
    quote:
      "Being able to practice MCQs and coding questions in one place is a big win. ExamMate keeps me consistent every day.",
    name: "Karan Mehta",
    title: "Competitive Exam Aspirant",
  },
  {
    quote:
      "The daily practice sets and progress tracking features keep me motivated. I feel more confident before exams now.",
    name: "Sneha Patel",
    title: "3rd Year CSE Student",
  },
  {
    quote:
      "I used ExamMate to prepare for my placement tests. The conceptual questions helped me revise everything quickly.",
    name: "Aman Siddiqui",
    title: "Final Year Student, VIT",
  },
];
