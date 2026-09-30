# Mini Task Board

A simple full-stack task management application built with Next.js, TypeScript, React, Node.js API Routes, and MySQL.

## Features

- View all tasks
- Add a new task
- Task status:
  - Todo
  - In Progress
  - Done
- Update task status
- Delete tasks
- Form validation
- Loading and error states
- MySQL database persistence
- Parameterized SQL queries
- Responsive basic UI

## Tech Stack

### Frontend
- Next.js 16
- React
- TypeScript
- CSS

### Backend
- Next.js App Router API Routes
- Node.js
- TypeScript

### Database
- MySQL
- mysql2

## Why Next.js API Routes?

I used Next.js API Routes instead of a separate Express server because this is a small single-page application. Keeping the frontend and backend in the same Next.js project makes the project simpler to develop, run, and maintain.

## Project Structure

```text
mini-task-board/
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── [id]/
│   │       │   └── route.ts
│   │       └── route.ts
│   ├── globals.css
│   └── page.tsx
│
├── components/
│   ├── TaskBoard.tsx
│   ├── TaskForm.tsx
│   └── TaskItem.tsx
│
├── lib/
│   └── db.ts
│
├── types/
│   └── task.ts
│
├── sql/
│   └── schema.sql
│
├── .env.local
├── package.json
└── README.md