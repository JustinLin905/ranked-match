// Prisma Term enum values
export type Term =
  | "TERM_1A"
  | "TERM_1B"
  | "TERM_2A"
  | "TERM_2B"
  | "TERM_3A"
  | "TERM_3B"
  | "TERM_4A"
  | "TERM_4B"
  | "TERM_5A"
  | "TERM_5B";

export interface Tag {
  value: string;
}

export interface UserProfile {
  email: string; // Primary key
  firstName: string;
  lastName: string;
  program: string; // Replaces 'major'
  tags: Tag[]; // Array of Tag objects with value
  highlights: string[]; // Replaces 'facts'
  term: Term; // Enum type
  sequence: Record<string, boolean>; // JSON field for term availability
  bio: string;
  active_in_cycle: boolean;
  instagram?: string | null;
  discord?: string | null;
  phone?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationState {
  appliedTo: string[]; // User IDs the current user applied to
  appliedBy: string[]; // User IDs that applied to current user
  accepted: string[]; // User IDs the current user accepted
  rejected: string[]; // User IDs the current user rejected
  shortlisted: string[]; // User IDs the current user shortlisted
}

export interface SwipeDirection {
  direction: "left" | "right" | "down";
}

export interface CardPosition {
  x: number;
  y: number;
  rotation: number;
  scale: number;
}
