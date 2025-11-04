import { UserProfile, Term, Tag } from "@/types";

// Predefined tags for consistency
const AVAILABLE_TAGS = [
  'Intramurals', 'Dance', 'Looking for a club', 'Gaming', 'Music', 'Art',
  'Photography', 'Cooking', 'Fitness', 'Reading', 'Movies', 'Travel',
  'Volunteering', 'Entrepreneurship', 'Research', 'Study groups',
  'Outdoor activities', 'Board games', 'Programming', 'Design',
  'Sports', 'Theater', 'Debate', 'Writing', 'Languages'
];

// Sample facts/interests
const SAMPLE_FACTS = [
  'I can solve a Rubik\'s cube in under 2 minutes',
  'I\'ve traveled to 15 different countries',
  'I play guitar and write my own songs',
  'I\'m learning Japanese in my spare time',
  'I volunteer at the local animal shelter',
  'I\'m obsessed with astronomy and stargazing',
  'I can cook authentic Italian pasta from scratch',
  'I\'ve run 3 marathons and planning my 4th',
  'I collect vintage vinyl records',
  'I\'m teaching myself how to code',
  'I love hiking and have climbed 5 mountains',
  'I\'m a certified scuba diver',
  'I play chess competitively',
  'I\'m learning to play the piano',
  'I write poetry and have been published',
  'I\'m passionate about sustainable living',
  'I love trying new cuisines from different cultures',
  'I\'m learning digital art and graphic design',
  'I volunteer as a tutor for underprivileged kids',
  'I\'m fascinated by psychology and human behavior',
  'I love building things with my hands',
  'I\'m learning Spanish and French',
  'I enjoy rock climbing and bouldering',
  'I\'m a coffee enthusiast and amateur barista',
  'I love dancing salsa and bachata',
  'I\'m learning web development',
  'I enjoy playing board games and D&D',
  'I love photography and have my own darkroom',
  'I\'m learning to play the violin',
  'I enjoy gardening and growing my own herbs'
];

const MAJORS = [
  'Computer Science', 'Engineering', 'Business Administration', 'Psychology',
  'Biology', 'Mathematics', 'English Literature', 'Economics', 'Physics',
  'Chemistry', 'Political Science', 'History', 'Art', 'Music', 'Philosophy',
  'Sociology', 'Anthropology', 'Environmental Science', 'Nursing', 'Medicine'
];

const TERMS: Term[] = ['TERM_1A', 'TERM_1B', 'TERM_2A', 'TERM_2B', 'TERM_3A', 'TERM_3B', 'TERM_4A', 'TERM_4B', 'TERM_5A', 'TERM_5B'];

const PUBLIC_TITLES = [
  'Sick Basketball Player', 'Coffee Addict', 'Future CEO', 'Art Enthusiast',
  'Music Producer', 'Fitness Fanatic', 'Bookworm', 'Travel Explorer',
  'Tech Innovator', 'Creative Soul', 'Adventure Seeker', 'Foodie',
  'Dance Machine', 'Gaming Master', 'Nature Lover', 'Photography Pro',
  'Study Buddy', 'Party Animal', 'Quiet Genius', 'Social Butterfly',
  'Fitness Guru', 'Movie Buff', 'Language Learner', 'Volunteer Hero',
  'Entrepreneur', 'Research Nerd', 'Outdoor Enthusiast', 'Board Game King',
  'Code Wizard', 'Design Diva', 'Sports Star', 'Theater Kid',
  'Debate Champion', 'Writing Whiz', 'Multilingual Marvel'
];

const NAMES = [
  'Alex Johnson', 'Sarah Chen', 'Michael Rodriguez', 'Emily Davis',
  'James Wilson', 'Jessica Brown', 'David Lee', 'Ashley Taylor',
  'Christopher Martinez', 'Amanda Garcia', 'Matthew Anderson',
  'Jennifer Thomas', 'Daniel Jackson', 'Michelle White', 'Robert Harris',
  'Nicole Martin', 'William Thompson', 'Stephanie Garcia', 'Joseph Clark',
  'Rachel Lewis', 'Andrew Walker', 'Lauren Hall', 'Ryan Allen',
  'Megan Young', 'Kevin King', 'Samantha Wright', 'Brandon Lopez',
  'Brittany Hill', 'Tyler Scott', 'Kayla Green', 'Jordan Adams',
  'Taylor Baker', 'Morgan Gonzalez', 'Casey Nelson', 'Riley Carter',
  'Avery Mitchell', 'Quinn Perez', 'Sage Roberts', 'River Turner',
  'Skyler Phillips', 'Dakota Campbell', 'Phoenix Parker', 'River Evans',
  'Sage Edwards', 'Quinn Collins', 'Avery Stewart', 'Morgan Sanchez',
  'Taylor Morris', 'Jordan Rogers', 'Casey Reed', 'Riley Cook',
  'Avery Morgan', 'Quinn Bell', 'Sage Murphy', 'River Bailey',
  'Skyler Rivera', 'Dakota Cooper', 'Phoenix Richardson', 'River Cox'
];

