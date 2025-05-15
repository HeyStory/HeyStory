'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/app/_components/ui/button'
import { Badge } from '@/app/_components/ui/badge'
import { UserIcon, Loader2, Pencil } from 'lucide-react'
import { FamilyMemberForm } from '~/app/_components/family/form/FamilyMemberForm'
import { SidePanel } from '@components/layout'
import type { FamilyMember } from '~/app/_components/family/cardview/FamilyMemberCard'

// Extended FamilyMember interface with optional contact fields
interface ExtendedFamilyMember extends FamilyMember {
  phone?: string
  email?: string
  address?: string
}

type PanelMode = 'view' | 'add' | 'edit'

interface FamilyMemberPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  member?: ExtendedFamilyMember
  mode: PanelMode
  onSave?: (member: ExtendedFamilyMember) => void
  onDelete?: (member: ExtendedFamilyMember) => void
  onModeChange?: (mode: PanelMode) => void
}

export function FamilyMemberPanel({ 
  open, 
  onOpenChange, 
  member, 
  mode = 'view',
  onSave,
  onDelete,
  onModeChange
}: FamilyMemberPanelProps) {
  const [currentMode, setCurrentMode] = useState<PanelMode>(mode)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Reset mode when sheet is opened/closed or member changes
  useEffect(() => {
    setCurrentMode(mode)
  }, [mode, member, open])
  
  const handleSuccess = () => {
    setIsSubmitting(false)
    // If we were editing, go back to view mode
    if (currentMode === 'edit') {
      if (onModeChange) {
        onModeChange('view')
      } else {
        setCurrentMode('view')
      }
    } else {
      // If we were adding, close the sheet
      onOpenChange(false)
    }
  }
  
  const handleSubmitStart = () => {
    setIsSubmitting(true)
  }
  
  const handleEdit = () => {
    if (onModeChange) {
      onModeChange('edit')
    } else {
      setCurrentMode('edit')
    }
  }
  
  // Determine title based on mode
  const getTitle = () => {
    switch(currentMode) {
      case 'add':
        return 'Add a Family Member'
      case 'edit':
        return 'Edit Family Member'
      case 'view':
      default:
        return member?.fullName ?? 'Family Member'
    }
  }
  
  // Determine description based on mode
  const getDescription = () => {
    switch(currentMode) {
      case 'add':
        return 'Add details about a family member to build your family tree.'
      case 'edit':
        return 'Edit the details of this family member.'
      case 'view':
      default:
        return member?.relation ?? ''
    }
  }

  // Create the content based on the current mode
  const renderContent = () => {
    if (currentMode === 'add' || currentMode === 'edit') {
      return (
        <FamilyMemberForm 
          member={currentMode === 'edit' ? member : undefined}
          onSuccess={handleSuccess} 
          onSubmitStart={handleSubmitStart}
          hideButtons
        />
      )
    }
    
    // View mode content
    return (
      <div className="space-y-6">
        {/* Profile Image */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative h-32 w-32 rounded-full overflow-hidden bg-muted flex items-center justify-center">
            {member?.avatarUrl ? (
              <Image
                src={member.avatarUrl}
                alt={member.fullName}
                fill
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <UserIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
          </div>
        </div>
        
        {/* Member Details */}
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">About</h3>
            <p className="mt-1">{member?.description}</p>
          </div>
          
          {member?.phone && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
              <p className="mt-1">{member.phone}</p>
            </div>
          )}
          
          {member?.email && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
              <p className="mt-1">{member.email}</p>
            </div>
          )}
          
          {member?.address && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
              <p className="mt-1">{member.address}</p>
            </div>
          )}
          
          {member?.tags && member.tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Interests & Tags</h3>
              <div className="flex flex-wrap gap-2">
                {member.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
  
  // Create the footer based on the current mode
  const renderFooter = () => {
    if (currentMode === 'add' || currentMode === 'edit') {
      // Form mode footer
      return (
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
            onClick={() => {
              if (currentMode === 'edit') {
                if (onModeChange) {
                  onModeChange('view')
                } else {
                  setCurrentMode('view')
                }
              } else {
                onOpenChange(false)
              }
            }}
          >
            Cancel
          </Button>
        </div>
      )
    }
    
    // View mode footer
    return (
      <div className="flex gap-4 w-full">
        <Button 
          onClick={handleEdit}
          className="flex-1"
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit Details
        </Button>
        {member && onDelete && (
          <Button 
            variant="destructive" 
            className="flex-1"
            onClick={() => {
              if (onDelete && member) {
                onDelete(member)
                onOpenChange(false)
              }
            }}
          >
            Delete
          </Button>
        )}
      </div>
    )
  }

  return (
    <SidePanel
      open={open}
      onOpenChange={onOpenChange}
      title={getTitle()}
      description={getDescription()}
      footer={renderFooter()}
      width="40%"
    >
      {renderContent()}
    </SidePanel>
  )
} 