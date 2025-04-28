
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, BarChart3, Settings, LogOut, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Groups", path: "/groups", icon: MessageSquare },
    { name: "Stats", path: "/stats", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border md:hidden">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-xs transition-colors",
                location.pathname === item.path
                  ? "text-groupme-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-16 bg-sidebar border-r border-border">
        <div className="flex flex-col items-center pt-8 h-full">
          <div className="w-10 h-10 rounded-full bg-groupme-primary text-white flex items-center justify-center mb-8 font-bold text-lg">
            G
          </div>

          <div className="flex-1 flex flex-col items-center space-y-6">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-full",
                  location.pathname === item.path && "bg-muted text-groupme-primary"
                )}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.name}</span>
              </Button>
            ))}
          </div>

          <div className="mb-8">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-muted-foreground hover:text-destructive"
              onClick={logout}
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
