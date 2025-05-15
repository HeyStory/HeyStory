'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/app/_components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { Textarea } from '@/app/_components/ui/textarea'
import { Badge } from '@/app/_components/ui/badge'
import { X, ImagePlus, Loader2 } from 'lucide-react'
import type { FamilyMember } from '../cardview/FamilyMemberCard'

const formSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name must be less than 100 characters.' }),
  relation: z
    .string()
    .min(2, { message: 'Relation must be at least 2 characters.' })
    .max(100, { message: 'Relation must be less than 100 characters.' }),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' })
    .optional()
    .or(z.literal('')),
  description: z
    .string()
    .max(300, { message: 'Description must be less than 300 characters.' })
    .optional(),
})

type FormValues = z.infer<typeof formSchema>

interface FamilyMemberFormProps {
  member?: FamilyMember
  onSuccess: () => void
  onSubmitStart?: () => void
  hideButtons?: boolean
}

export function FamilyMemberForm({ 
  member, 
  onSuccess, 
  onSubmitStart,
  hideButtons = false 
}: FamilyMemberFormProps) {
  const [tags, setTags] = useState<string[]>(member?.tags ?? [])
  const [tagInput, setTagInput] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(member?.avatarUrl)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: member?.fullName ?? '',
      relation: member?.relation ?? '',
      description: member?.description ?? '',
      address: '',
      phone: '',
      email: '',
    },
  })
  const {handleSubmit, control} = form
  const addTag = () => {
    if (tagInput && !tags.includes(tagInput) && tags.length < 10) {
      setTags([...tags, tagInput])
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real application, you would upload the file to a server or cloud storage
      // Here we're just creating a local URL for preview
      const url = URL.createObjectURL(file)
      setAvatarUrl(url)
    }
  }

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true)
      if (onSubmitStart) {
        onSubmitStart()
      }
      
      // In a real application, you would send the data to an API
      // For demonstration purposes, we'll just simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Form submitted:', {
        ...data,
        tags,
        avatarUrl,
        id: member?.id ?? Date.now(),
      })
      
      onSuccess()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col items-center justify-center">
        <div 
          className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-dashed border-primary/50 flex items-center justify-center bg-muted cursor-pointer group"
          onClick={() => fileInputRef.current?.click()}
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Profile picture"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <ImagePlus className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="text-xs text-muted-foreground mt-2">Upload Photo</span>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Click to upload or change photo
        </p>
      </div>

      <Form {...form}>
        <form id="family-member-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="relation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relation</FormLabel>
                  <FormControl>
                    <Input placeholder="Father, Mother, Sister, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, City, State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 (555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Bio / Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share a bit about this family member..."
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Limit to 2-3 lines (300 characters max).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormLabel>Tags / Interests</FormLabel>
            <div className="flex flex-wrap gap-2 mt-2 mb-4">
              {tags.map((tag) => (
                <Badge key={tag} className="flex items-center gap-1">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add tags (press Enter or comma to add)"
                className="flex-1"
              />
              <Button type="button" variant="outline" onClick={addTag}>
                Add
              </Button>
            </div>
            <FormDescription className="mt-2">
              Add up to 10 tags or interests (e.g., &quot;Cooking,&quot; &quot;Photography&quot;).
            </FormDescription>
          </div>

          {!hideButtons && (
            <div className="flex gap-4 mt-6">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Member'
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => onSuccess()}
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  )
} 