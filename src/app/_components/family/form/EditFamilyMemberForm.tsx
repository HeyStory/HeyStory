'use client'

import { FamilyMemberForm } from './FamilyMemberForm'
import type { FamilyMember } from '../cardview/FamilyMemberCard'

interface EditFamilyMemberFormProps {
  member: FamilyMember
  onSuccess: () => void
}

export function EditFamilyMemberForm({ member, onSuccess }: EditFamilyMemberFormProps) {
  return (
    <FamilyMemberForm 
      member={member}
      onSuccess={onSuccess}
    />
  )
} 