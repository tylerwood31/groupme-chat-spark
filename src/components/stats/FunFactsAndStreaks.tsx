
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface FunFactsAndStreaksProps {
  mostActiveDay: string;
  mostActiveTime: string;
  streakDays: number;
  streakType?: string;
  statsPeriod: "daily" | "7day" | "30day";
}

const FunFactsAndStreaks: React.FC<FunFactsAndStreaksProps> = ({
  mostActiveDay,
  mostActiveTime,
  streakDays,
  streakType,
  statsPeriod
}) => {
  const periodText = statsPeriod === "daily" ? "Day" : statsPeriod === "7day" ? "Week" : "Month";
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Alert className={cn(
        "border-2 border-groupme-primary/20",
        "bg-gradient-to-br from-background to-groupme-primary/5"
      )}>
        <Clock className="h-5 w-5" />
        <AlertTitle className="text-lg font-medium mb-2">Fun Fact of the {periodText}</AlertTitle>
        <AlertDescription>
          <p className="mb-1">You posted most during <span className="font-semibold">{mostActiveTime}</span></p>
          <p><span className="font-semibold">{mostActiveDay}</span> was your loudest day.</p>
        </AlertDescription>
      </Alert>
      
      {streakDays > 0 && (
        <Alert className={cn(
          "border-2 border-groupme-accent/20",
          "bg-gradient-to-br from-background to-groupme-accent/5"
        )}>
          <TrendingUp className="h-5 w-5" />
          <AlertTitle className="text-lg font-medium mb-2">Current Streak</AlertTitle>
          <AlertDescription className="flex items-center gap-2">
            <span className="text-2xl font-bold">{streakDays}-day</span> 
            <span>{streakType} streak! 🔥</span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FunFactsAndStreaks;
