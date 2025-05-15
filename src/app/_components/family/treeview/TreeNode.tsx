'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog'
import { Badge } from '@/app/_components/ui/badge'
import { Button } from '@/app/_components/ui/button'
import { EditIcon, UserIcon } from 'lucide-react'
import type { FamilyMember } from '../cardview/FamilyMemberCard'
import { EditFamilyMemberForm } from '~/app/_components/family/form/EditFamilyMemberForm'

interface FamilyTreeNode extends FamilyMember {
  children?: FamilyTreeNode[]
  spouse?: FamilyMember
}

interface TreeNodeProps {
  node: FamilyTreeNode
  isRoot?: boolean
  onMemberClick?: (member: FamilyMember) => void
  onEditClick?: (member: FamilyMember) => void
}

export function TreeNode({ node, isRoot = false, onMemberClick, onEditClick }: TreeNodeProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleNodeClick = () => {
    if (onMemberClick) {
      onMemberClick(node)
    } else {
      setIsProfileOpen(true)
    }
  }
  
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (onEditClick) {
      onEditClick(node)
    } else {
      setIsEditOpen(true)
    }
  }

  // Recursive rendering of the tree
  const renderTreeStructure = () => {
    // If this node has no children or spouse, just return the node
    if ((!node.children || node.children.length === 0) && !node.spouse) {
      return renderNode()
    }
    
    return (
      <div className="flex flex-col items-center">
        {/* Root node and spouse */}
        <div className="flex items-center gap-4 mb-12">
          {renderNode()}
          {node.spouse ? (
            <>
              <div className="w-20 h-0.5 bg-gray-300"></div>
              <div className="border-2 border-accent rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow">
                <button 
                  className="w-32 flex flex-col items-center p-2 text-center hover:bg-accent/10 transition-colors"
                  onClick={() => onMemberClick?.(node.spouse!)}
                  >
                  <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted mb-2">
                    {node.spouse.avatarUrl ? (
                      <Image
                        src={node.spouse.avatarUrl}
                        alt={node.spouse.fullName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <UserIcon className="h-8 w-8 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{node.spouse.fullName}</p>
                    <p className="text-xs text-muted-foreground">{node.spouse.relation}</p>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <div className="w-20 h-0.5 bg-gray-300"></div>
          )}
        </div>
        
        {/* Children */}
        {node.children && node.children.length > 0 && (
          <>
            <div className="h-10 w-0.5 bg-gray-300"></div>
            <div className="flex gap-12 relative">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-300"></div>
              {node.children.map((child) => (
                <div key={child.id} className="flex flex-col items-center">
                  <div className="h-10 w-0.5 bg-gray-300"></div>
                  <TreeNode 
                    node={child}
                    onMemberClick={onMemberClick}
                    onEditClick={onEditClick}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    )
  }

  // Render the actual node with its content
  const renderNode = () => {
    return (
      <div className={`${isRoot ? 'border-primary' : 'border-accent'} border-2 rounded-lg overflow-hidden bg-card shadow-sm hover:shadow-md transition-shadow`}>
        {(onMemberClick || onEditClick) ? (
          <div className="relative">
            <button 
              className="w-32 flex flex-col items-center p-2 text-center hover:bg-accent/10 transition-colors"
              onClick={handleNodeClick}
            >
              <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted mb-2">
                {node.avatarUrl ? (
                  <Image
                    src={node.avatarUrl}
                    alt={node.fullName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <UserIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <p className="font-medium text-sm">{node.fullName}</p>
                <p className="text-xs text-muted-foreground">{node.relation}</p>
              </div>
            </button>
            {onEditClick && (
              <button 
                className="absolute top-1 right-1 p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-accent/20"
                onClick={handleEditClick}
              >
                <EditIcon className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ) : (
          <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
            <DialogTrigger asChild>
              <button className="w-32 flex flex-col items-center p-2 text-center hover:bg-accent/10 transition-colors">
                <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted mb-2">
                  {node.avatarUrl ? (
                    <Image
                      src={node.avatarUrl}
                      alt={node.fullName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <UserIcon className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-sm">{node.fullName}</p>
                  <p className="text-xs text-muted-foreground">{node.relation}</p>
                </div>
              </button>
            </DialogTrigger>
            
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{node.fullName}</DialogTitle>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                <div className="flex justify-center">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden bg-muted">
                    {node.avatarUrl ? (
                      <Image
                        src={node.avatarUrl}
                        alt={node.fullName}
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
                  <p className="text-muted-foreground">{node.relation}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">About</h3>
                  <p className="text-muted-foreground">{node.description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Interests</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {node.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="pt-2">
                  <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full">
                        <EditIcon className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Edit Family Member</DialogTitle>
                      </DialogHeader>
                      <EditFamilyMemberForm 
                        member={node} 
                        onSuccess={() => setIsEditOpen(false)} 
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    )
  }

  return renderTreeStructure()
} 