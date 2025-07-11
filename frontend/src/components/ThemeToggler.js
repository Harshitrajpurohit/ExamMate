"use client";
import { BsSunFill } from "react-icons/bs";
import { MdModeNight } from "react-icons/md";

import { useEffect, useState } from "react";

export default function ThemeToggler() {
  const [isDark, setIsDark] = useState(false);  
  const [loaded, setLoaded] = useState(false);    

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
      setIsDark(true);
    } else {
      document.body.classList.remove("dark");
      setIsDark(false);
    }
    setLoaded(true); 
  }, []);

  useEffect(() => {
    if (!loaded) return; 
    if (isDark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark, loaded]);

  if (!loaded) return null;

  return (
    <div className="">
      <button
        onClick={() => setIsDark((prev) => !prev)}
        className="text-2xl pt-2 z-30"
      >
        {isDark ? <BsSunFill /> : <MdModeNight className="rotate-45" />}
      </button>
    </div>
  );
}