// Simple deterministic "random" function for consistent SSR/client rendering
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate deterministic facts for a user
function generateFacts(seed: number): string[] {
  const shuffled = [...SAMPLE_FACTS].sort((a, b) => {
    const aHash = a.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0);
    const bHash = b.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0);
    return seededRandom(seed + aHash) - seededRandom(seed + bHash);
  });
  return shuffled.slice(0, 5);
}

// Generate deterministic tags for a user
function generateTags(seed: number): Tag[] {
  const numTags = Math.floor(seededRandom(seed) * 6); // 0-5 tags
  const shuffled = [...AVAILABLE_TAGS].sort((a, b) => {
    const aHash = a.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0);
    const bHash = b.split('').reduce((hash, char) => hash + char.charCodeAt(0), 0);
    return seededRandom(seed + aHash) - seededRandom(seed + bHash);
  });
  return shuffled.slice(0, numTags).map(tag => ({ value: tag }));
}

// Generate deterministic social media links
function generateSocialMedia(seed: number) {
  const hasSocial = seededRandom(seed) > 0.3; // 70% chance of having social media
  if (!hasSocial) return {};
  
  const social: any = {};
  if (seededRandom(seed + 1) > 0.5) social.instagram = `@user${seed}`;
  if (seededRandom(seed + 2) > 0.5) social.discord = `user${seed}#1234`;
  if (seededRandom(seed + 3) > 0.5) social.phone = `+1 (555) ${String(seed).padStart(3, '0')}-${String(seed + 1000).slice(-4)}`;
  
  return social;
}

// Generate mock user profiles
export function generateMockUsers(): UserProfile[] {
  const users: UserProfile[] = [];
  
  for (let i = 0; i < 60; i++) {
    const fullName = NAMES[i % NAMES.length];
    const [firstName, lastName] = fullName.split(' ');
    const socialMedia = generateSocialMedia(i + 500);
    const termIndex = Math.floor(seededRandom(i + 100) * TERMS.length);
    
    const user: UserProfile = {
      email: `user${i + 1}@example.com`,
      firstName: firstName,
      lastName: lastName,
      program: MAJORS[Math.floor(seededRandom(i + 200) * MAJORS.length)],
      tags: generateTags(i + 400),
      highlights: generateFacts(i + 300),
      term: TERMS[termIndex],
      sequence: {
        TERM_1A: seededRandom(i + 600) > 0.5,
        TERM_1B: seededRandom(i + 601) > 0.5,
        TERM_2A: seededRandom(i + 602) > 0.5,
        TERM_2B: seededRandom(i + 603) > 0.5,
        TERM_3A: seededRandom(i + 604) > 0.5,
        TERM_3B: seededRandom(i + 605) > 0.5,
        TERM_4A: seededRandom(i + 606) > 0.5,
        TERM_4B: seededRandom(i + 607) > 0.5,
        TERM_5A: seededRandom(i + 608) > 0.5,
        TERM_5B: seededRandom(i + 609) > 0.5,
      },
      bio: `${PUBLIC_TITLES[i % PUBLIC_TITLES.length]}. Passionate about learning and connecting with like-minded people.`,
      active_in_cycle: seededRandom(i + 700) > 0.3,
      instagram: socialMedia.instagram || null,
      discord: socialMedia.discord || null,
      phone: socialMedia.phone || null,
      createdAt: new Date(Date.now() - Math.floor(seededRandom(i + 800) * 30 * 24 * 60 * 60 * 1000)),
      updatedAt: new Date(),
    };
    
    users.push(user);
  }
  
  return users;
}

// Export the generated users
export const mockUsers = generateMockUsers();

// Export available tags for filtering
export { AVAILABLE_TAGS };
