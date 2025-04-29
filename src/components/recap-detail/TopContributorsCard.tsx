
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ContributorItem from "./ContributorItem";
import { RecapSummary } from "@/types";

interface TopContributorsCardProps {
  recap: RecapSummary;
  totalMessages: number;
  totalLikes: number;
}

const TopContributorsCard: React.FC<TopContributorsCardProps> = ({ 
  recap, 
  totalMessages, 
  totalLikes 
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Contributors</h3>
        <div className="space-y-4">
          <ContributorItem 
            avatarUrl={recap.top_poster.avatar_url}
            name={recap.top_poster.name}
            count={recap.top_poster.message_count}
            type="messages"
            percentage={(recap.top_poster.message_count / totalMessages) * 100 * 2.5}
          />
          
          <ContributorItem 
            avatarUrl={recap.most_liked.avatar_url}
            name={recap.most_liked.name}
            count={recap.most_liked.likes_count}
            type="likes"
            percentage={(recap.most_liked.likes_count / totalLikes) * 100 * 2.5}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TopContributorsCard;
