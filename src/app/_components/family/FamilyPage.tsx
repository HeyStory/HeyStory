'use client'

import { useState } from 'react'
import { Button } from '@/app/_components/ui/button'
import { CardView } from '~/app/_components/family/cardview/CardView'
import { TreeView } from '~/app/_components/family/treeview/TreeView'
import { FamilyMemberPanel } from '~/app/_components/family/form/FamilyMemberPanel'
import { PlusIcon, ListIcon, Network } from 'lucide-react'
import type { FamilyMember } from '~/app/_components/family/cardview/FamilyMemberCard'

export function FamilyPage() {
  const [viewMode, setViewMode] = useState<'card' | 'tree'>('card')
  const [panelOpen, setPanelOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<FamilyMember | undefined>()
  const [panelMode, setPanelMode] = useState<'view' | 'add' | 'edit'>('view')
  
  // Handle adding a new member
  const handleAddMember = () => {
    setSelectedMember(undefined)
    setPanelMode('add')
    setPanelOpen(true)
  }
  
  // Handle viewing a member's details
  const handleViewMember = (member: FamilyMember) => {
    setSelectedMember(member)
    setPanelMode('view')
    setPanelOpen(true)
  }
  
  // Handle editing a member directly (from card)
  const handleEditMember = (member: FamilyMember) => {
    setSelectedMember(member)
    setPanelMode('edit')
    setPanelOpen(true)
  }
  
  // Handle changing modes within the panel
  const handlePanelModeChange = (newMode: 'view' | 'add' | 'edit') => {
    setPanelMode(newMode)
  }
  
  // Handle saving a member (create or update)
  const handleSaveMember = (member: FamilyMember) => {
    console.log('Saving member:', member)
    // In a real app, this would update the backend and refresh the data
  }
  
  // Handle deleting a member
  const handleDeleteMember = (member: FamilyMember) => {
    console.log('Deleting member:', member)
    // In a real app, this would delete from the backend and refresh the data
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'card' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('card')}
            className="flex items-center gap-2"
          >
            <ListIcon className="h-4 w-4" />
            <span>Card View</span>
          </Button>
          <Button
            variant={viewMode === 'tree' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('tree')}
            className="flex items-center gap-2"
          >
            <Network className="h-4 w-4" />
            <span>Tree View</span>
          </Button>
        </div>
        <Button 
          onClick={handleAddMember}
          className="flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add Family Member</span>
        </Button>
      </div>

      {viewMode === 'card' ? 
        <CardView onMemberClick={handleViewMember} onEditClick={handleEditMember} /> : 
        <TreeView onMemberClick={handleViewMember} onEditClick={handleEditMember} />
      }

      <FamilyMemberPanel 
        open={panelOpen} 
        onOpenChange={setPanelOpen}
        member={selectedMember}
        mode={panelMode}
        onSave={handleSaveMember}
        onDelete={handleDeleteMember}
        onModeChange={handlePanelModeChange}
      />
    </div>
  )
} 