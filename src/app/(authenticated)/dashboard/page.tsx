'use client'

import { useUser } from '@clerk/nextjs'
import { AIFeatureSection, SummarySection } from '@/app/_components/home'

export default function DashboardPage() {
  const { user } = useUser()
  
  return (
    <div className="w-full max-w-none">
      <main>
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome back, {user?.firstName ?? 'User'}!
          </h1>
          <p className="text-muted-foreground">
            Your digital home for family memories and stories.
          </p>
        </div>
        
        <AIFeatureSection />
        <SummarySection />
      </main>
    </div>
  )
} 