
import React from "react";
import HighlightsCard from "./HighlightsCard";

interface HighlightsTabProps {
  trendingTopics: string[];
}

const HighlightsTab: React.FC<HighlightsTabProps> = ({ trendingTopics }) => {
  return (
    <div className="animate-fade-in">
      <HighlightsCard trendingTopics={trendingTopics} />
    </div>
  );
};

export default HighlightsTab;
