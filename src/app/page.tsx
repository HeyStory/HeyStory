"use client";
import Link from "next/link";

import { Button } from "@components/ui/button";
import {
  SignInButton,
  SignUpButton,
  useUser,
  SignOutButton,
} from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  return (
    <main className="flex gap-4 min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <h1 className="text-4xl font-bold">HeyStory, {user?.firstName + " " + user?.lastName}</h1>
      <p className="text-2xl">Your story, your way.</p>
      <div className="flex gap-2">
        {!user && (
          <>
            <SignInButton />
            <SignUpButton />
          </>
        )}
        {user && (
          <>
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <SignOutButton>
              <Button>Sign Out</Button>
            </SignOutButton>
          </>
        )}
      </div>
    </main>
  );
}
