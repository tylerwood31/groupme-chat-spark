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
    group_image_url: "https://i.pravatar.cc/150?img=10",
    total_messages: 342,
    total_likes: 78,
    member_count: 12,
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
    },
    daily_activity: [
      { day: "Monday", messages: 45, likes: 12 },
      { day: "Tuesday", messages: 67, likes: 15 },
      { day: "Wednesday", messages: 32, likes: 8 },
      { day: "Thursday", messages: 89, likes: 23 },
      { day: "Friday", messages: 120, likes: 34 },
      { day: "Saturday", messages: 75, likes: 18 },
      { day: "Sunday", messages: 53, likes: 14 }
    ]
  },
  "2": {
    title: "Weekly Recap",
    period: "May 21 - May 27",
    date: "May 28, 2024",
    group_name: "Work Team",
    group_image_url: "https://i.pravatar.cc/150?img=11",
    total_messages: 189,
    total_likes: 42,
    member_count: 8,
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
    },
    daily_activity: [
      { day: "Monday", messages: 32, likes: 7 },
      { day: "Tuesday", messages: 45, likes: 10 },
      { day: "Wednesday", messages: 38, likes: 9 },
      { day: "Thursday", messages: 52, likes: 12 },
      { day: "Friday", messages: 22, likes: 4 },
      { day: "Saturday", messages: 0, likes: 0 },
      { day: "Sunday", messages: 0, likes: 0 }
    ]
  },
  "3": {
    title: "Weekly Recap",
    period: "May 21 - May 27",
    date: "May 28, 2024",
    group_name: "Family Chat",
    group_image_url: "https://i.pravatar.cc/150?img=12",
    total_messages: 156,
    total_likes: 35,
    member_count: 6,
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
    },
    daily_activity: [
      { day: "Monday", messages: 22, likes: 5 },
      { day: "Tuesday", messages: 24, likes: 6 },
      { day: "Wednesday", messages: 18, likes: 4 },
      { day: "Thursday", messages: 30, likes: 7 },
      { day: "Friday", messages: 35, likes: 8 },
      { day: "Saturday", messages: 15, likes: 3 },
      { day: "Sunday", messages: 12, likes: 2 }
    ]
  },
  "4": {
    title: "Weekly Recap",
    period: "May 21 - May 27",
    date: "May 28, 2024",
    group_name: "Vacation Planning",
    group_image_url: "https://i.pravatar.cc/150?img=13",
    total_messages: 98,
    total_likes: 24,
    member_count: 5,
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
    },
    daily_activity: [
      { day: "Monday", messages: 18, likes: 4 },
      { day: "Tuesday", messages: 22, likes: 5 },
      { day: "Wednesday", messages: 15, likes: 3 },
      { day: "Thursday", messages: 25, likes: 6 },
      { day: "Friday", messages: 10, likes: 2 },
      { day: "Saturday", messages: 5, likes: 1 },
      { day: "Sunday", messages: 3, likes: 0 }
    ]
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
      activity_score: 94,
      rank: 1
    },
    {
      user_id: "u2",
      name: "Mike Chen",
      avatar_url: "https://i.pravatar.cc/150?img=4",
      message_count: 42,
      likes_received: 31,
      likes_given: 18,
      activity_score: 91,
      rank: 2
    },
    {
      user_id: "u3",
      name: "Emma Wilson",
      avatar_url: "https://i.pravatar.cc/150?img=16",
      message_count: 39,
      likes_received: 19,
      likes_given: 27,
      activity_score: 85,
      rank: 3
    },
    {
      user_id: "u4",
      name: "James Brown",
      avatar_url: "https://i.pravatar.cc/150?img=17",
      message_count: 31,
      likes_received: 15,
      likes_given: 12,
      activity_score: 78,
      rank: 4
    },
    {
      user_id: "u5",
      name: "Olivia Garcia",
      avatar_url: "https://i.pravatar.cc/150?img=18",
      message_count: 28,
      likes_received: 14,
      likes_given: 20,
      activity_score: 75,
      rank: 5
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
