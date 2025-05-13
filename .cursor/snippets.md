# HeyStory Code Snippets

## React Components

### Basic Component

```tsx
export function ComponentName({ prop1, prop2 }: ComponentNameProps) {
  return (
    <div>
      <h1>{prop1}</h1>
      <p>{prop2}</p>
    </div>
  )
}

interface ComponentNameProps {
  prop1: string
  prop2: string
}
```

### Server Component

```tsx
import { api } from '~/trpc/server'

export async function ServerComponent() {
  const data = await api.someRouter.someQuery.query()
  
  return (
    <div>
      <h1>Server Component</h1>
      <p>{data.someField}</p>
    </div>
  )
}
```

### Client Component

```tsx
'use client'

import { useState } from 'react'

export function ClientComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
```

## tRPC

### Router Definition

```tsx
import { z } from 'zod'
import { createTRPCRouter, publicProcedure, protectedProcedure } from '~/server/api/trpc'

export const exampleRouter = createTRPCRouter({
  // Public query example
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.examples.findMany()
  }),
  
  // Public query with input
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.examples.findFirst({
        where: eq(examples.id, input.id),
      })
    }),
  
  // Protected mutation example
  create: protectedProcedure
    .input(z.object({ 
      name: z.string().min(1).max(100),
      description: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(examples).values({
        name: input.name,
        description: input.description,
        userId: ctx.user.id,
      })
    }),
})
```

### Client Usage

```tsx
'use client'

import { api } from '~/trpc/react'

export function DataComponent() {
  // Query
  const { data, isLoading } = api.example.getAll.useQuery()
  
  // Mutation
  const utils = api.useUtils()
  const createMutation = api.example.create.useMutation({
    onSuccess: async () => {
      await utils.example.getAll.invalidate()
    },
  })
  
  if (isLoading) return <div>Loading...</div>
  
  return (
    <div>
      <ul>
        {data?.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button
        onClick={() => {
          createMutation.mutate({ name: 'New Item' })
        }}
      >
        Add New
      </button>
    </div>
  )
}
```

## Drizzle ORM

### Schema Definition

```tsx
import { sql } from 'drizzle-orm'
import { index, pgTableCreator } from 'drizzle-orm/pg-core'

export const createTable = pgTableCreator((name) => `heystory_${name}`)

export const examples = createTable(
  'example',
  (d) => ({
    id: d.integer().primaryKey().generatedByDefaultAsIdentity(),
    name: d.varchar({ length: 100 }).notNull(),
    description: d.text(),
    userId: d.varchar({ length: 255 }).notNull(),
    createdAt: d.timestamp({ withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index('name_idx').on(t.name),
    index('user_id_idx').on(t.userId),
  ],
)

// Relations
export const exampleRelations = relations(examples, ({ many, one }) => ({
  user: one(users, {
    fields: [examples.userId],
    references: [users.id],
  }),
  tags: many(exampleTags),
}))
```

### Database Queries

```tsx
// Insert
await db.insert(examples).values({
  name: 'Example',
  description: 'Description',
  userId: user.id,
})

// Select
await db.query.examples.findMany({
  where: eq(examples.userId, user.id),
  orderBy: [desc(examples.createdAt)],
  limit: 10,
})

// Update
await db.update(examples)
  .set({ name: 'Updated Example' })
  .where(eq(examples.id, id))

// Delete
await db.delete(examples)
  .where(eq(examples.id, id))
```

## Zustand Store

```tsx
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
}

interface AuthStore {
  user: User | null
  isLoading: boolean
  error: string | null
  
  setUser: (user: User | null) => void
  setError: (error: string | null) => void
  setLoading: (isLoading: boolean) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,
      
      setUser: (user) => set({ user, error: null }),
      setError: (error) => set({ error }),
      setLoading: (isLoading) => set({ isLoading }),
      logout: () => set({ user: null, error: null }),
    }),
    {
      name: 'auth-store',
    }
  )
)
```

## Custom Hooks

```tsx
// Form handling hook
import { useState } from 'react'

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  
  const handleSubmit = async (
    onSubmit: (values: T) => Promise<void> | void,
    validate?: (values: T) => Partial<Record<keyof T, string>>
  ) => {
    return async (e: React.FormEvent) => {
      e.preventDefault()
      
      if (validate) {
        const validationErrors = validate(values)
        setErrors(validationErrors)
        if (Object.keys(validationErrors).length > 0) return
      }
      
      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } finally {
        setIsSubmitting(false)
      }
    }
  }
  
  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
  }
}
```

## Stylus Module Example

```stylus
// Button.module.styl
.button
  position: relative
  display: inline-flex
  align-items: center
  justify-content: center
  font-weight: 500
  transition: all 0.2s ease
  
  &.primary
    background: linear-gradient(to right, #667eea, #764ba2)
    color: white
    
    &:hover
      transform: translateY(-2px)
      box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4)
    
  &.secondary
    background: transparent
    border: 1px solid #667eea
    color: #667eea
    
    &:hover
      background: rgba(102, 126, 234, 0.1)
  
  &.loading
    opacity: 0.7
    pointer-events: none
    
    &:after
      content: ''
      position: absolute
      width: 1rem
      height: 1rem
      border-radius: 50%
      border: 2px solid currentColor
      border-top-color: transparent
      animation: spin 0.6s linear infinite
      
@keyframes spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
```

## Next.js Route Handlers

```tsx
// src/app/api/example/route.ts
import { NextResponse } from 'next/server'
import { z } from 'zod'

const inputSchema = z.object({
  name: z.string().min(1).max(100),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsedBody = inputSchema.safeParse(body)
    
    if (!parsedBody.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    
    // Handle the request
    const { name } = parsedBody.data
    
    return NextResponse.json({ success: true, name })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
``` 