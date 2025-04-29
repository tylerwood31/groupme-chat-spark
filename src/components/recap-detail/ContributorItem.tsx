
import React from "react";
import { Avatar } from "@/components/ui/avatar";

interface ContributorItemProps {
  avatarUrl: string;
  name: string;
  count: number;
  type: string;
  percentage: number;
}

const ContributorItem: React.FC<ContributorItemProps> = ({ 
  avatarUrl, 
  name, 
  count, 
  type, 
  percentage,
}) => {
  return (
    <div className="flex items-center">
      <img 
        src={avatarUrl} 
        alt={name} 
        className="w-10 h-10 rounded-full mr-3" 
      />
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <p className="font-medium">{name}</p>
          <p className="text-sm font-medium">{count} {type}</p>
        </div>
        <div className="h-2 bg-muted rounded-full">
          <div 
            className={`h-2 ${type === "messages" ? "bg-groupme-primary" : "bg-groupme-accent"} rounded-full`}
            style={{ width: `${Math.min(100, percentage)}%` }} 
          />
        </div>
      </div>
    </div>
  );
};

export default ContributorItem;
