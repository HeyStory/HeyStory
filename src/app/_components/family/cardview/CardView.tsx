'use client'

import { useState, useEffect } from 'react'
import { FamilyMemberCard } from '~/app/_components/family/cardview/FamilyMemberCard'
import { Skeleton } from '@components/ui/skeleton'
import type { FamilyMember } from '~/app/_components/family/cardview/FamilyMemberCard'

// This would be replaced with actual data fetching logic
const mockFamilyMembers = [
  {
    id: 1,
    fullName: 'John Smith',
    description: 'Father, always ready with a dad joke or sage advice.',
    relation: 'Father',
    tags: ['Cooking', 'Gardening', 'Photography'],
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: 2,
    fullName: 'Maria Smith',
    description: "Mother, teacher, and the family's rock.",
    relation: 'Mother',
    tags: ['Reading', 'Painting', 'Hiking'],
    avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 3,
    fullName: 'Emma Smith',
    description: 'Sister studying marine biology.',
    relation: 'Sister',
    tags: ['Music', 'Travel', 'Swimming'],
    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
]

interface CardViewProps {
  onMemberClick?: (member: FamilyMember) => void
  onEditClick?: (member: FamilyMember) => void
}

export function CardView({ onMemberClick, onEditClick }: CardViewProps) {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setFamilyMembers(mockFamilyMembers)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching family members:', error)
        setIsLoading(false)
      }
    }

    void fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-card border rounded-lg p-6 h-64">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="mt-4 flex space-x-2">
              <Skeleton className="h-8 w-16 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (familyMembers.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No family members yet</h3>
        <p className="text-muted-foreground">
          Start building your family tree by adding your first family member.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {familyMembers.map((member) => (
        <FamilyMemberCard key={member.id} member={member} onMemberClick={onMemberClick} onEditClick={onEditClick} />
      ))}
    </div>
  )
} 