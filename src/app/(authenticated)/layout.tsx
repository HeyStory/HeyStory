'use client'

import { Sidebar, TopNav } from '@/app/_components/layout'
import { useTheme } from '@/context/ThemeContext'
import { useSidebar } from '@/context/SidebarContext'

export default function AuthenticatedLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { theme } = useTheme()
  const { collapsed } = useSidebar()
  
  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="flex min-h-screen">
        <Sidebar />
        
        <div className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? 'ml-20' : 'ml-64'
        }`}>
          <TopNav />
          <div className="flex-1 p-8 pt-24 bg-background">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
} 