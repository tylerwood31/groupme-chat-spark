
import React from "react";
import MemberLeaderboardCard from "./MemberLeaderboardCard";
import { UserStats } from "@/types";

interface LeaderboardTabProps {
  userStats: UserStats[];
}

const LeaderboardTab: React.FC<LeaderboardTabProps> = ({ userStats }) => {
  return (
    <div className="animate-fade-in">
      <MemberLeaderboardCard userStats={userStats} />
    </div>
  );
};

export default LeaderboardTab;
