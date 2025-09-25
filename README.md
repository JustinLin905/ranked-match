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
- **Animations**: Framer Motion
- **Gestures**: @use-gesture/react
- **Icons**: Lucide React

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
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
```

## Mock Data

The application includes 60+ generated user profiles with:
- Diverse public titles ("Sick Basketball Player", "Coffee Addict", etc.)
- University information (year, term, major)
- 5 unique facts per user
- Random tag assignments
- Optional social media links

## Key Features

- **Responsive Design**: Works on desktop and mobile
- **Smooth Animations**: Card transitions and gesture feedback
- **Modern UI**: Clean, friendly design with gradients and shadows
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized with Next.js and modern React patterns

## Development

- **Hot Reload**: Changes reflect immediately
- **Type Checking**: TypeScript ensures code quality
- **Linting**: ESLint for code consistency
- **Modern CSS**: Tailwind CSS for rapid styling

## Future Enhancements

- Real user authentication
- Database integration
- Real-time matching algorithm
- Push notifications
- Mobile app version
- Advanced filtering options
