import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchRecapSummary, fetchUserStats } from "../services/api";
import { RecapSummary, UserStats } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Calendar,
  MessageSquare, 
  Trophy, 
  Award, 
  Share, 
  Star,
  TrendingUp,
  Users,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import ActivityChart from "@/components/ActivityChart";

const WeeklyRecap: React.FC = () => {
  const { id: groupId } = useParams<{ id: string }>();
  const [recap, setRecap] = useState<RecapSummary | null>(null);
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserStats | null>(null);

  useEffect(() => {
    const loadRecapData = async () => {
      if (!groupId) return;
      
      try {
        setIsLoading(true);
        const [recapData, statsData] = await Promise.all([
          fetchRecapSummary(groupId),
          fetchUserStats(groupId)
        ]);
        
        setRecap(recapData);
        setUserStats(statsData);
        
        // For demo purposes, pretend the current user is the top poster
        if (statsData.length > 0) {
          setCurrentUser(statsData[0]);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load recap data:", error);
        toast.error("Failed to load recap data");
        setIsLoading(false);
      }
    };
    
    loadRecapData();
  }, [groupId]);
  
  const handleShareRecap = () => {
    toast.success("Recap shared to GroupMe!");
  };
  
  const handleSaveRecap = () => {
    toast.success("Recap saved to your profile!");
  };
  
  if (isLoading) {
    return (
      <div className="container max-w-4xl px-4 py-12 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-t-transparent border-groupme-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading this week's chaos...</p>
        </div>
      </div>
    );
  }
  
  if (!recap) {
    return (
      <div className="container max-w-4xl px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Recap not found</h1>
        <p className="text-muted-foreground">We couldn't find a recap for this group.</p>
        <Button className="mt-4" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    );
  }
  
  // Format activity data for chart
  const activityData = recap.daily_activity?.map(day => ({
    day: day.day.substring(0, 3), // Just show first 3 letters of day
    messages: day.messages
  })) || [
    { day: "Mon", messages: 45 },
    { day: "Tue", messages: 67 },
    { day: "Wed", messages: 32 },
    { day: "Thu", messages: 89 },
    { day: "Fri", messages: 120 },
    { day: "Sat", messages: 75 },
    { day: "Sun", messages: 53 }
  ];
  
  // Sample text recap for demonstration
  const textRecap = recap.text_recap || `
    ## ${recap.group_name} Weekly Recap: ${recap.period}
    
    What a week it's been in **${recap.group_name}**! We saw a total of **${recap.total_messages} messages** and **${recap.total_likes} likes** exchanged. Friday was our most active day, with conversations peaking around evening hours.
    
    **${recap.top_poster.name}** dominated the chat this week with an impressive **${recap.top_poster.message_count} messages**, while **${recap.most_liked.name}** was clearly the crowd favorite, collecting **${recap.most_liked.likes_count} likes**.
    
    The group couldn't stop talking about ${recap.trending_topics.join(', ')}. Plenty of hot takes, but none quite as memorable as ${recap.highlight_message.sender}'s gem: "${recap.highlight_message.text}" which collected ${recap.highlight_message.likes} likes!
    
    Some members were noticeably quiet this week – no messages from the usual suspects. Are they on vacation or just lurking? 👀
    
    Looking forward to next week's chaos! Remember, what happens in GroupMe gets immortalized in these recaps.
  `;
  
  return (
    <ScrollArea className="h-screen">
      <div className="container max-w-4xl px-4 py-8 pb-24 animate-fade-in">
        {/* Group Header Section */}
        <header className="mb-8 bg-gradient-to-r from-groupme-primary to-groupme-accent p-6 rounded-lg text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAg
          IDxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAxMmM2LjA3NSAwIDExLTQuOTI1IDExLTExcy
          00LjkyNS0xMS0xMS0xMS0xMSA0LjkyNS0xMSAxMSA0LjkyNSAxMSAxMSAxMXptLTE4LTdha4CAgIAOIDAyIDA9IjAgMSAwLTE4IDAgOSA5IDAgMCAxIDE4IDB6IiBmaWxsLW9wYWNpdHk9Ii4yIiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')]"></div>
          
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-xl bg-white/20 overflow-hidden mr-6">
              {recap.group_image_url ? (
                <img src={recap.group_image_url} alt={recap.group_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
                  {recap.group_name.substring(0, 2)}
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{recap.group_name}</h1>
              <div className="flex items-center gap-2 text-white/90 text-sm">
                <Users className="h-4 w-4" />
                <span>{recap.member_count || "12"} members</span>
              </div>
              
              <div className="flex mt-2">
                <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                  <Calendar className="h-3 w-3 mr-1" />
                  <span>{recap.period}</span>
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/20">
            <h2 className="text-lg font-medium mb-2">This Week's Recap</h2>
            <p className="text-sm text-white/90">
              Another week of chaos, laughs, and unexpected twists!
            </p>
          </div>
        </header>
        
        {/* Top Stats Section */}
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
                  <h3 className="text-3xl font-bold">{recap.total_messages}</h3>
                  <p className="text-sm text-muted-foreground">Total Messages</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 dark:from-purple-950 dark:to-purple-900 dark:border-purple-800">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Star className="h-8 w-8 mx-auto mb-2 text-groupme-accent" />
                  <h3 className="text-3xl font-bold">{recap.total_likes}</h3>
                  <p className="text-sm text-muted-foreground">Total Likes</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-950 dark:to-green-900 dark:border-green-800">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <h3 className="text-3xl font-bold">Friday</h3>
                  <p className="text-sm text-muted-foreground">Most Active Day</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Leaderboard Section */}
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
        
        {/* Quote of the Week */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-groupme-primary" />
            Quote of the Week
          </h2>
          
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 dark:from-blue-950 dark:to-purple-900 dark:border-blue-800 overflow-hidden">
            <CardContent className="pt-6 pb-4 relative">
              <div className="text-6xl text-blue-200 absolute top-0 left-4 dark:text-blue-800 font-serif">
                "
              </div>
              <div className="relative z-10 pl-4">
                <p className="text-lg italic mb-4">{recap.highlight_message.text}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">— {recap.highlight_message.sender}</span>
                  </div>
                  <Badge className="flex items-center gap-1 bg-groupme-primary">
                    <Star className="h-3 w-3" />
                    <span>{recap.highlight_message.likes}</span>
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Activity Graph */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
            Weekly Activity
          </h2>
          
          <ActivityChart data={activityData} />
        </section>
        
        {/* Weekly Highlights */}
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
                    <AvatarImage src={recap.top_poster.avatar_url} alt={recap.top_poster.name} />
                    <AvatarFallback>{recap.top_poster.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-bold">{recap.top_poster.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Sent <span className="font-medium">{recap.top_poster.message_count}</span> messages
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
                    <AvatarImage src={recap.most_liked.avatar_url} alt={recap.most_liked.name} />
                    <AvatarFallback>{recap.most_liked.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-bold">{recap.most_liked.name}</div>
                    <div className="text-xs text-muted-foreground">
                      Received <span className="font-medium">{recap.most_liked.likes_count}</span> likes
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
                  "{recap.trending_topics[0] ? `Something about ${recap.trending_topics[0]}` : "A controversial opinion the group can't stop talking about"}"
                </p>
                <div className="text-xs text-muted-foreground">
                  Trending topics: {recap.trending_topics.join(', ')}
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
        
        {/* Personal Stats */}
        {currentUser && (
          <section className="mb-10">
            <Card className="bg-gradient-to-r from-groupme-primary/5 to-groupme-accent/5 border-groupme-primary/20">
              <CardContent className="py-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-groupme-primary to-groupme-accent rounded-full flex items-center justify-center text-white mr-4">
                    <Trophy className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Your Weekly Recap</h3>
                    <p className="text-sm text-muted-foreground">
                      You ranked <span className="font-bold text-groupme-primary">#{currentUser.rank || 2}</span> out of {userStats.length} members this week!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
        
        {/* Text Recap Section */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <MessageSquare className="h-5 w-5 mr-2 text-groupme-primary" />
            Newsletter Recap
          </h2>
          
          <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <CardContent className="pt-6">
              <div className="prose dark:prose-invert max-w-full">
                {textRecap.split('\n\n').map((paragraph, index) => (
                  <p key={index} className={index === 0 ? "text-xl font-bold mb-4" : "mb-3"}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Share Buttons */}
        <section className="mb-10 flex flex-col md:flex-row gap-4">
          <Button 
            className="flex-1 bg-groupme-primary hover:bg-groupme-primary/90"
            onClick={handleShareRecap}
          >
            <Share className="h-4 w-4 mr-2" />
            Share Recap to GroupMe
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1 border-groupme-primary/30 text-groupme-primary hover:bg-groupme-primary/5"
            onClick={handleSaveRecap}
          >
            Save My Weekly Recap
          </Button>
        </section>
      </div>
    </ScrollArea>
  );
};

export default WeeklyRecap;
