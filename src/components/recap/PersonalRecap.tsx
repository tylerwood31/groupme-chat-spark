
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { UserStats } from "@/types";

interface PersonalRecapProps {
  currentUser: UserStats | null;
  totalUsers: number;
}

const PersonalRecap: React.FC<PersonalRecapProps> = ({ 
  currentUser, 
  totalUsers 
}) => {
  if (!currentUser) return null;
  
  return (
    <section className="mb-10">
      <Card className="bg-gradient-to-r from-groupme-primary/5 to-groupme-accent/5 border-groupme-primary/20">
        <CardContent className="py-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-groupme-primary to-groupme-accent rounded-full flex items-center justify-center text-white mr-4">
              <Trophy className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Your Weekly Recap</h3>
              <p className="text-sm text-muted-foreground">
                You ranked <span className="font-bold text-groupme-primary">#{currentUser.rank || 2}</span> out of {totalUsers} members this week!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default PersonalRecap;
