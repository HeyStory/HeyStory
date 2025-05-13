# HeyStory Application Overview

## Tech Stack

This application is built using the T3 stack, with the following key technologies:

- **Next.js 15** (App Router) - React framework for server-rendered applications
- **TypeScript** - Typed JavaScript for better developer experience
- **tRPC** - End-to-end typesafe APIs
- **Drizzle ORM** - Lightweight TypeScript ORM
- **PostgreSQL** - Database
- **TailwindCSS** - Utility-first CSS framework
- **React Query** - Server state management
- **Zod** - Schema validation

## Project Structure

```
.
├── public/                 # Static assets
├── src/                    # Source code
│   ├── app/                # Next.js app directory (App Router)
│   │   ├── api/            # API routes
│   │   │   └── trpc/       # tRPC API endpoint
│   │   ├── _components/    # Client components
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── server/             # Server-side code
│   │   ├── api/            # tRPC API definitions
│   │   │   ├── routers/    # tRPC routers
│   │   │   ├── root.ts     # Root router
│   │   │   └── trpc.ts     # tRPC setup
│   │   └── db/             # Database
│   │       ├── index.ts    # Database connection
│   │       └── schema.ts   # Database schema
│   ├── styles/             # Global styles
│   ├── trpc/               # tRPC client setup
│   │   ├── query-client.ts # React Query client
│   │   ├── react.tsx       # tRPC React hooks
│   │   └── server.ts       # Server-side helpers
│   └── env.js              # Environment variables validation
├── drizzle.config.ts       # Drizzle ORM configuration
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── start-database.sh       # Database setup script
└── tsconfig.json           # TypeScript configuration
```

## Application Features

The application currently has a simple post management system with the following features:

1. Display the most recent post
2. Create new posts with a title
3. tRPC query demonstration with a "Hello" endpoint

## Database

The app uses PostgreSQL with Drizzle ORM. The database schema includes a `posts` table with the following structure:

- `id`: Integer (Primary Key)
- `name`: VARCHAR(256)
- `createdAt`: Timestamp with timezone
- `updatedAt`: Timestamp with timezone

## API Structure

The API is built using tRPC, which provides end-to-end type safety between the client and server. The current API includes:

- `post.hello`: Simple query that returns a greeting message
- `post.create`: Mutation to create a new post
- `post.getLatest`: Query to get the most recent post 