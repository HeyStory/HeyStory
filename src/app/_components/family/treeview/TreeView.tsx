'use client'

import { useState, useEffect, useRef } from 'react'
import { PlusIcon, MinusIcon, MoveIcon, HomeIcon, EditIcon } from 'lucide-react'
import { Button } from '@/app/_components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/_components/ui/tooltip'
import type { FamilyMember } from '../cardview/FamilyMemberCard'
import { TreeNode } from './TreeNode'

// Extended type for the family tree structure
interface FamilyTreeNode extends FamilyMember {
  children?: FamilyTreeNode[]
  spouse?: FamilyMember
}

// This would be replaced with actual data fetching logic from the backend
const mockFamilyTree: FamilyTreeNode = {
  id: 1,
  fullName: 'John Smith',
  description: 'Father, always ready with a dad joke or sage advice.',
  relation: 'Father',
  tags: ['Cooking', 'Gardening', 'Photography'],
  avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  spouse: {
    id: 2,
    fullName: 'Maria Smith',
    description: "Mother, teacher, and the family's rock.",
    relation: 'Mother',
    tags: ['Reading', 'Painting', 'Hiking'],
    avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  children: [
    {
      id: 3,
      fullName: 'Emma Smith',
      description: 'Sister studying marine biology.',
      relation: 'Sister',
      tags: ['Music', 'Travel', 'Swimming'],
      avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      id: 4,
      fullName: 'Michael Smith',
      description: 'Brother who works as a software engineer.',
      relation: 'Brother',
      tags: ['Coding', 'Video Games', 'Hiking'],
      avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
    }
  ]
}

interface TreeViewProps {
  onMemberClick?: (member: FamilyMember) => void
  onEditClick?: (member: FamilyMember) => void
}

export function TreeView({ onMemberClick, onEditClick }: TreeViewProps) {
  const [familyTree, setFamilyTree] = useState<FamilyTreeNode | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000))
        setFamilyTree(mockFamilyTree)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching family tree:', error)
        setIsLoading(false)
      }
    }

    void fetchData()
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.5))
  }

  const handleReset = () => {
    setZoom(1)
    setPosition({ x: 0, y: 0 })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <div className="animate-pulse text-muted-foreground text-xl">Loading family tree...</div>
      </div>
    )
  }

  if (!familyTree) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No family tree yet</h3>
        <p className="text-muted-foreground">
          Start building your family tree by adding your first family member.
        </p>
      </div>
    )
  }

  return (
    <div className="border rounded-lg p-4 bg-white relative h-[600px] overflow-hidden">
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={handleZoomIn}>
                <PlusIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zoom In</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={handleZoomOut}>
                <MinusIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zoom Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" onClick={handleReset}>
                <HomeIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset View</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Tree Canvas */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute left-1/2 top-1/2 transform origin-center transition-transform duration-100"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          }}
        >
          <TreeNode 
            node={familyTree} 
            onMemberClick={onMemberClick}
            onEditClick={onEditClick}
            isRoot
          />
        </div>
      </div>
    </div>
  )
} 