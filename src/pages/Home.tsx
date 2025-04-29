
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, MessageSquare, Heart, Trophy, Users } from "lucide-react";
import { Group } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchGroups } from "../services/api";

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: groups, isLoading: groupsLoading } = useQuery({
    queryKey: ['groups', user?.token],
    queryFn: () => fetchGroups(user?.token || ''),
    enabled: !!user?.token
  });

  // Calculate overall stats across all groups
  const totalMessages = 687; // Mock data - would be calculated from API
  const totalLikes = 124;
  const likeRatio = 0.18;
  const streakDays = 5;

  return (
    <div className="container max-w-5xl px-4 py-8 md:py-12 animate-fade-in">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(" ")[0]}</h1>
          <p className="text-muted-foreground">Here's your GroupMe activity recap</p>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center">
            {user?.avatar_url && (
              <img 
                src={user.avatar_url} 
                alt={user.name} 
                className="w-10 h-10 rounded-full mr-2 border-2 border-white shadow" 
              />
            )}
          </div>
        </div>
      </header>
      
      {/* Personal Weekly Highlights */}
      <section className="mb-8 bg-gradient-to-r from-groupme-primary/5 to-groupme-accent/5 p-6 rounded-lg border border-border">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          Your Weekly Highlights
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Messages Sent</p>
            <p className="text-2xl font-bold">{totalMessages}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Likes Received</p>
            <p className="text-2xl font-bold">{totalLikes}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-muted-foreground">Like Ratio</p>
            <p className="text-2xl font-bold">{likeRatio.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{streakDays} days</p>
              </div>
              <div className="text-orange-500 text-xl">🔥</div>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <Badge className="bg-groupme-accent text-white">You're climbing the leaderboard!</Badge>
        </div>
      </section>

      {/* Group Overview Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-groupme-primary" />
          Your Groups
        </h2>
        
        {groupsLoading ? (
          <div className="flex justify-center py-8">
            <div className="h-10 w-10 border-4 border-groupme-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups?.map((group: Group) => (
              <Card key={group.id} className="overflow-hidden hover:border-groupme-primary/30 transition-colors">
                <div className="h-2 bg-gradient-to-r from-groupme-primary to-groupme-accent" />
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img src={group.image_url} alt={group.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{group.name}</h3>
                      <p className="text-xs text-muted-foreground">{group.member_count} members</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-groupme-primary" />
                      <span>{group.id === "1" ? "342" : group.id === "2" ? "189" : "156"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4 text-groupme-accent" />
                      <span>{group.id === "1" ? "78" : group.id === "2" ? "42" : "35"}</span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="text-xs font-normal py-0 border-dashed">
                        {group.id === "1" ? "You're #2" : group.id === "2" ? "You're #3" : "You're #4"}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Leaderboard Preview */}
                  <div className="bg-muted p-3 rounded-md mb-4">
                    <p className="text-xs font-medium mb-2">Top Members</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-300">
                            <img src={`https://i.pravatar.cc/150?img=${Number(group.id) + 4}`} alt="Top user" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs">{group.id === "1" ? "Sarah" : group.id === "2" ? "Jessica" : "Mom"}</span>
                        </div>
                        <span className="text-xs font-medium">{group.id === "1" ? "56" : group.id === "2" ? "34" : "42"} msg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-300">
                            <img src={`https://i.pravatar.cc/150?img=${Number(group.id) + 3}`} alt="Second user" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs">{group.id === "1" ? "Mike" : group.id === "2" ? "David" : "Sister"}</span>
                        </div>
                        <span className="text-xs font-medium">{group.id === "1" ? "42" : group.id === "2" ? "27" : "38"} msg</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                          <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-300">
                            <img src="https://i.pravatar.cc/150?img=1" alt="You" className="w-full h-full object-cover" />
                          </div>
                          <span className="text-xs font-medium">You</span>
                        </div>
                        <span className="text-xs font-medium">{group.id === "1" ? "39" : group.id === "2" ? "25" : "34"} msg</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    {group.id === "1" && (
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 text-xs">
                        🏆 Top 3 for 2 weeks!
                      </Badge>
                    )}
                    {group.id === "2" && (
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">
                        📈 Up 2 spots this week
                      </Badge>
                    )}
                    {group.id === "3" && (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">
                        🔥 3-day streak
                      </Badge>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-groupme-primary" 
                      onClick={() => navigate(`/recap/${group.id}`)}
                    >
                      <span className="mr-1">View Recap</span>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
      
      {/* Quick Actions */}
      <section className="mb-8">
        <div className="flex justify-center">
          <Button 
            size="lg"
            className="bg-groupme-primary hover:bg-groupme-primary/90" 
            onClick={() => navigate('/stats')}
          >
            <BarChart3 className="h-5 w-5 mr-2" />
            View Full Stats
          </Button>
        </div>
      </section>
      
      {/* Achievement Section */}
      <section>
        <Card className="border-2 border-dashed border-groupme-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-gradient-to-br from-groupme-primary to-groupme-accent flex items-center justify-center text-white text-2xl">
                🏅
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">New Achievement Unlocked!</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  "Quote of the Week" in College Friends
                </p>
                <Badge variant="outline" className="bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 border-amber-300">
                  Keep the momentum going!
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;
