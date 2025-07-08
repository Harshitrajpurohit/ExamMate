"use client";
import { BackgroundLines } from "@/components/ui/background-lines";
import Link from "next/link";


export default function Hero() {
  return (
    <BackgroundLines className="w-full h-screen flex flex-col items-center justify-center px-4 relative">
      <div className="z-10 text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text text-transparent tracking-tight mb-6">
          Your Exam Mate
        </h2>

        <div className="inline-block">
          <Link href="/interviewQuestionGenerator">
            <button className="px-6 py-3 rounded-xl font-semibold border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
              Interview Questions
            </button>
          </Link>
        </div>
      </div>
    </BackgroundLines>
  );
}
