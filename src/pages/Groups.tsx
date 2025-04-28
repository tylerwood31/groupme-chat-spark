
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchGroups, updateGroupSelection } from "../services/api";
import { Group } from "../types";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "sonner";

const Groups: React.FC = () => {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadGroups = async () => {
      if (user?.token) {
        try {
          const fetchedGroups = await fetchGroups(user.token);
          
          // Mark first two as selected by default
          const groupsWithSelection = fetchedGroups.map((group, index) => ({
            ...group,
            selected: index < 2
          }));
          
          setGroups(groupsWithSelection);
          setFilteredGroups(groupsWithSelection);
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

  const handleToggleGroup = async (groupId: string, selected: boolean) => {
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

  return (
    <div className="container max-w-4xl px-4 py-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Groups</h1>
        <p className="text-muted-foreground">Select which groups to include in your recaps</p>
      </header>
      
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
          filteredGroups.map(group => (
            <Card key={group.id} className={group.selected ? "border-groupme-primary/50" : ""}>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-md bg-muted flex-shrink-0 mr-4 overflow-hidden">
                    {group.image_url ? (
                      <img 
                        src={group.image_url} 
                        alt={group.name} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-groupme-primary text-white font-medium">
                        {group.name.substring(0, 2)}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{group.name}</h3>
                    <p className="text-sm text-muted-foreground">{group.member_count} members</p>
                  </div>
                  <Switch 
                    checked={!!group.selected} 
                    onCheckedChange={checked => handleToggleGroup(group.id, checked)}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No groups found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center text-sm text-muted-foreground">
        <p>Only selected groups will be included in your weekly recaps</p>
      </div>
    </div>
  );
};

export default Groups;
