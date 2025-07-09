
import { redirect } from "next/navigation";
import Hero from "./_sections/Hero";
import { auth } from "@/auth";
import FeaturesSection from "./_sections/Feature";

export default async function Home(){

  const session = await auth();
  if(!session?.user){
    redirect("/signin")
  }


  return (
    <>
    <Hero/>
    <FeaturesSection/>
    
    </>
  )
}