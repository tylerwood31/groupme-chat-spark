
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, MessageSquare, Heart, Award, Star, Clock, ArrowUp } from "lucide-react";
import { WeeklyStats } from "@/types";
import { cn } from "@/lib/utils";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const Stats: React.FC = () => {
  // Mock data for demonstration - in a real app this would come from an API
  const [stats] = useState<WeeklyStats>({
    rank: 2,
    total_members: 12,
    messages_sent: 87,
    likes_received: 152,
    like_ratio: 1.75,
    most_active_day: "Tuesday",
    most_active_time: "12pm - 1pm",
    streak_days: 5,
    streak_type: "posting",
    personal_bests: {
      most_messages_day: {
        count: 42,
        date: "March 15, 2023"
      },
      most_likes_week: {
        count: 210,
        date: "April 3-9, 2023"
      },
      most_liked_message: {
        text: "Can't wait to see everyone at the reunion next month! It's been too long!",
        likes: 35,
        date: "February 10, 2023"
      }
    },
    daily_activity: [
      { day: "Mon", messages: 12, likes: 22 },
      { day: "Tue", messages: 19, likes: 34 },
      { day: "Wed", messages: 15, likes: 27 },
      { day: "Thu", messages: 14, likes: 19 },
      { day: "Fri", messages: 23, likes: 38 },
      { day: "Sat", messages: 8, likes: 12 },
      { day: "Sun", messages: 5, likes: 8 }
    ]
  });

  const chartConfig = {
    messages: {
      label: "Messages",
      color: "#00AFF0"
    },
    likes: {
      label: "Likes",
      color: "#6C5CE7"
    }
  };

  // Calculate like ratio percentage for the gauge
  const likeRatioPercentage = Math.min(stats.like_ratio * 10, 100);

  return (
    <div className="container max-w-4xl px-4 py-8 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-3xl font-bold gradient-text">Your Stats</h1>
        <p className="text-muted-foreground">Weekly performance for Apr 22-28, 2024</p>
      </header>
      
      {/* Weekly Rank Section */}
      <div className="mb-8">
        <Card className="overflow-hidden border-2 border-groupme-primary/20 bg-gradient-to-br from-background to-groupme-primary/5">
          <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-groupme-primary rounded-full flex items-center justify-center text-white text-3xl md:text-4xl font-bold">
                  #{stats.rank}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-groupme-accent text-white text-xs rounded-full w-8 h-8 flex items-center justify-center">
                  <ArrowUp className="h-4 w-4" />
                </div>
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold">You're #{stats.rank} in Messages Sent</h2>
                <p className="text-muted-foreground">Out of {stats.total_members} members this week</p>
              </div>
            </div>
            <Badge className="text-base bg-groupme-accent hover:bg-groupme-accent/90 py-2 px-4">
              Just 8 more messages to steal the #1 spot!
            </Badge>
          </CardContent>
        </Card>
      </div>
      
      {/* Weekly Totals Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="border-2 border-groupme-primary/20 overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-groupme-primary" />
              Messages Sent
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-4xl font-bold">{stats.messages_sent}</div>
            <p className="text-sm text-muted-foreground">This week</p>
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
            <div className="text-4xl font-bold">{stats.likes_received}</div>
            <p className="text-sm text-muted-foreground">This week</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Like Ratio Section */}
      <div className="mb-8">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-groupme-primary" />
              Your Like Ratio
            </CardTitle>
            <CardDescription>Average likes per message</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold mb-3">{stats.like_ratio.toFixed(2)}</div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-groupme-primary to-groupme-accent animate-pulse-light"
                  style={{ width: `${likeRatioPercentage}%` }}
                ></div>
              </div>
              <div className="w-full flex justify-between mt-2 text-sm text-muted-foreground">
                <span>0</span>
                <span>5.0</span>
                <span>10.0</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Trend Chart Section */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-groupme-primary" />
              Weekly Activity
            </CardTitle>
            <CardDescription>Your messages and likes by day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ChartContainer config={chartConfig}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stats.daily_activity}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="messages" 
                      stroke="#00AFF0" 
                      strokeWidth={2} 
                      dot={{ fill: '#00AFF0', r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name="messages"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="likes" 
                      stroke="#6C5CE7" 
                      strokeWidth={2} 
                      dot={{ fill: '#6C5CE7', r: 4, strokeWidth: 2 }}
                      activeDot={{ r: 6 }}
                      name="likes"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Personal Bests Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Award className="h-6 w-6 text-groupme-accent" />
          Personal Bests
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-groupme-primary" />
                <h3 className="font-medium">Most Messages in a Day</h3>
              </div>
              <div className="text-2xl font-bold">{stats.personal_bests.most_messages_day.count}</div>
              <p className="text-xs text-muted-foreground">
                {stats.personal_bests.most_messages_day.date}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="h-4 w-4 text-groupme-accent" />
                <h3 className="font-medium">Most Likes in a Week</h3>
              </div>
              <div className="text-2xl font-bold">{stats.personal_bests.most_likes_week.count}</div>
              <p className="text-xs text-muted-foreground">
                {stats.personal_bests.most_likes_week.date}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-amber-400" />
                <h3 className="font-medium">Most Liked Message</h3>
              </div>
              <div className="text-sm line-clamp-2 mb-1">
                "{stats.personal_bests.most_liked_message.text}"
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs">
                  <Heart className="h-3 w-3 text-groupme-accent" fill="currentColor" />
                  <span>{stats.personal_bests.most_liked_message.likes}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {stats.personal_bests.most_liked_message.date}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Fun Facts + Streaks Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Alert className={cn(
          "border-2 border-groupme-primary/20",
          "bg-gradient-to-br from-background to-groupme-primary/5"
        )}>
          <Clock className="h-5 w-5" />
          <AlertTitle className="text-lg font-medium mb-2">Fun Fact of the Week</AlertTitle>
          <AlertDescription>
            <p className="mb-1">You posted most during <span className="font-semibold">{stats.most_active_time}</span></p>
            <p><span className="font-semibold">{stats.most_active_day}</span> was your loudest day.</p>
          </AlertDescription>
        </Alert>
        
        {stats.streak_days > 0 && (
          <Alert className={cn(
            "border-2 border-groupme-accent/20",
            "bg-gradient-to-br from-background to-groupme-accent/5"
          )}>
            <TrendingUp className="h-5 w-5" />
            <AlertTitle className="text-lg font-medium mb-2">Current Streak</AlertTitle>
            <AlertDescription className="flex items-center gap-2">
              <span className="text-2xl font-bold">{stats.streak_days}-day</span> 
              <span>{stats.streak_type} streak! 🔥</span>
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <div className="text-center mt-12 mb-6">
        <Badge className="text-base bg-groupme-primary py-2 px-4 hover:bg-groupme-primary/90">
          MVP vibes unlocked. You crushed it!
        </Badge>
      </div>
    </div>
  );
};

export default Stats;
