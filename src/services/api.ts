
import { Group, Message, RecapSummary, UserStats } from "../types";

// This is a mock API service - in the real app, this would make calls to your backend
// which would then use the GroupMe API

// Mock data
const mockGroups: Group[] = [
  {
    id: "1",
    name: "College Friends",
    image_url: "https://i.pravatar.cc/150?img=10",
    description: "Friends from college catching up",
    member_count: 12
  },
  {
    id: "2",
    name: "Work Team",
    image_url: "https://i.pravatar.cc/150?img=11",
    description: "Work team communication",
    member_count: 8
  },
  {
    id: "3",
    name: "Family Chat",
    image_url: "https://i.pravatar.cc/150?img=12",
    description: "Family updates and plans",
    member_count: 6
  },
  {
    id: "4",
    name: "Vacation Planning",
    image_url: "https://i.pravatar.cc/150?img=13",
    description: "Planning our summer trip",
    member_count: 5
  }
];

const mockRecaps: Record<string, RecapSummary> = {
  "1": {
    title: "Weekly Recap",
    period: "May 21 - May 27",
    date: "May 28, 2024",
    group_name: "College Friends",
    total_messages: 342,
    total_likes: 78,
    top_poster: {
      name: "Sarah Johnson",
      avatar_url: "https://i.pravatar.cc/150?img=5",
      message_count: 56
    },
    most_liked: {
      name: "Mike Chen",
      avatar_url: "https://i.pravatar.cc/150?img=4",
      likes_count: 31
    },
    trending_topics: ["reunion", "summer plans", "new jobs"],
    highlight_message: {
      text: "Can't wait to see everyone at the reunion next month! It's been too long!",
      sender: "Mike Chen",
      likes: 15
    }
  },
  "2": {
    title: "Weekly Recap",
    period: "May 21 - May 27",
    date: "May 28, 2024",
    group_name: "Work Team",
    total_messages: 189,
    total_likes: 42,
    top_poster: {
      name: "Jessica Lee",
      avatar_url: "https://i.pravatar.cc/150?img=6",
      message_count: 34
    },
    most_liked: {
      name: "David Smith",
      avatar_url: "https://i.pravatar.cc/150?img=7",
      likes_count: 22
    },
    trending_topics: ["project deadline", "client meeting", "lunch plans"],
    highlight_message: {
      text: "Great job everyone on finishing the project ahead of schedule! The client was impressed.",
      sender: "David Smith",
      likes: 12
    }
  },
  "3": {
    title: "Weekly Recap",
    period: "May 21 - May 27",
    date: "May 28, 2024",
    group_name: "Family Chat",
    total_messages: 156,
    total_likes: 35,
    top_poster: {
      name: "Mom",
      avatar_url: "https://i.pravatar.cc/150?img=8",
      message_count: 42
    },
    most_liked: {
      name: "Sister",
      avatar_url: "https://i.pravatar.cc/150?img=9",
      likes_count: 18
    },
    trending_topics: ["dinner plans", "weekend visit", "birthday party"],
    highlight_message: {
      text: "Don't forget about Dad's surprise birthday party this Saturday!",
      sender: "Mom",
      likes: 9
    }
  },
  "4": {
    title: "Weekly Recap",
    period: "May 21 - May 27",
    date: "May 28, 2024",
    group_name: "Vacation Planning",
    total_messages: 98,
    total_likes: 24,
    top_poster: {
      name: "Alex Wang",
      avatar_url: "https://i.pravatar.cc/150?img=14",
      message_count: 23
    },
    most_liked: {
      name: "Lisa Chen",
      avatar_url: "https://i.pravatar.cc/150?img=15",
      likes_count: 12
    },
    trending_topics: ["hotel bookings", "flight options", "activities"],
    highlight_message: {
      text: "I found a great deal on a beach house rental that can fit all of us! Check out the link.",
      sender: "Lisa Chen",
      likes: 8
    }
  }
};

const mockUserStats: Record<string, UserStats[]> = {
  "1": [
    {
      user_id: "u1",
      name: "Sarah Johnson",
      avatar_url: "https://i.pravatar.cc/150?img=5",
      message_count: 56,
      likes_received: 23,
      likes_given: 15,
      activity_score: 94
    },
    {
      user_id: "u2",
      name: "Mike Chen",
      avatar_url: "https://i.pravatar.cc/150?img=4",
      message_count: 42,
      likes_received: 31,
      likes_given: 18,
      activity_score: 91
    },
    {
      user_id: "u3",
      name: "Emma Wilson",
      avatar_url: "https://i.pravatar.cc/150?img=16",
      message_count: 39,
      likes_received: 19,
      likes_given: 27,
      activity_score: 85
    },
    {
      user_id: "u4",
      name: "James Brown",
      avatar_url: "https://i.pravatar.cc/150?img=17",
      message_count: 31,
      likes_received: 15,
      likes_given: 12,
      activity_score: 78
    },
    {
      user_id: "u5",
      name: "Olivia Garcia",
      avatar_url: "https://i.pravatar.cc/150?img=18",
      message_count: 28,
      likes_received: 14,
      likes_given: 20,
      activity_score: 75
    }
  ]
};

// API functions
export const fetchGroups = async (token: string): Promise<Group[]> => {
  // In a real app, this would make an API call to your backend
  // which would then call the GroupMe API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockGroups);
    }, 800);
  });
};

export const fetchRecapSummary = async (groupId: string): Promise<RecapSummary> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const recap = mockRecaps[groupId];
      if (recap) {
        resolve(recap);
      } else {
        reject(new Error("Recap not found"));
      }
    }, 1000);
  });
};

export const fetchUserStats = async (groupId: string): Promise<UserStats[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const stats = mockUserStats[groupId];
      if (stats) {
        resolve(stats);
      } else {
        resolve([]); // Return empty array if no stats
      }
    }, 1000);
  });
};

export const updateGroupSelection = async (
  groupId: string,
  selected: boolean
): Promise<boolean> => {
  // In a real app, this would update the user preferences on your backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};
