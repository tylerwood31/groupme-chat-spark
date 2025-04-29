
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Star, Clock } from "lucide-react";

interface TopStatsProps {
  totalMessages: number;
  totalLikes: number;
  mostActiveDay?: string;
}

const TopStats: React.FC<TopStatsProps> = ({ 
  totalMessages, 
  totalLikes, 
  mostActiveDay = "Friday" 
}) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <TrendingUp className="h-5 w-5 mr-2 text-groupme-primary" />
        This Week by the Numbers
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-950 dark:to-blue-900 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 text-groupme-primary" />
              <h3 className="text-3xl font-bold">{totalMessages}</h3>
              <p className="text-sm text-muted-foreground">Total Messages</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-950 dark:to-purple-900 dark:border-purple-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <Star className="h-8 w-8 mx-auto mb-2 text-groupme-accent" />
              <h3 className="text-3xl font-bold">{totalLikes}</h3>
              <p className="text-sm text-muted-foreground">Total Likes</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-950 dark:to-green-900 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <h3 className="text-3xl font-bold">{mostActiveDay}</h3>
              <p className="text-sm text-muted-foreground">Most Active Day</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

// Add the missing TrendingUp import
import { TrendingUp } from "lucide-react";

export default TopStats;
