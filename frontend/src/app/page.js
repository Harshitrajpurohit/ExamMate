"use client"
import { redirect, useRouter } from "next/navigation";
import Hero from "./_sections/Hero";
import { auth } from "@/auth";
import FeaturesSection from "./_sections/Feature";
import InfiniteCards from "@/components/Reviews";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";


export default function Home() {
const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  useEffect(()=>{
    if(status=="authenticated"  && session?.user){
      const alreadyAdded = localStorage.getItem("addedUser");
      if(!alreadyAdded  || alreadyAdded !== session?.user.email){
        addtoDB(session.user);
        localStorage.setItem("addedUser", session?.user.email);
      }
    }
  },[status, session])

  const addtoDB = async (user) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/googleSignIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user),
      })
      console.log("login Successfull", res)
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Hero />
      <FeaturesSection />
      <InfiniteCards />
      <div className="h-[25vh]">
      </div>
    </>
  )
}