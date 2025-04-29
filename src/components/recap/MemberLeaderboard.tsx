
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Trophy, Star } from "lucide-react";
import { UserStats } from "@/types";

interface MemberLeaderboardProps {
  userStats: UserStats[];
}

const MemberLeaderboard: React.FC<MemberLeaderboardProps> = ({ userStats }) => {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Trophy className="h-5 w-5 mr-2 text-amber-500" />
        This Week's MVPs
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Posters */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
              Top Posters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userStats.slice(0, 5).map((user, index) => (
                <div key={user.user_id} className="flex items-center">
                  <div className="w-8 flex justify-center mr-2">
                    {index === 0 ? (
                      <Trophy className="h-5 w-5 text-amber-500" />
                    ) : index === 1 ? (
                      <Badge className="bg-gray-300 text-gray-700">2</Badge>
                    ) : index === 2 ? (
                      <Badge className="bg-amber-700 text-amber-100">3</Badge>
                    ) : (
                      <span className="text-sm text-gray-500 font-medium">{index + 1}</span>
                    )}
                  </div>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user.avatar_url} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{user.name}</div>
                  </div>
                  <div className="font-mono text-sm font-bold">
                    {user.message_count}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Most Liked */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Star className="h-4 w-4 mr-2 text-amber-500" />
              Most Liked Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userStats
                .slice(0, 5)
                .sort((a, b) => b.likes_received - a.likes_received)
                .map((user, index) => (
                <div key={user.user_id + "-likes"} className="flex items-center">
                  <div className="w-8 flex justify-center mr-2">
                    {index === 0 ? (
                      <Trophy className="h-5 w-5 text-amber-500" />
                    ) : index === 1 ? (
                      <Badge className="bg-gray-300 text-gray-700">2</Badge>
                    ) : index === 2 ? (
                      <Badge className="bg-amber-700 text-amber-100">3</Badge>
                    ) : (
                      <span className="text-sm text-gray-500 font-medium">{index + 1}</span>
                    )}
                  </div>
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user.avatar_url} alt={user.name} />
                    <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{user.name}</div>
                  </div>
                  <div className="font-mono text-sm font-bold">
                    {user.likes_received}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MemberLeaderboard;
