'use client'

import { 
  Users, 
  FolderArchive, 
  Calendar, 
  FileText, 
  HardDrive, 
  Bookmark 
} from 'lucide-react'
import { SummaryCard } from '../ui/SummaryCard'

export function SummarySection() {
  // Mock data - would come from API/store
  const summaries = [
    {
      title: 'Family Members',
      value: 24,
      icon: <Users className="w-6 h-6" />,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Archive Items',
      value: 156,
      icon: <FolderArchive className="w-6 h-6" />,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Upcoming Events',
      value: 3,
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      title: 'New Content',
      value: 8,
      icon: <FileText className="w-6 h-6" />,
      trend: { value: 25, isPositive: true }
    },
    {
      title: 'Storage Used',
      value: '2.4 GB',
      icon: <HardDrive className="w-6 h-6" />,
      trend: { value: 5, isPositive: false }
    },
    {
      title: 'Story Highlights',
      value: 12,
      icon: <Bookmark className="w-6 h-6" />,
    }
  ]
  
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">At a Glance</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaries.map((summary, index) => (
          <SummaryCard key={index} {...summary} />
        ))}
      </div>
    </section>
  )
} 