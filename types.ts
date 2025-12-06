export interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  icon?: 'star' | 'heart' | 'award' | 'baby' | 'home' | 'Activity';
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  dateAdded: number;
}

export interface Message {
  id: string;
  author: string;
  text: string;
  date: string;
}

export interface AudioTrack {
  id: string;
  title: string;
  url: string; // Data URL or external link
  duration?: string;
}

export interface VideoItem {
    id: string;
    title: string;
    url: string; // Embed URL or file URL
    thumbnail?: string;
}