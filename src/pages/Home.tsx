
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, MessageSquare } from "lucide-react";

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container max-w-5xl px-4 py-8 md:py-12 animate-fade-in">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(" ")[0]}</h1>
          <p className="text-muted-foreground">Here's an overview of your GroupMe activity</p>
        </div>
        <div className="hidden md:block">
          <div className="flex items-center">
            {user?.avatar_url && (
              <img 
                src={user.avatar_url} 
                alt={user.name} 
                className="w-10 h-10 rounded-full mr-2 border-2 border-white shadow" 
              />
            )}
          </div>
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Latest Recaps</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="overflow-hidden border-2 border-groupme-primary/10 hover:border-groupme-primary/20 transition-colors">
            <div className="h-2 bg-gradient-to-r from-groupme-primary to-groupme-accent" />
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">College Friends</h3>
              <p className="text-sm text-muted-foreground mb-4">Weekly recap - May 28, 2024</p>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Messages</span>
                <span className="font-medium">342</span>
              </div>
              <div className="h-2 bg-muted rounded-full mb-4">
                <div className="h-2 bg-groupme-primary rounded-full" style={{ width: '80%' }} />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-2">
                    <img src="https://i.pravatar.cc/150?img=5" className="w-6 h-6 rounded-full" alt="Top poster" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Sarah</span> is top poster
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="text-groupme-primary" onClick={() => navigate("/recap/1")}>
                  <span className="mr-1">View</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-groupme-primary to-groupme-accent" />
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">Work Team</h3>
              <p className="text-sm text-muted-foreground mb-4">Weekly recap - May 28, 2024</p>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Messages</span>
                <span className="font-medium">189</span>
              </div>
              <div className="h-2 bg-muted rounded-full mb-4">
                <div className="h-2 bg-groupme-primary rounded-full" style={{ width: '50%' }} />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-2">
                    <img src="https://i.pravatar.cc/150?img=6" className="w-6 h-6 rounded-full" alt="Top poster" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Jessica</span> is top poster
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="text-groupme-primary" onClick={() => navigate("/recap/2")}>
                  <span className="mr-1">View</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-groupme-primary to-groupme-accent" />
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">Family Chat</h3>
              <p className="text-sm text-muted-foreground mb-4">Weekly recap - May 28, 2024</p>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Messages</span>
                <span className="font-medium">156</span>
              </div>
              <div className="h-2 bg-muted rounded-full mb-4">
                <div className="h-2 bg-groupme-primary rounded-full" style={{ width: '35%' }} />
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-2">
                    <img src="https://i.pravatar.cc/150?img=8" className="w-6 h-6 rounded-full" alt="Top poster" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Mom</span> is top poster
                  </span>
                </div>
                <Button variant="ghost" size="sm" className="text-groupme-primary" onClick={() => navigate("/recap/3")}>
                  <span className="mr-1">View</span>
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 px-4 border-dashed flex flex-col items-center justify-center"
              onClick={() => navigate("/groups")}
            >
              <MessageSquare className="h-8 w-8 text-groupme-primary mb-2" />
              <span className="text-sm font-medium">Manage Groups</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 px-4 border-dashed flex flex-col items-center justify-center"
              onClick={() => navigate("/stats")}
            >
              <BarChart3 className="h-8 w-8 text-groupme-accent mb-2" />
              <span className="text-sm font-medium">View Analytics</span>
            </Button>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Did You Know?</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-groupme-primary flex items-center justify-center mr-4 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Customize Your Recaps</h4>
                  <p className="text-sm text-muted-foreground">
                    You can customize which days you receive recaps and what information is included in them!
                  </p>
                  <Button 
                    variant="link" 
                    className="text-groupme-primary p-0 mt-2 h-auto text-sm font-normal"
                    onClick={() => navigate("/settings")}
                  >
                    Go to Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Home;
