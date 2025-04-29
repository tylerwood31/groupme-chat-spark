
import React from "react";
import StatCard from "./StatCard";
import TopContributorsCard from "./TopContributorsCard";
import TrendingTopicsCard from "./TrendingTopicsCard";
import HighlightMessageCard from "./HighlightMessageCard";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { RecapSummary } from "@/types";

interface OverviewTabProps {
  recap: RecapSummary;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ recap }) => {
  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard 
          title="Total Messages"
          value={recap.total_messages}
          icon={MessageSquare}
          iconBgClass="bg-blue-100"
          iconColorClass="text-groupme-primary"
        />
        
        <StatCard 
          title="Total Likes"
          value={recap.total_likes}
          icon={ThumbsUp}
          iconBgClass="bg-purple-100"
          iconColorClass="text-groupme-accent"
        />
        
        <StatCard 
          title="Activity Score"
          value={Math.floor((recap.total_messages * 0.7 + recap.total_likes * 0.3) / 10)}
          icon={() => (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          )}
          iconBgClass="bg-green-100"
          iconColorClass="text-green-600"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <TopContributorsCard 
          recap={recap} 
          totalMessages={recap.total_messages} 
          totalLikes={recap.total_likes}
        />
        
        <TrendingTopicsCard topics={recap.trending_topics} />
      </div>
      
      <HighlightMessageCard 
        text={recap.highlight_message.text}
        sender={recap.highlight_message.sender}
        likes={recap.highlight_message.likes}
      />
    </div>
  );
};

export default OverviewTab;
