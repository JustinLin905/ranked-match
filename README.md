# Ranked Match - Friend Matching Site

A modern web application for finding friends with niche interests, built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🏠 Main Browsing Page
- **Search & Filter**: Find users by public title or tags
- **Tag Filtering**: Filter by specific interests (Intramurals, Dance, Gaming, etc.)
- **User Profiles**: Browse anonymized profiles with public titles
- **Apply System**: Express interest in potential matches
- **Countdown Timer**: Shows time until next matching period

### 💫 Tinder-like Matching Interface
- **Swipe Gestures**: 
  - Swipe left to reject
  - Swipe right to accept
  - Swipe down to shortlist for later
- **Card Stack**: Beautiful animated card stack with depth effect
- **Profile Details**: View user's facts, tags, and university info
- **Progress Tracking**: See how many cards remain

### 📊 Results Page
- **Match Summary**: View all accepted matches
- **Wait Period**: Clear instructions for next steps
- **Navigation**: Easy access back to browsing

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL with Prisma ORM
- **Animations**: Framer Motion
- **Gestures**: @use-gesture/react
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Docker (optional, for local database)

### Database Setup

#### Option 1: Using Docker (Recommended)
1. **Start PostgreSQL with Docker**
   ```bash
   docker-compose up -d
   ```
   This will start a PostgreSQL database on `localhost:5432`

#### Option 2: Local PostgreSQL Installation
1. Install PostgreSQL locally
2. Create a database named `ranked_match`
3. Update your `.env` file with your database connection string

### Environment Setup

1. **Create Environment File**
   ```bash
   cp .env.example .env
   ```
   
2. **Configure Database URL**
   Add your database connection string to `.env`:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/ranked_match"
   ```

### Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

3. **Run Database Migrations**
   ```bash
   npx prisma migrate dev
   ```

4. **Seed Database with Sample Data**
   ```bash
   npm run db:seed
   ```

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main browsing page
│   ├── matching/page.tsx     # Tinder-like swiping interface
│   ├── results/page.tsx     # Results and summary page
│   └── layout.tsx           # Root layout
├── components/              # Reusable components
├── data/
│   └── mockData.ts          # Generated user profiles
├── types/
│   └── index.ts             # TypeScript interfaces
└── hooks/                   # Custom React hooks

prisma/
├── schema.prisma            # Database schema definition
└── migrations/              # Database migration files

scripts/
└── seed.ts                  # Database seeding script

generated/
└── prisma/                  # Generated Prisma client
```

## Sample Data

The database is seeded with realistic sample data including:

- **10 diverse user profiles** with varied academic backgrounds
- **20 interest tags** covering hobbies and activities
- **Realistic user information** including:
  - Academic programs (Computer Science, Engineering, Mathematics, etc.)
  - Academic terms and sequences
  - Personal highlights and bios
  - Contact information (Instagram, Discord, phone)
  - Tag associations for matching algorithm

## Key Features

- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Card transitions and gesture feedback
- **Modern UI**: Clean, friendly design with gradients and shadows
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized with Next.js and modern React patterns
- **Database Integration**: PostgreSQL with Prisma ORM for data persistence

## Database & Prisma

### Database Schema

The application uses a PostgreSQL database with the following models:

- **User**: Stores user profiles with academic info, contact details, and preferences
- **Tag**: Interest tags for matching (many-to-many relationship with users)

### Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio

# Seed database with sample data
npm run db:seed
```

### Database Management

- **Migrations**: Database schema changes are tracked in `prisma/migrations/`
- **Schema**: Database structure defined in `prisma/schema.prisma`
- **Client**: Generated Prisma client available in `generated/prisma/`
- **Seeding**: Sample data script in `scripts/seed.ts`

### Environment Variables

Required environment variables:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/ranked_match"
```

## Development

- **Hot Reload**: Changes reflect immediately
- **Type Checking**: TypeScript ensures code quality
- **Linting**: ESLint for code consistency
- **Modern CSS**: Tailwind CSS for rapid styling

## Future Enhancements

- Real user authentication system
- Real-time matching algorithm
- Push notifications
- Mobile app version
- Advanced filtering options
- User preferences and settings
- Match history and analytics
- Social features (messaging, groups)
