
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Heart, Star, Award } from "lucide-react";

interface PersonalBestsProps {
  personalBests: {
    most_messages_day: {
      count: number;
      date: string;
    };
    most_likes_week: {
      count: number;
      date: string;
    };
    most_liked_message: {
      text: string;
      likes: number;
      date: string;
    };
  };
}

const PersonalBests: React.FC<PersonalBestsProps> = ({ personalBests }) => {
  return (
    <div>
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
            <div className="text-2xl font-bold">{personalBests.most_messages_day.count}</div>
            <p className="text-xs text-muted-foreground">
              {personalBests.most_messages_day.date}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="h-4 w-4 text-groupme-accent" />
              <h3 className="font-medium">Most Likes in a Week</h3>
            </div>
            <div className="text-2xl font-bold">{personalBests.most_likes_week.count}</div>
            <p className="text-xs text-muted-foreground">
              {personalBests.most_likes_week.date}
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
              "{personalBests.most_liked_message.text}"
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs">
                <Heart className="h-3 w-3 text-groupme-accent" fill="currentColor" />
                <span>{personalBests.most_liked_message.likes}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {personalBests.most_liked_message.date}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PersonalBests;
