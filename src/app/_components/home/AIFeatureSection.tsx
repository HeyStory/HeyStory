'use client'

import { FeatureBox } from '../ui/FeatureBox'

export function AIFeatureSection() {
  // These would come from API/store in real implementation
  const videoFeature = {
    title: 'AI Generated Video',
    description: 'Your family vacation memories compiled into a video',
    image: '/images/placeholders/ai-video.jpg', // Updated placeholder path
    href: '/ai-creations/video'
  }
  
  const textFeature = {
    title: 'AI Story Summary',
    description: 'Your grandfather\'s stories automatically summarized',
    image: '/images/placeholders/ai-story.jpg', // Updated placeholder path
    href: '/ai-creations/story'
  }
  
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">AI Creations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureBox
          {...videoFeature}
          color="blue"
        />
        
        <FeatureBox
          {...textFeature}
          color="yellow"
        />
      </div>
    </section>
  )
} 