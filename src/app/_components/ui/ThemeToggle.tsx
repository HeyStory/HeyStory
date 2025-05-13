'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

interface ThemeToggleProps {
  className?: string
  iconSize?: number
}

export function ThemeToggle({ className = '', iconSize = 20 }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button 
      type="button"
      onClick={toggleTheme}
      className={`rounded-full flex items-center justify-center transition-colors ${className}`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun width={iconSize} height={iconSize} />
      ) : (
        <Moon width={iconSize} height={iconSize} />
      )}
    </button>
  )
} 