'use client'

import { 
  createContext, 
  useContext, 
  useState,
} from 'react'
import type { ReactNode } from 'react'

interface SidebarContextType {
  collapsed: boolean
  toggleSidebar: () => void
}

// Create context with default values
const defaultContext: SidebarContextType = {
  collapsed: false,
  toggleSidebar: () => console.warn('SidebarProvider not found')
}

const SidebarContext = createContext<SidebarContextType>(defaultContext)

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(prev => !prev)
  }

  return (
    <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

// Custom hook to use the sidebar context
export function useSidebar(): SidebarContextType {
  return useContext(SidebarContext)
} 