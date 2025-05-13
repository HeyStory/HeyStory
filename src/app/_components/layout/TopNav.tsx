'use client'

import { Search, Bell } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { ThemeToggle } from '@/app/_components/ui/ThemeToggle'
import { useSidebar } from '@/context/SidebarContext'

export function TopNav() {
  const { collapsed } = useSidebar()
  
  return (
    <header 
      className={`fixed top-0 right-0 h-16 border-b border-border bg-background flex items-center justify-between px-8 z-10 transition-all duration-300 ${
        collapsed ? 'left-20' : 'left-64'
      }`}
    >
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder="Search stories, events, or people..."
          className="w-full py-2 pl-10 pr-4 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary"
        />
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-sm text-muted-foreground">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
        
        <ThemeToggle className="w-8 h-8 text-muted-foreground hover:bg-muted" iconSize={20} />
        
        <div className="relative text-muted-foreground">
          <Bell className="w-5 h-5" />
        </div>
        
        <UserButton />
      </div>
    </header>
  )
} 