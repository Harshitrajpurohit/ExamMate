"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Alert from "./Alert";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const { authenticated, loading } = useAuth();
  useEffect(() => {
    if (!loading && authenticated) {
      router.push("/");
    }
  }, [loading, authenticated]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const userData = {
      email: formData.get("email"),
      password: formData.get("password")
    }

    if (!userData?.email || !userData?.password) {
      return setError("Fill all credentials");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API}/api/auth/login`, {
      method: 'POST',
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    });
    const data = await res.json();

    if (res.status == 400) {
      setError(data.error);
      return;
    }
    if (res.status == 404) {
      setError(data.error);
      return;
    }
    if (res.status == 401) {
      setError(data.error);
      return;
    }
    if (res.status == 500) {
      setError(data.error);
      return;
    }
    if (res.status == 200) {
      router.push("/");
    }

    setError("");
  };
  return (
    <div
      className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8  dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to ExamMate
      </h2>
      {error && <Alert message={error} />}
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" name="email" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" name="password" />
        </LabelInputContainer>
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit">
          Sign up &rarr;
          <BottomGradient />
        </button>

      </form>
      <div className="w-full mx-auto mt-4 text-center text-sm text-gray-600">
        <span className="mr-1">New here?</span>
        <Link
          href="/signin"
          className="font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800 hover:underline"
        >
          Create an account
        </Link>
      </div>

    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span
        className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span
        className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
