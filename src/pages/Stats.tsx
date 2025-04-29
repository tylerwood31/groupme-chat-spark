
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { WeeklyStats } from "@/types";
import { StatsPeriod } from "@/components/StatsPeriodSelector";

// Import our new components
import StatsHeader from "@/components/stats/StatsHeader";
import WeeklyRank from "@/components/stats/WeeklyRank";
import WeeklyTotals from "@/components/stats/WeeklyTotals";
import LikeRatio from "@/components/stats/LikeRatio";
import ActivityChart from "@/components/ActivityChart";
import PersonalBests from "@/components/stats/PersonalBests";
import FunFactsAndStreaks from "@/components/stats/FunFactsAndStreaks";

const Stats: React.FC = () => {
  const [statsPeriod, setStatsPeriod] = useState<StatsPeriod>("7day");
  
  // Mock data for demonstration - in a real app this would come from an API
  const [stats] = useState<WeeklyStats>({
    rank: 2,
    total_members: 12,
    messages_sent: 87,
    likes_received: 152,
    like_ratio: 1.75,
    most_active_day: "Tuesday",
    most_active_time: "12pm - 1pm",
    streak_days: 5,
    streak_type: "posting",
    personal_bests: {
      most_messages_day: {
        count: 42,
        date: "March 15, 2023"
      },
      most_likes_week: {
        count: 210,
        date: "April 3-9, 2023"
      },
      most_liked_message: {
        text: "Can't wait to see everyone at the reunion next month! It's been too long!",
        likes: 35,
        date: "February 10, 2023"
      }
    },
    daily_activity: [
      { day: "Mon", messages: 12, likes: 22 },
      { day: "Tue", messages: 19, likes: 34 },
      { day: "Wed", messages: 15, likes: 27 },
      { day: "Thu", messages: 14, likes: 19 },
      { day: "Fri", messages: 23, likes: 38 },
      { day: "Sat", messages: 8, likes: 12 },
      { day: "Sun", messages: 5, likes: 8 }
    ]
  });

  // Get period text for display
  const getPeriodText = () => {
    switch(statsPeriod) {
      case "daily": return "Today, Apr 29, 2024";
      case "7day": return "Weekly performance for Apr 22-28, 2024";
      case "30day": return "Monthly performance for Apr 1-30, 2024";
    }
  };

  return (
    <div className="container max-w-4xl px-4 py-8 animate-fade-in">
      {/* Stats Header */}
      <StatsHeader 
        statsPeriod={statsPeriod} 
        onPeriodChange={setStatsPeriod} 
        periodText={getPeriodText()} 
      />
      
      {/* Weekly Rank Section */}
      <div className="mb-8">
        <WeeklyRank 
          rank={stats.rank} 
          totalMembers={stats.total_members} 
          statsPeriod={statsPeriod} 
        />
      </div>
      
      {/* Weekly Totals Section */}
      <div className="mb-8">
        <WeeklyTotals 
          messagesSent={stats.messages_sent} 
          likesReceived={stats.likes_received} 
          statsPeriod={statsPeriod} 
        />
      </div>
      
      {/* Like Ratio Section */}
      <div className="mb-8">
        <LikeRatio likeRatio={stats.like_ratio} />
      </div>
      
      {/* Activity Chart Section */}
      <div className="mb-8">
        <ActivityChart data={stats.daily_activity} />
      </div>
      
      {/* Personal Bests Section */}
      <div className="mb-8">
        <PersonalBests personalBests={stats.personal_bests} />
      </div>
      
      {/* Fun Facts + Streaks Section */}
      <div className="mb-8">
        <FunFactsAndStreaks
          mostActiveDay={stats.most_active_day}
          mostActiveTime={stats.most_active_time}
          streakDays={stats.streak_days}
          streakType={stats.streak_type}
          statsPeriod={statsPeriod}
        />
      </div>
      
      <div className="text-center mt-12 mb-6">
        <Badge className="text-base bg-groupme-primary py-2 px-4 hover:bg-groupme-primary/90">
          MVP vibes unlocked. You crushed it!
        </Badge>
      </div>
    </div>
  );
};

export default Stats;
