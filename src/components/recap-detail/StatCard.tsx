
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgClass: string;
  iconColorClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, iconBgClass, iconColorClass }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-3xl font-bold">{value}</h3>
          </div>
          <div className={`h-10 w-10 ${iconBgClass} rounded-full flex items-center justify-center`}>
            <Icon className={`h-5 w-5 ${iconColorClass}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
