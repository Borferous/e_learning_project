export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'performance' | 'workshop' | 'masterclass' | 'competition';
  status: 'upcoming' | 'ongoing' | 'completed';
  capacity: number;
  participants: string[];
  image?: string;
  requirements?: string[];
  performanceSubmissionRequired?: boolean;
  recordingUrl?: string;
}

export interface EventType {
  thumbnail: string;
  title: string;
  subtitle: string;
  mediaType: 'Live Streamed' | 'Recorded';
  category: 'Workshop' | 'Seminar' | 'Performance';
  registrationDate: string;
  startDate: string;
  endDate: string;
  time: string;
  description: string;
  welcomeMessage: string;
  trailerUrl: string;
  isRegistered: boolean;
  eventId: string;
  registrationStatus: 'none' | 'pending' | 'approved' | 'rejected';
  submissions?: {
    studentId: string;
    studentName: string;
    piece: string;
    submissionDate: string;
    videoUrl: string;
    status: string;
  }[];
  instructors: string[];
  duration: number;
  streamingPlatform?: 'zoom' | 'teams' | 'gmeet';
  streamingLink?: string;
  recordedVideoUrl?: string;
}