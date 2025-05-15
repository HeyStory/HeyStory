"use client";

import { Button } from "@components/ui/button";
import {
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();
  
  // Redirect to dashboard if user is signed in
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/dashboard");
    }
  }, [isSignedIn, router]);
  
  // Landing page for non-signed in users
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary to-primary-foreground text-primary-foreground">
      <div className="max-w-3xl text-center px-4">
        <div className="mb-8">
          <div className="text-6xl mb-2 mx-auto w-fit">👋</div>
          <h2 className="text-2xl font-bold">HeyStory</h2>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Your family stories, preserved forever
        </h1>
        
        <p className="text-xl mb-8">
          Hey Story helps you capture, preserve, and share your family&apos;s most precious memories 
          and stories for generations to come.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <SignInButton mode="modal">
            <Button className="bg-white text-primary hover:bg-white/90">
              Sign In
            </Button>
          </SignInButton>
          
          <SignUpButton mode="modal">
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
              Get Started
            </Button>
          </SignUpButton>
        </div>
      </div>
    </main>
  );
}
