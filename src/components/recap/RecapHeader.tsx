
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar } from "lucide-react";

interface RecapHeaderProps {
  groupName: string;
  groupImageUrl?: string;
  memberCount?: number;
  period: string;
}

const RecapHeader: React.FC<RecapHeaderProps> = ({
  groupName,
  groupImageUrl,
  memberCount,
  period
}) => {
  return (
    <header className="mb-8 bg-gradient-to-r from-groupme-primary to-groupme-accent p-6 rounded-lg text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAg
      IDxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAxMmM2LjA3NSAwIDExLTQuOTI1IDExLTExcy
      00LjkyNS0xMS0xMS0xMS0xMSA0LjkyNS0xMSAxMSA0LjkyNSAxMSAxMSAxMXptLTE4LTdha4CAgIAOIDAyIDA9IjAgMSAwLTE4IDAgOSA5IDAgMCAxIDE4IDB6IiBmaWxsLW9wYWNpdHk9Ii4yIiBmaWxsPSIjRkZGIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz4KPC9zdmc+')]"></div>
      
      <div className="flex items-center">
        <div className="w-20 h-20 rounded-xl bg-white/20 overflow-hidden mr-6">
          {groupImageUrl ? (
            <img src={groupImageUrl} alt={groupName} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-2xl">
              {groupName.substring(0, 2)}
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-1">{groupName}</h1>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <Users className="h-4 w-4" />
            <span>{memberCount || "12"} members</span>
          </div>
          
          <div className="flex mt-2">
            <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{period}</span>
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/20">
        <h2 className="text-lg font-medium mb-2">This Week's Recap</h2>
        <p className="text-sm text-white/90">
          Another week of chaos, laughs, and unexpected twists!
        </p>
      </div>
    </header>
  );
};

export default RecapHeader;
