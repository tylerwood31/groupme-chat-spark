
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
  total_messages: number;
  total_likes: number;
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
}

export interface UserStats {
  user_id: string;
  name: string;
  avatar_url: string;
  message_count: number;
  likes_received: number;
  likes_given: number;
  activity_score: number;
}
