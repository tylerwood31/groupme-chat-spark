
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Settings: React.FC = () => {
  const { user, logout } = useAuth();
  const [emailRecaps, setEmailRecaps] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [recapFrequency, setRecapFrequency] = useState("weekly");

  const handleSaveSettings = () => {
    // In a real app, this would save settings to your backend
    toast.success("Settings saved successfully");
  };

  return (
    <div className="container max-w-4xl px-4 py-8 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and notification preferences</p>
      </header>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Manage your account information and connected services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {user?.avatar_url && (
                <img 
                  src={user.avatar_url} 
                  alt={user.name} 
                  className="w-16 h-16 rounded-full mr-4 border-2 border-white shadow" 
                />
              )}
              <div>
                <h3 className="font-medium text-lg">{user?.name}</h3>
                <p className="text-sm text-muted-foreground">Connected via GroupMe</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choose how you want to be notified about new recaps
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-recaps" className="font-medium">Email Recaps</Label>
                <p className="text-sm text-muted-foreground">
                  Receive recap summaries in your email
                </p>
              </div>
              <Switch 
                id="email-recaps" 
                checked={emailRecaps}
                onCheckedChange={setEmailRecaps}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="push-notifications" className="font-medium">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when new recaps are available
                </p>
              </div>
              <Switch 
                id="push-notifications" 
                checked={pushNotifications}
                onCheckedChange={setPushNotifications}
              />
            </div>
            
            <div>
              <Label htmlFor="recap-frequency" className="font-medium mb-2 block">Recap Frequency</Label>
              <Select value={recapFrequency} onValueChange={setRecapFrequency}>
                <SelectTrigger className="w-full md:w-[240px]">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
            <CardDescription>
              Manage your data and privacy settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="data-collection" className="font-medium">Data Collection</Label>
                <p className="text-sm text-muted-foreground">
                  Allow analysis of message content for better recaps
                </p>
              </div>
              <Switch id="data-collection" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="share-stats" className="font-medium">Share Stats</Label>
                <p className="text-sm text-muted-foreground">
                  Allow other group members to see your activity stats
                </p>
              </div>
              <Switch id="share-stats" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
        <Button variant="outline" onClick={logout} className="mt-4 sm:mt-0">
          Log Out
        </Button>
        
        <div className="space-x-2">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSaveSettings}>Save Settings</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
