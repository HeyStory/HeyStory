'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from '@/app/_components/ui/sheet'
import { Button } from '@/app/_components/ui/button'
import { Loader2 } from 'lucide-react'
import { FamilyMemberForm } from '~/app/_components/family/form/FamilyMemberForm'
import { useState } from 'react'

interface AddFamilyMemberDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddFamilyMemberDialog({ open, onOpenChange }: AddFamilyMemberDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSuccess = () => {
    setIsSubmitting(false)
    onOpenChange(false)
  }
  
  const handleSubmitStart = () => {
    setIsSubmitting(true)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-[40%] max-w-[550px] sm:max-w-none flex flex-col p-0"
      >
        {/* Fixed Header */}
        <SheetHeader className="px-6 py-6 border-b">
          <SheetTitle>Add a Family Member</SheetTitle>
          <SheetDescription>
            Add details about a family member to build your family tree.
          </SheetDescription>
        </SheetHeader>
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <FamilyMemberForm 
            onSuccess={handleSuccess} 
            onSubmitStart={handleSubmitStart}
            hideButtons
          />
        </div>
        
        {/* Fixed Footer */}
        <SheetFooter className="px-6 py-4 border-t mt-auto">
          <div className="flex gap-4 w-full">
            <Button 
              type="submit"
              form="family-member-form" 
              className="flex-1" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Member'
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
} 