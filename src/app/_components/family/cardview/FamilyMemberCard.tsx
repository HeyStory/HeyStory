'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/_components/ui/dialog'
import { User2Icon, UserIcon } from 'lucide-react'

export interface FamilyMember {
  id: number
  fullName: string
  description: string
  relation: string
  tags: string[]
  avatarUrl?: string
}

interface FamilyMemberCardProps {
  member: FamilyMember
  onMemberClick?: (member: FamilyMember) => void
  onEditClick?: (member: FamilyMember) => void
}

export function FamilyMemberCard({ member, onMemberClick }: FamilyMemberCardProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  
  const displayTags = member.tags.slice(0, 3)
  const hasMoreTags = member.tags.length > 3

  const handleViewProfile = () => {
    if (onMemberClick) {
      onMemberClick(member)
    } else {
      setIsProfileModalOpen(true)
    }
  }


  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-full overflow-hidden bg-muted flex items-center justify-center">
              {member.avatarUrl ? (
                <Image
                  src={member.avatarUrl}
                  alt={member.fullName}
                  fill
                  className="object-cover"
                />
              ) : (
                <UserIcon className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <CardTitle className="text-lg">{member.fullName}</CardTitle>
              <CardDescription className="text-sm">{member.relation}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {member.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {displayTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {hasMoreTags && (
            <Badge variant="outline" className="text-xs">
              +{member.tags.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-1 flex gap-2">
        <Button variant="secondary" size="sm" className="flex-1" onClick={handleViewProfile}>
          <User2Icon className="h-4 w-4 mr-2" />
          View Profile
        </Button>
        
        {!onMemberClick && (
          <Dialog open={isProfileModalOpen} onOpenChange={setIsProfileModalOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{member.fullName}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="flex justify-center">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden bg-muted">
                    {member.avatarUrl ? (
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
                <div>
                  <h3 className="font-medium">Relation</h3>
                  <p className="text-muted-foreground">{member.relation}</p>
                </div>
                <div>
                  <h3 className="font-medium">About</h3>
                  <p className="text-muted-foreground">{member.description}</p>
                </div>
                <div>
                  <h3 className="font-medium">Interests</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {member.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  )
} 