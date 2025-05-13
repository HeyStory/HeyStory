'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'

interface SummaryCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function SummaryCard({ title, value, icon, trend }: SummaryCardProps) {
  return (
    <div className="flex p-5 bg-card text-card-foreground rounded-xl shadow transition-transform hover:-translate-y-1">
      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mr-4 text-primary">
        {icon}
      </div>
      
      <div className="flex flex-col">
        <h3 className="text-sm text-muted-foreground mb-1">{title}</h3>
        <p className="text-2xl font-semibold mb-1">{value}</p>
        
        {trend && (
          <div className={`flex items-center text-xs ${
            trend.isPositive ? 'text-[#10b981]' : 'text-[#ef4444]'
          }`}>
            {trend.isPositive ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
    </div>
  )
} 