
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRecapSummary, fetchUserStats } from "../services/api";
import { RecapSummary, UserStats } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, MessageSquare, ThumbsUp, Award, BarChart3, TrendingUp } from "lucide-react";

const RecapDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recap, setRecap] = useState<RecapSummary | null>(null);
  const [userStats, setUserStats] = useState<UserStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const loadRecapData = async () => {
      if (id) {
        try {
          const recapData = await fetchRecapSummary(id);
          setRecap(recapData);
          
          const stats = await fetchUserStats(id);
          setUserStats(stats);
          
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch recap data:", error);
          setIsLoading(false);
        }
      }
    };

    loadRecapData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container max-w-4xl px-4 py-8">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        
        <Skeleton className="h-8 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Array(3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
        
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }
  
  if (!recap) {
    return (
      <div className="container max-w-4xl px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Recap not found</h1>
        <p className="text-muted-foreground mb-6">The requested recap could not be loaded.</p>
        <Button onClick={() => navigate("/")}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl px-4 py-8 pb-20 md:pb-8 animate-fade-in">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-6"
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Button>
      
      <header className="mb-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold gradient-text">{recap.group_name}</h1>
          <span className="ml-4 px-3 py-1 bg-groupme-primary/10 text-groupme-primary text-xs rounded-full font-medium">
            {recap.period}
          </span>
        </div>
        <p className="text-muted-foreground mt-2">
          Generated on {recap.date}
        </p>
      </header>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="overview" onClick={() => setActiveTab("overview")}>
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="leaderboard" onClick={() => setActiveTab("leaderboard")}>
            <Award className="h-4 w-4 mr-2" />
            Leaderboard
          </TabsTrigger>
          <TabsTrigger value="highlights" onClick={() => setActiveTab("highlights")}>
            <TrendingUp className="h-4 w-4 mr-2" />
            Highlights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Messages</p>
                    <h3 className="text-3xl font-bold">{recap.total_messages}</h3>
                  </div>
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-groupme-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Likes</p>
                    <h3 className="text-3xl font-bold">{recap.total_likes}</h3>
                  </div>
                  <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <ThumbsUp className="h-5 w-5 text-groupme-accent" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">Activity Score</p>
                    <h3 className="text-3xl font-bold">
                      {Math.floor((recap.total_messages * 0.7 + recap.total_likes * 0.3) / 10)}
                    </h3>
                  </div>
                  <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Top Contributors</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <img 
                      src={recap.top_poster.avatar_url} 
                      alt={recap.top_poster.name} 
                      className="w-10 h-10 rounded-full mr-3" 
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <p className="font-medium">{recap.top_poster.name}</p>
                        <p className="text-sm font-medium">{recap.top_poster.message_count} messages</p>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 bg-groupme-primary rounded-full" 
                          style={{ width: `${Math.min(100, (recap.top_poster.message_count / recap.total_messages) * 100 * 2.5)}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <img 
                      src={recap.most_liked.avatar_url} 
                      alt={recap.most_liked.name} 
                      className="w-10 h-10 rounded-full mr-3" 
                    />
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <p className="font-medium">{recap.most_liked.name}</p>
                        <p className="text-sm font-medium">{recap.most_liked.likes_count} likes</p>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div 
                          className="h-2 bg-groupme-accent rounded-full" 
                          style={{ width: `${Math.min(100, (recap.most_liked.likes_count / recap.total_likes) * 100 * 2.5)}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Trending Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {recap.trending_topics.map((topic, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-muted rounded-full text-sm font-medium"
                    >
                      #{topic}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Highlight Message</h3>
              <div className="bg-muted rounded-lg p-4">
                <p className="text-lg mb-2 italic">"{recap.highlight_message.text}"</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">— {recap.highlight_message.sender}</p>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 text-groupme-accent mr-1" />
                    <span className="text-sm">{recap.highlight_message.likes}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leaderboard" className="animate-fade-in">
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
                    
                    <img 
                      src={user.avatar_url} 
                      alt={user.name} 
                      className="w-10 h-10 rounded-full mr-3" 
                    />
                    
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
        </TabsContent>
        
        <TabsContent value="highlights" className="animate-fade-in">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Weekly Topics</h3>
              <div className="space-y-4">
                {recap.trending_topics.map((topic, index) => (
                  <div key={index} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center mb-2">
                      <TrendingUp className="h-4 w-4 text-groupme-primary mr-2" />
                      <h4 className="font-medium">#{topic}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      This topic was mentioned frequently in your conversations this week.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RecapDetail;
