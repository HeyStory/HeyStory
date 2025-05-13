# HeyStory Development Setup & TODOs

## Development Environment Setup

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd heystory
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   - Create a `.env` file in the root directory with the following content:
   ```
   DATABASE_URL=postgres://postgres:password@localhost:5432/heystory
   ```

4. **Start the Database**
   ```bash
   chmod +x start-database.sh
   ./start-database.sh
   ```

5. **Create Database Schema**
   ```bash
   npm run db:push
   ```

6. **Start Development Server**
   ```bash
   npm run dev
   ```
   - The application will be available at `http://localhost:3000`

7. **Database Management Tools**
   - To view and manage the database, run:
   ```bash
   npm run db:studio
   ```

## Code Quality Tools

- **Type Checking**
  ```bash
  npm run typecheck
  ```

- **ESLint**
  ```bash
  npm run lint
  ```
  To fix auto-fixable issues:
  ```bash
  npm run lint:fix
  ```

- **Formatting with Prettier**
  ```bash
  npm run format:check
  npm run format:write
  ```

## TODO Items

### Immediate Tasks

1. **Authentication**
   - [ ] Implement user authentication (consider using NextAuth.js or Clerk)
   - [ ] Add user model to database schema
   - [ ] Create protected API routes

2. **UI Enhancements**
   - [ ] Add Shadcn UI for consistent component design
   - [ ] Implement responsive layouts for mobile devices
   - [ ] Create a proper navigation component

3. **State Management**
   - [ ] Add Zustand for global state management
   - [ ] Create stores for features requiring global state

### Future Improvements

1. **Feature Additions**
   - [ ] Implement full CRUD operations for posts
   - [ ] Add user profiles
   - [ ] Create a commenting system

2. **Performance Optimizations**
   - [ ] Implement pagination for lists
   - [ ] Add proper error handling and loading states
   - [ ] Optimize data fetching with React Server Components

3. **Testing**
   - [ ] Set up Jest and React Testing Library
   - [ ] Add unit tests for components
   - [ ] Add integration tests for critical flows

4. **Deployment**
   - [ ] Configure CI/CD pipeline
   - [ ] Set up production database
   - [ ] Configure monitoring and logging

5. **Documentation**
   - [ ] Add JSDoc comments to important functions
   - [ ] Create API documentation
   - [ ] Document component usage examples

## Best Practices to Follow

1. **Code Structure**
   - Follow the established file naming conventions
   - Organize components by feature or domain
   - Use the `_components` directory for page-specific components

2. **TypeScript**
   - Define proper interfaces and types
   - Avoid using `any` type
   - Leverage TypeScript's type inference where possible

3. **React Patterns**
   - Use functional components with hooks
   - Extract reusable logic into custom hooks
   - Leverage React Server Components where possible

4. **API Design**
   - Keep using tRPC for type-safe APIs
   - Define proper input validation with Zod
   - Organize routers by domain 