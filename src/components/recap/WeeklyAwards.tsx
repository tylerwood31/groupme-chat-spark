
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, TrendingUp } from "lucide-react";

interface TopPoster {
  name: string;
  avatar_url: string;
  message_count: number;
}

interface MostLiked {
  name: string;
  avatar_url: string;
  likes_count: number;
}

interface WeeklyAwardsProps {
  topPoster: TopPoster;
  mostLiked: MostLiked;
  trendingTopics: string[];
}

const WeeklyAwards: React.FC<WeeklyAwardsProps> = ({ 
  topPoster, 
  mostLiked, 
  trendingTopics 
}) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Award className="h-5 w-5 mr-2 text-amber-500" />
        Weekly Awards
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-r from-pink-50 to-amber-50 dark:from-pink-950 dark:to-amber-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">The Keyboard Warrior</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={topPoster.avatar_url} alt={topPoster.name} />
                <AvatarFallback>{topPoster.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-bold">{topPoster.name}</div>
                <div className="text-xs text-muted-foreground">
                  Sent <span className="font-medium">{topPoster.message_count}</span> messages
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">The People's Champ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={mostLiked.avatar_url} alt={mostLiked.name} />
                <AvatarFallback>{mostLiked.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-bold">{mostLiked.name}</div>
                <div className="text-xs text-muted-foreground">
                  Received <span className="font-medium">{mostLiked.likes_count}</span> likes
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Hot Take Award</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm italic mb-2">
              "{trendingTopics[0] ? `Something about ${trendingTopics[0]}` : "A controversial opinion the group can't stop talking about"}"
            </p>
            <div className="text-xs text-muted-foreground">
              Trending topics: {trendingTopics.join(', ')}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Ghost Award</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarFallback>👻</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-bold">Someone's Missing</div>
                <div className="text-xs text-muted-foreground">
                  Sent <span className="font-medium">0</span> messages this week
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WeeklyAwards;
