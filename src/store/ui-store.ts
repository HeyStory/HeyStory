import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark'

interface UIState {
  theme: Theme
  toggleTheme: () => void
  sidebarCollapsed: boolean
  toggleSidebar: () => void
}

// Basic store without complex typing for now
export const UIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light' as Theme,
      toggleTheme: () => 
        set((state) => ({ 
          theme: state.theme === 'light' ? 'dark' : 'light' 
        })),
      sidebarCollapsed: false,
      toggleSidebar: () => 
        set((state) => ({ 
          sidebarCollapsed: !state.sidebarCollapsed 
        })),
    }),
    {
      name: 'ui-store',
    }
  )
) 