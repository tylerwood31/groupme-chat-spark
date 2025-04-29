
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface LikeRatioProps {
  likeRatio: number;
}

const LikeRatio: React.FC<LikeRatioProps> = ({ likeRatio }) => {
  // Calculate like ratio percentage for the gauge
  const likeRatioPercentage = Math.min(likeRatio * 10, 100);

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-groupme-primary" />
          Your Like Ratio
        </CardTitle>
        <CardDescription>Average likes per message</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="text-3xl font-bold mb-3">{likeRatio.toFixed(2)}</div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-groupme-primary to-groupme-accent animate-pulse-light"
              style={{ width: `${likeRatioPercentage}%` }}
            ></div>
          </div>
          <div className="w-full flex justify-between mt-2 text-sm text-muted-foreground">
            <span>0</span>
            <span>5.0</span>
            <span>10.0</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LikeRatio;
