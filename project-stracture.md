.
├── progress
│   ├── archive-page
│   │   └── overview.md
│   ├── create-page
│   │   └── overview.md
│   ├── events-page
│   │   └── overview.md
│   ├── family-page
│   │   ├── add-member.md
│   │   └── overview.md
│   ├── home-page
│   │   ├── component-plan.md
│   │   ├── design-system.md
│   │   ├── implementation-plan.md
│   │   ├── implementation-status.md
│   │   ├── overview.md
│   │   ├── tailwind-implementation.md
│   │   └── todo.md
│   └── prompt.md
├── public
│   ├── images
│   │   ├── placeholders
│   │   ├── archive.jpeg
│   │   ├── cards.jpeg
│   │   ├── homepage.jpeg
│   │   └── logo.jpeg
│   └── favicon.ico
├── scripts
│   └── create-placeholders.js
├── src
│   ├── app
│   │   ├── api
│   │   │   └── trpc
│   │   │       └── [trpc]
│   │   │           └── route.ts
│   │   ├── (authenticated)
│   │   │   ├── dashboard
│   │   │   │   └── page.tsx
│   │   │   ├── family
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── _components
│   │   │   ├── family
│   │   │   │   ├── cardview
│   │   │   │   │   ├── CardView.tsx
│   │   │   │   │   └── FamilyMemberCard.tsx
│   │   │   │   ├── form
│   │   │   │   │   ├── EditFamilyMemberForm.tsx
│   │   │   │   │   ├── FamilyMemberForm.tsx
│   │   │   │   │   └── FamilyMemberPanel.tsx
│   │   │   │   ├── treeview
│   │   │   │   │   ├── TreeNode.tsx
│   │   │   │   │   └── TreeView.tsx
│   │   │   │   ├── AddFamilyMemberDialog.tsx
│   │   │   │   ├── FamilyPage.tsx
│   │   │   │   └── index.ts
│   │   │   ├── home
│   │   │   │   ├── AIFeatureSection.tsx
│   │   │   │   ├── index.ts
│   │   │   │   └── SummarySection.tsx
│   │   │   ├── layout
│   │   │   │   ├── index.ts
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── SidePanel.tsx
│   │   │   │   └── TopNav.tsx
│   │   │   └── ui
│   │   │       ├── alert-dialog.tsx
│   │   │       ├── avatar.tsx
│   │   │       ├── badge.tsx
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── dropdown-menu.tsx
│   │   │       ├── FeatureBox.tsx
│   │   │       ├── form.tsx
│   │   │       ├── index.ts
│   │   │       ├── input.tsx
│   │   │       ├── label.tsx
│   │   │       ├── separator.tsx
│   │   │       ├── sheet.tsx
│   │   │       ├── skeleton.tsx
│   │   │       ├── sonner.tsx
│   │   │       ├── SummaryCard.tsx
│   │   │       ├── switch.tsx
│   │   │       ├── textarea.tsx
│   │   │       ├── ThemeToggle.tsx
│   │   │       └── tooltip.tsx
│   │   ├── lib
│   │   │   └── utils.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── context
│   │   ├── SidebarContext.tsx
│   │   └── ThemeContext.tsx
│   ├── lib
│   │   └── utils.ts
│   ├── server
│   │   ├── api
│   │   │   ├── routers
│   │   │   │   ├── ai.ts
│   │   │   │   ├── event.ts
│   │   │   │   ├── file.ts
│   │   │   │   ├── project-stracture.md
│   │   │   │   ├── story.ts
│   │   │   │   └── user.ts
│   │   │   ├── root.ts
│   │   │   └── trpc.ts
│   │   └── db
│   │       ├── index.ts
│   │       └── schema.ts
│   ├── store
│   │   └── ui-store.ts
│   ├── styles
│   │   └── globals.css
│   ├── trpc
│   │   ├── query-client.ts
│   │   ├── react.tsx
│   │   └── server.ts
│   ├── env.js
│   └── middleware.ts
├── components.json
├── drizzle.config.ts
├── eslint.config.js
├── next.config.js
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.js
├── prettier.config.js
├── project-overview.md
├── project-stracture.md
├── project-summary.md
├── README.md
├── start-database.sh
└── tsconfig.json

37 directories, 99 files
