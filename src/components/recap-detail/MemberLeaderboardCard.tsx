
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Trophy } from "lucide-react";
import { UserStats } from "@/types";

interface MemberLeaderboardCardProps {
  userStats: UserStats[];
}

const MemberLeaderboardCard: React.FC<MemberLeaderboardCardProps> = ({ userStats }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">Member Leaderboard</h3>
        
        <div className="space-y-6">
          {userStats.map((user, index) => (
            <div key={user.user_id} className="flex items-center">
              <div className="mr-4 w-6 text-center">
                {index === 0 ? (
                  <span className="text-yellow-500 text-xl">🏆</span>
                ) : index === 1 ? (
                  <span className="text-gray-400 text-lg">🥈</span>
                ) : index === 2 ? (
                  <span className="text-amber-700 text-lg">🥉</span>
                ) : (
                  <span className="text-muted-foreground font-medium">{index + 1}</span>
                )}
              </div>
              
              <Avatar className="h-10 w-10 rounded-full mr-3">
                <AvatarImage src={user.avatar_url} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm font-medium">{user.activity_score} points</p>
                </div>
                <div className="flex text-xs text-muted-foreground">
                  <span className="mr-3 flex items-center">
                    <MessageSquare className="h-3 w-3 mr-1" /> {user.message_count}
                  </span>
                  <span className="flex items-center">
                    <ThumbsUp className="h-3 w-3 mr-1" /> {user.likes_received}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {userStats.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No user stats available for this group.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberLeaderboardCard;
