'use client'

import type { ReactNode } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from '@/app/_components/ui/sheet'

interface SidePanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  width?: string
}

export function SidePanel({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  width = '40%'
}: SidePanelProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="max-w-[550px] sm:max-w-none flex flex-col p-0"
        style={{ width }}
      >
        {/* Fixed Header */}
        {(title ?? description) && (
          <SheetHeader className="px-6 py-6 border-b">
            {title && <SheetTitle>{title}</SheetTitle>}
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
        )}
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </div>
        
        {/* Optional Footer */}
        {footer && (
          <SheetFooter className="px-6 py-4 border-t mt-auto">
            {footer}
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
} 