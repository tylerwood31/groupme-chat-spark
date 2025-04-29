
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Heart } from "lucide-react";

interface WeeklyTotalsProps {
  messagesSent: number;
  likesReceived: number;
  statsPeriod: "daily" | "7day" | "30day";
}

const WeeklyTotals: React.FC<WeeklyTotalsProps> = ({ 
  messagesSent, 
  likesReceived, 
  statsPeriod 
}) => {
  const periodText = statsPeriod === "daily" ? "day" : statsPeriod === "7day" ? "week" : "month";
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="border-2 border-groupme-primary/20 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-groupme-primary" />
            Messages Sent
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-4xl font-bold">{messagesSent}</div>
          <p className="text-sm text-muted-foreground">This {periodText}</p>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-groupme-accent/20 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-groupme-accent" />
            Likes Received
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-4xl font-bold">{likesReceived}</div>
          <p className="text-sm text-muted-foreground">This {periodText}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyTotals;
