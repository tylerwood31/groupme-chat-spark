
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface HighlightsCardProps {
  trendingTopics: string[];
}

const HighlightsCard: React.FC<HighlightsCardProps> = ({ trendingTopics }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Topics</h3>
        <div className="space-y-4">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="p-4 bg-muted rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-4 w-4 text-groupme-primary mr-2" />
                <h4 className="font-medium">#{topic}</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                This topic was mentioned frequently in your conversations this week.
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HighlightsCard;
