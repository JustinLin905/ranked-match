export interface UserProfile {
  id: string;
  realName: string; // Hidden from other users
  publicTitle: string; // Displayed to others
  term: string; // '1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B'
  major: string;
  facts: string[]; // Exactly 5 facts/interests
  tags: string[]; // Zero or more tags
  socialMediaLinks: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

export interface ApplicationState {
  appliedTo: string[]; // User IDs the current user applied to
  appliedBy: string[]; // User IDs that applied to current user
  accepted: string[]; // User IDs the current user accepted
  rejected: string[]; // User IDs the current user rejected
  shortlisted: string[]; // User IDs the current user shortlisted
}

export interface SwipeDirection {
  direction: 'left' | 'right' | 'down';
}

export interface CardPosition {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}
