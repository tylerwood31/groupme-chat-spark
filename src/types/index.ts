
export interface User {
  id: string;
  name: string;
  avatar_url: string;
  token?: string;
}

export interface Group {
  id: string;
  name: string;
  image_url: string;
  description: string;
  member_count: number;
  selected?: boolean;
}

export interface Message {
  id: string;
  sender_id: string;
  sender_name: string;
  text: string;
  created_at: number;
  likes: number;
  attachments: Attachment[];
}

export interface Attachment {
  type: string;
  url?: string;
}

export interface RecapSummary {
  title: string;
  period: string;
  date: string;
  group_name: string;
  group_image_url?: string;
  total_messages: number;
  total_likes: number;
  member_count?: number;
  top_poster: {
    name: string;
    avatar_url: string;
    message_count: number;
  };
  most_liked: {
    name: string;
    avatar_url: string;
    likes_count: number;
  };
  trending_topics: string[];
  highlight_message: {
    text: string;
    sender: string;
    likes: number;
  };
  daily_activity?: Array<{
    day: string;
    messages: number;
    likes: number;
  }>;
  text_recap?: string; // New field for the text recap
}

export interface UserStats {
  user_id: string;
  name: string;
  avatar_url: string;
  message_count: number;
  likes_received: number;
  likes_given: number;
  activity_score: number;
  rank?: number;
}

export interface WeeklyStats {
  rank: number;
  total_members: number;
  messages_sent: number;
  likes_received: number;
  like_ratio: number;
  most_active_day: string;
  most_active_time: string;
  streak_days: number;
  streak_type?: string;
  personal_bests: {
    most_messages_day: {
      count: number;
      date: string;
    };
    most_likes_week: {
      count: number;
      date: string;
    };
    most_liked_message: {
      text: string;
      likes: number;
      date: string;
    };
  };
  daily_activity: Array<{
    day: string;
    messages: number;
    likes: number;
  }>;
}
