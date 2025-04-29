
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp } from "lucide-react";

interface WeeklyRankProps {
  rank: number;
  totalMembers: number;
  statsPeriod: "daily" | "7day" | "30day";
}

const WeeklyRank: React.FC<WeeklyRankProps> = ({ 
  rank, 
  totalMembers, 
  statsPeriod 
}) => {
  const periodText = statsPeriod === "daily" ? "day" : statsPeriod === "7day" ? "week" : "month";
  
  return (
    <Card className="overflow-hidden border-2 border-groupme-primary/20 bg-gradient-to-br from-background to-groupme-primary/5">
      <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-groupme-primary rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-bold">
              #{rank}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-groupme-accent text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
              <ArrowUp className="h-4 w-4" />
            </div>
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold">You're #{rank} in Messages Sent</h2>
            <p className="text-muted-foreground">Out of {totalMembers} members this {periodText}</p>
          </div>
        </div>
        <Badge className="text-base bg-groupme-accent hover:bg-groupme-accent/90 py-2 px-4">
          Just 8 more messages to steal the #1 spot!
        </Badge>
      </CardContent>
    </Card>
  );
};

export default WeeklyRank;
