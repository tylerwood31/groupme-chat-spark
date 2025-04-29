import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchGroups, updateGroupSelection } from "../services/api";
import { Group } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Lock, ChevronRight, MessageSquare } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const FREE_GROUP_LIMIT = 1;

const Groups: React.FC = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCount, setSelectedCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGroups = async () => {
      if (user?.token) {
        try {
          const fetchedGroups = await fetchGroups(user.token);
          
          const groupsWithSelection = fetchedGroups.map((group, index) => ({
            ...group,
            selected: index === 0
          }));
          
          setGroups(groupsWithSelection);
          setFilteredGroups(groupsWithSelection);
          setSelectedCount(1);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to fetch groups:", error);
          setIsLoading(false);
        }
      }
    };

    loadGroups();
  }, [user]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredGroups(groups);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = groups.filter(
        group => group.name.toLowerCase().includes(lowerQuery)
      );
      setFilteredGroups(filtered);
    }
  }, [searchQuery, groups]);

  useEffect(() => {
    const count = groups.filter(group => group.selected).length;
    setSelectedCount(count);
  }, [groups]);

  const handleToggleGroup = async (groupId: string, selected: boolean) => {
    const currentSelected = groups.filter(g => g.selected).length;
    const isExceedingLimit = !isPremium && selected && currentSelected >= FREE_GROUP_LIMIT;
    
    if (isExceedingLimit) {
      toast.info("Free accounts can only select 1 group. Upgrade to track more!");
      return;
    }
    
    try {
      const success = await updateGroupSelection(groupId, selected);
      
      if (success) {
        setGroups(prevGroups => 
          prevGroups.map(group => 
            group.id === groupId ? { ...group, selected } : group
          )
        );
        
        toast.success(`${selected ? "Added" : "Removed"} from recap analysis`);
      }
    } catch (error) {
      console.error("Failed to update group selection:", error);
      toast.error("Failed to update group selection");
    }
  };

  const handleUpgradeClick = () => {
    toast.info("This would take you to the upgrade page!");
  };

  const handleViewRecap = (groupId: string) => {
    navigate(`/recap/${groupId}`);
  };

  return (
    <div className="container max-w-4xl px-4 py-8 animate-fade-in">
      <header className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Your Groups</h1>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-muted-foreground">
            Select which groups to include in your recaps
          </p>
          <Badge variant="outline" className="bg-muted/50">
            {selectedCount}/{groups.length} selected
          </Badge>
        </div>
      </header>
      
      <div className="mb-6 bg-muted/20 border rounded-lg p-4 text-sm">
        <p className="font-medium text-muted-foreground">
          Free accounts can include {FREE_GROUP_LIMIT} group in recaps. 
          Upgrade to Message Board+ to track more.
        </p>
      </div>
      
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          className="pl-10"
          placeholder="Search groups..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <Skeleton className="h-12 w-12 rounded-md mr-4" />
                  <div className="flex-1">
                    <Skeleton className="h-5 w-1/3 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-10" />
                </div>
              </CardContent>
            </Card>
          ))
        ) : filteredGroups.length > 0 ? (
          filteredGroups.map(group => {
            const isGroupLocked = !isPremium && !group.selected && selectedCount >= FREE_GROUP_LIMIT;
            
            return (
              <Card 
                key={group.id} 
                className={`transition-all duration-200 ${
                  group.selected 
                    ? "border-groupme-primary/50 bg-groupme-primary/5" 
                    : isGroupLocked ? "opacity-75" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-md bg-muted flex-shrink-0 mr-4 overflow-hidden">
                      {group.image_url ? (
                        <img 
                          src={group.image_url} 
                          alt={group.name} 
                          className={`w-full h-full object-cover ${isGroupLocked ? "filter blur-[1px]" : ""}`}
                        />
                      ) : (
                        <div className={`w-full h-full flex items-center justify-center bg-groupme-primary text-white font-medium ${isGroupLocked ? "opacity-60" : ""}`}>
                          {group.name.substring(0, 2)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">{group.member_count} members</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      {isGroupLocked ? (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2">
                                <Lock className="h-4 w-4 text-muted-foreground" />
                                <Switch 
                                  checked={false}
                                  disabled={true}
                                  className="opacity-50"
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Unlock multiple groups with Message Board+</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <Switch 
                          checked={!!group.selected} 
                          onCheckedChange={checked => handleToggleGroup(group.id, checked)}
                        />
                      )}
                      
                      {group.selected && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => handleViewRecap(group.id)}
                        >
                          <MessageSquare className="h-3 w-3 mr-1" /> 
                          View Chat Recap
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No groups found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
      
      {!isPremium && selectedCount >= FREE_GROUP_LIMIT && (
        <div className="mt-8 p-5 border border-purple-200 bg-purple-50 rounded-lg text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="font-medium text-lg mb-1">Want to track all your chats?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Upgrade to Message Board+ and include unlimited groups.
            </p>
            <Button 
              className="bg-groupme-accent hover:bg-groupme-accent/90" 
              onClick={handleUpgradeClick}
            >
              Upgrade to Premium <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
      
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Only selected groups will be included in your weekly recaps</p>
      </div>
    </div>
  );
};

export default Groups;
