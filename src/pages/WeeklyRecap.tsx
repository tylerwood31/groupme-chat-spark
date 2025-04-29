
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchRecapSummary, fetchUserStats } from "../services/api";
import { RecapSummary, UserStats } from "../types";
import { toast } from "sonner";

// Import the refactored components
import RecapHeader from "@/components/recap/RecapHeader";
import TopStats from "@/components/recap/TopStats";
import MemberLeaderboard from "@/components/recap/MemberLeaderboard";
import QuoteOfTheWeek from "@/components/recap/QuoteOfTheWeek";
import ActivityChart from "@/components/ActivityChart";
import WeeklyAwards from "@/components/recap/WeeklyAwards";
import PersonalRecap from "@/components/recap/PersonalRecap";
import TextRecap from "@/components/recap/TextRecap";
import ShareButtons from "@/components/recap/ShareButtons";
import LoadingState from "@/components/recap/LoadingState";
import ErrorState from "@/components/recap/ErrorState";

const WeeklyRecap: React.FC = () => {
  const { id: groupId } = useParams<{ id: string }>();
  const [recap, setRecap] = useState<RecapSummary | null>(null);
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserStats | null>(null);

  useEffect(() => {
    const loadRecapData = async () => {
      if (!groupId) return;
      
      try {
        setIsLoading(true);
        const [recapData, statsData] = await Promise.all([
          fetchRecapSummary(groupId),
          fetchUserStats(groupId)
        ]);
        
        setRecap(recapData);
        setUserStats(statsData);
        
        // For demo purposes, pretend the current user is the top poster
        if (statsData.length > 0) {
          setCurrentUser(statsData[0]);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load recap data:", error);
        toast.error("Failed to load recap data");
        setIsLoading(false);
      }
    };
    
    loadRecapData();
  }, [groupId]);
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (!recap) {
    return <ErrorState />;
  }
  
  // Format activity data for chart
  const activityData = recap.daily_activity?.map(day => ({
    day: day.day.substring(0, 3), // Just show first 3 letters of day
    messages: day.messages
  })) || [
    { day: "Mon", messages: 45 },
    { day: "Tue", messages: 67 },
    { day: "Wed", messages: 32 },
    { day: "Thu", messages: 89 },
    { day: "Fri", messages: 120 },
    { day: "Sat", messages: 75 },
    { day: "Sun", messages: 53 }
  ];
  
  // Sample text recap for demonstration
  const textRecap = `Another week, another complete derailment of productivity.

It started off innocent enough — Maddie asking for class notes — but somehow by Tuesday night the chat turned into a full debate about who would survive the longest in a zombie apocalypse (consensus: definitely not Jake).

By Thursday, plans for Friday's tailgate spiraled into a 73-message thread about whether you can grill in a parking lot without getting fined.
(Erin volunteered to "handle permits" — still waiting on that update.)

Friday night blew up with blurry pics, bad karaoke videos, and at least three separate "WE OUTSIDE" texts nobody remembered sending.

Sunday was mostly recovery mode, memes about finals stress, and Chris asking if it's "too early to drop out."

All in all — peak chaos, zero actual solutions, 10/10 entertainment.`;
  
  return (
    <ScrollArea className="h-screen">
      <div className="container max-w-4xl px-4 py-8 pb-24 animate-fade-in">
        {/* Group Header */}
        <RecapHeader 
          groupName={recap.group_name}
          groupImageUrl={recap.group_image_url}
          memberCount={recap.member_count}
          period={recap.period}
        />
        
        {/* Top Stats */}
        <TopStats 
          totalMessages={recap.total_messages}
          totalLikes={recap.total_likes}
          mostActiveDay={activityData.reduce((prev, current) => 
            prev.messages > current.messages ? prev : current
          ).day}
        />
        
        {/* Member Leaderboard */}
        <MemberLeaderboard userStats={userStats} />
        
        {/* Quote of the Week */}
        <QuoteOfTheWeek 
          text={recap.highlight_message.text}
          sender={recap.highlight_message.sender}
          likes={recap.highlight_message.likes}
        />
        
        {/* Activity Graph */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            Weekly Activity
          </h2>
          
          <ActivityChart data={activityData} />
        </section>
        
        {/* Weekly Awards */}
        <WeeklyAwards 
          topPoster={recap.top_poster}
          mostLiked={recap.most_liked}
          trendingTopics={recap.trending_topics}
        />
        
        {/* Personal Stats */}
        <PersonalRecap currentUser={currentUser} totalUsers={userStats.length} />
        
        {/* Text Recap */}
        <TextRecap textRecap={textRecap} />
        
        {/* Share Buttons */}
        <ShareButtons />
      </div>
    </ScrollArea>
  );
};

// Add the missing TrendingUp import
import { TrendingUp } from "lucide-react";

export default WeeklyRecap;
