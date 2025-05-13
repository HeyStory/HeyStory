'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Users, 
  FolderArchive, 
  Upload, 
  Sparkles, 
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useSidebar } from '@/context/SidebarContext'

export function Sidebar() {
  const pathname = usePathname()
  const { collapsed, toggleSidebar } = useSidebar()
  
  // Navigation links with icons
  const navLinks = [
    { href: '/dashboard', label: 'Home', icon: Home },
    { href: '/family', label: 'Family Page', icon: Users },
    { href: '/archive', label: 'Archive Page', icon: FolderArchive },
    { href: '/uploads', label: 'Uploads Page', icon: Upload },
    { href: '/ai-creations', label: 'AI Creation', icon: Sparkles },
    { href: '/events', label: 'Events Page', icon: Calendar }
  ]
  
  return (
    <aside 
      className={`fixed top-0 left-0 h-screen bg-primary text-primary-foreground flex flex-col z-20 transition-all duration-300 ${
        collapsed ? 'w-20 items-center px-2 py-6' : 'w-64 p-6'
      }`}
    >
      {/* Logo and Company Name */}
      <div className={`flex items-center mb-10 ${collapsed ? 'justify-center' : ''}`}>
        <div className={`flex-shrink-0 text-2xl ${collapsed ? 'mr-0' : 'mr-3'}`}>👋</div>
        {!collapsed && (
          <div className="font-bold text-xl">HeyStory</div>
        )}
      </div>
      
      {/* Toggle Button */}
      <button 
        className="absolute top-6 -right-3 rounded-full bg-primary text-primary-foreground p-1 shadow-md border border-primary-foreground/20"
        onClick={toggleSidebar}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? 
          <ChevronRight className="w-4 h-4" /> : 
          <ChevronLeft className="w-4 h-4" />
        }
      </button>
      
      {/* Navigation Links */}
      <nav className={`flex flex-col space-y-3 overflow-y-auto ${collapsed ? 'w-full' : ''}`}>
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center rounded-lg transition-colors ${
                collapsed 
                  ? 'justify-center px-2 py-3'
                  : 'px-4 py-3'
              } ${
                isActive 
                  ? 'bg-white/20 font-semibold' 
                  : 'hover:bg-white/10'
              }`}
              title={collapsed ? label : ''}
            >
              <Icon className={`w-5 h-5 ${collapsed ? '' : 'mr-3'}`} />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
} 