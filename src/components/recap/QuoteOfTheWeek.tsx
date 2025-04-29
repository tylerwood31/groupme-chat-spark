
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Star } from "lucide-react";

interface QuoteOfTheWeekProps {
  text: string;
  sender: string;
  likes: number;
}

const QuoteOfTheWeek: React.FC<QuoteOfTheWeekProps> = ({ text, sender, likes }) => {
  return (
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
            <p className="text-lg italic mb-4">{text}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">— {sender}</span>
              </div>
              <Badge className="flex items-center gap-1 bg-groupme-primary">
                <Star className="h-3 w-3" />
                <span>{likes}</span>
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default QuoteOfTheWeek;
