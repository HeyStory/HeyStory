# HeyStory Project Rules & Best Practices

## Architecture Guidelines

### Directory Structure

```
.
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Auth-related routes (grouped)
│   │   ├── (dashboard)/       # Dashboard routes (grouped)
│   │   ├── _components/       # Shared components across routes
│   │   ├── api/               # API routes
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Global shared components
│   │   ├── ui/                # UI components (buttons, inputs, etc.)
│   │   └── layout/            # Layout components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility functions and shared logic
│   ├── server/                # Server-side code
│   │   ├── api/               # tRPC API definitions
│   │   └── db/                # Database models and connection
│   ├── stores/                # Zustand stores
│   ├── styles/                # Global styles and Stylus modules
│   └── types/                 # TypeScript type definitions
```

### Naming Conventions

- **Files & Directories**: Use kebab-case for directories and files
  - Example: `user-profile/`, `auth-form.tsx`
- **Components**: Use PascalCase for component names
  - Example: `UserProfile.tsx`, `AuthForm.tsx`
- **Hooks**: Use camelCase prefixed with `use`
  - Example: `useAuth.ts`, `useForm.ts`
- **Stores**: Use camelCase suffixed with `Store`
  - Example: `userStore.ts`, `authStore.ts`
- **Types**: Use PascalCase
  - Example: `User.ts`, `AuthPayload.ts`

## Coding Standards

### TypeScript

- Use explicit typing over implicit when not obvious
- Prefer interfaces for public APIs, types for complex types
- Use type inference when types are clear from context
- Avoid `any` type; use `unknown` if type is truly unknown

```typescript
// ✅ Good
interface User {
  id: string
  name: string
  email: string
}

// ❌ Bad
const user: any = { id: '1', name: 'John' }
```

### React Components

- Use functional components with named exports
- Follow the "function" keyword pattern for component definitions
- Keep components focused on a single responsibility
- Extract reusable logic to custom hooks

```typescript
// ✅ Good
export function UserCard({ user }: { user: User }) {
  return (
    <div className="rounded-md p-4 shadow-sm">
      <h3 className="text-lg font-medium">{user.name}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
    </div>
  )
}

// ❌ Bad
export default ({ user }) => (
  <div className="rounded-md p-4 shadow-sm">
    <h3 className="text-lg font-medium">{user.name}</h3>
    <p className="text-sm text-gray-600">{user.email}</p>
  </div>
)
```

### State Management

- Use React hooks for component-level state
- Use Zustand for global state management
- Create separate stores for different domains

```typescript
// Example Zustand store
import { create } from 'zustand'

interface UserStore {
  user: User | null
  isLoading: boolean
  setUser: (user: User | null) => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
}))
```

### API & Data Fetching

- Use tRPC for type-safe APIs
- Validate inputs with Zod schemas
- Organize routers by domain/feature

```typescript
// Example tRPC router
export const userRouter = createTRPCRouter({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.user.id),
    })
    return user
  }),
})
```

## Styling Guidelines

### CSS Approach

- Use Tailwind CSS for utility classes
- Use Stylus modules for component-specific styling
- Never use global CSS except for base styles

```tsx
// Component with Tailwind and Stylus module
import styles from './Card.module.styl'

export function Card({ children }) {
  return (
    <div className={`rounded-lg shadow-md p-4 ${styles.cardContainer}`}>
      {children}
    </div>
  )
}
```

```stylus
// Card.module.styl
.cardContainer
  position: relative
  transition: transform 0.2s ease
  
  &:hover
    transform: translateY(-2px)
```

### Component Organization

- Component file structure:
  1. Imports
  2. Type definitions
  3. Helper functions/constants
  4. Main component
  5. Sub-components

```tsx
// Example component organization
import { useState } from 'react'
import { api } from '~/trpc/react'

// Types
interface TaskProps {
  id: string
  title: string
  completed: boolean
}

// Helper functions
function formatTaskTitle(title: string) {
  return title.charAt(0).toUpperCase() + title.slice(1)
}

// Main component
export function Task({ id, title, completed }: TaskProps) {
  const [isCompleted, setIsCompleted] = useState(completed)
  // Component logic...
  
  return (
    <div>
      <TaskHeader title={formatTaskTitle(title)} />
      <TaskActions id={id} onComplete={() => setIsCompleted(true)} />
    </div>
  )
}

// Sub-components
function TaskHeader({ title }: { title: string }) {
  return <h3>{title}</h3>
}

function TaskActions({ id, onComplete }: { id: string; onComplete: () => void }) {
  return <button onClick={onComplete}>Complete</button>
}
```

## Performance Optimization

- Minimize client components, favor server components
- Use `useMemo` and `useCallback` for expensive computations
- Implement proper data fetching with React Query/SWR
- Leverage Next.js image optimization
- Use dynamic imports for code splitting

## Error Handling

- Use try/catch blocks for async operations
- Create custom error classes for specific errors
- Implement error boundaries at appropriate levels
- Use toast notifications for user-friendly errors

## Testing Strategy

- Unit tests for utility functions
- Component tests with React Testing Library
- Integration tests for critical flows
- E2E tests for full user journeys

## Git Workflow

- Use feature branches for new features
- Follow conventional commits
- Keep PRs focused and manageable size
- Write descriptive PR descriptions

## Documentation

- Use JSDoc comments for functions and components
- Keep a changelog for major changes
- Document API endpoints and parameters
- Maintain up-to-date README and setup instructions 