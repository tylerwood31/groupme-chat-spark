
import React from "react";
import StatsPeriodSelector, { StatsPeriod } from "@/components/StatsPeriodSelector";

interface StatsHeaderProps {
  statsPeriod: StatsPeriod;
  onPeriodChange: (period: StatsPeriod) => void;
  periodText: string;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({ 
  statsPeriod, 
  onPeriodChange, 
  periodText 
}) => {
  return (
    <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Your Stats</h1>
        <p className="text-muted-foreground">{periodText}</p>
      </div>
      <div className="mt-3 md:mt-0">
        <StatsPeriodSelector period={statsPeriod} onChange={onPeriodChange} />
      </div>
    </header>
  );
};

export default StatsHeader;
