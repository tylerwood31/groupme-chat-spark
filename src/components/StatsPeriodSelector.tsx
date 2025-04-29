
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export type StatsPeriod = "daily" | "7day" | "30day";

interface StatsPeriodSelectorProps {
  period: StatsPeriod;
  onChange: (period: StatsPeriod) => void;
}

const StatsPeriodSelector: React.FC<StatsPeriodSelectorProps> = ({ 
  period, 
  onChange 
}) => {
  // Map period to display text
  const getPeriodLabel = (p: StatsPeriod): string => {
    switch(p) {
      case "daily": return "Daily Stats";
      case "7day": return "7-Day Stats";
      case "30day": return "30-Day Stats";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 bg-background border-border"
        >
          {getPeriodLabel(period)}
          <ChevronDown className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem 
          className={period === "daily" ? "bg-accent" : ""}
          onClick={() => onChange("daily")}
        >
          Daily Stats
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={period === "7day" ? "bg-accent" : ""}
          onClick={() => onChange("7day")}
        >
          7-Day Stats
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={period === "30day" ? "bg-accent" : ""}
          onClick={() => onChange("30day")}
        >
          30-Day Stats
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatsPeriodSelector;
