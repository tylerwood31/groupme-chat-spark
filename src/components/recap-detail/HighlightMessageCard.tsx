
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ThumbsUp } from "lucide-react";

interface HighlightMessageCardProps {
  text: string;
  sender: string;
  likes: number;
}

const HighlightMessageCard: React.FC<HighlightMessageCardProps> = ({ 
  text, 
  sender, 
  likes 
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Highlight Message</h3>
        <div className="bg-muted rounded-lg p-4">
          <p className="text-lg mb-2 italic">"{text}"</p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">— {sender}</p>
            <div className="flex items-center">
              <ThumbsUp className="h-4 w-4 text-groupme-accent mr-1" />
              <span className="text-sm">{likes}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HighlightMessageCard;
