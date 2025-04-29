
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecapSummary, fetchUserStats } from "../services/api";
import { RecapSummary, UserStats } from "../types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Award, TrendingUp } from "lucide-react";

// Import refactored components
import RecapHeader from "@/components/recap-detail/RecapHeader";
import OverviewTab from "@/components/recap-detail/OverviewTab";
import LeaderboardTab from "@/components/recap-detail/LeaderboardTab";
import HighlightsTab from "@/components/recap-detail/HighlightsTab";
import RecapDetailSkeleton from "@/components/recap-detail/RecapDetailSkeleton";
import RecapDetailError from "@/components/recap-detail/RecapDetailError";

const RecapDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recap, setRecap] = useState<RecapSummary | null>(null);
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const loadRecapData = async () => {
      if (id) {
        try {
          const recapData = await fetchRecapSummary(id);
          setRecap(recapData);
          
          const stats = await fetchUserStats(id);
          setUserStats(stats);
          
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch recap data:", error);
          setIsLoading(false);
        }
      }
    };

    loadRecapData();
  }, [id]);

  if (isLoading) {
    return <RecapDetailSkeleton />;
  }
  
  if (!recap) {
    return <RecapDetailError />;
  }

  return (
    <div className="container max-w-4xl px-4 py-8 pb-20 md:pb-8 animate-fade-in">
      <RecapHeader 
        groupName={recap.group_name}
        period={recap.period}
        date={recap.date}
      />

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="leaderboard" onClick={() => setActiveTab("leaderboard")}>
            <Award className="h-4 w-4 mr-2" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="highlights" onClick={() => setActiveTab("highlights")}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Highlights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <OverviewTab recap={recap} />
        </TabsContent>
        
        <TabsContent value="leaderboard">
          <LeaderboardTab userStats={userStats} />
        </TabsContent>
        
        <TabsContent value="highlights">
          <HighlightsTab trendingTopics={recap.trending_topics} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecapDetail;
