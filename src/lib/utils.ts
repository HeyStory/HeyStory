import { type ClassValue } from 'clsx'

// Simple className concatenation function without external dependencies
export function cn(...inputs: ClassValue[]): string {
  try {
    return inputs
      .filter(Boolean)
      .map((input) => {
        if (typeof input === 'string') return input
        if (typeof input === 'object' && input !== null) {
          return Object.entries(input)
            .filter(([, value]) => Boolean(value))
            .map(([key]) => key)
            .join(' ')
        }
        return ''
      })
      .join(' ')
  } catch (error) {
    console.error('Error in cn function:', error)
    return ''
  }
} 