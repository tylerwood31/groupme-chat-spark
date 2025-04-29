
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface TrendingTopicsCardProps {
  topics: string[];
}

const TrendingTopicsCard: React.FC<TrendingTopicsCardProps> = ({ topics }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Trending Topics</h3>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, index) => (
            <span 
              key={index}
              className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium"
            >
              #{topic}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendingTopicsCard;
