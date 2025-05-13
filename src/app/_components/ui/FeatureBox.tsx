'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

interface FeatureBoxProps {
  title: string
  description: string
  image: string
  color: 'blue' | 'yellow'
  href: string
}

export function FeatureBox({ 
  title, 
  description, 
  image, 
  color = 'blue',
  href 
}: FeatureBoxProps) {
  return (
    <Link 
      href={href} 
      className={`relative flex rounded-2xl overflow-hidden h-52 transition-all hover:-translate-y-1 hover:shadow-lg ${
        color === 'blue' 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-[#fbbf24] text-[#1e293b]'
      }`}
    >
      <div className="p-6 w-1/2 flex flex-col z-10">
        <h3 className="text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-sm mb-auto">{description}</p>
        <div className="flex items-center text-sm font-medium mt-4">
          View More <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
      
      <div className="absolute right-0 top-0 w-1/2 h-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </Link>
  )
} 