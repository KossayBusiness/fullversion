
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, User, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfileHeader = () => {
  const { toast } = useToast();

  return (
    <Card className="mb-8 border-none overflow-hidden shadow-sm">
      <div className="h-32 bg-gradient-to-r from-teal-400 to-cyan-500 relative">
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div>
      </div>
      <CardContent className="pt-0 pb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center -mt-10 md:-mt-12">
          <Avatar className="w-20 h-20 border-4 border-white shadow-md">
            <AvatarImage src="https://ui-avatars.com/api/?name=Sophie+Martin&background=0D9488&color=fff" />
            <AvatarFallback className="bg-teal-500 text-white text-lg">SM</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 pt-2 md:pt-0">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  Sophie Martin
                  <Badge variant="highlight" className="ml-2">Premium</Badge>
                </h1>
                <p className="text-muted-foreground">Membre depuis octobre 2023</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1" onClick={() => toast({ 
                  title: "Notifications",
                  description: "Vous avez 3 nouvelles notifications"
                })}>
                  <Bell className="h-4 w-4" />
                  <span className="hidden md:inline">Notifications</span>
                </Button>
                
                <Button variant="outline" size="sm" className="gap-1" onClick={() => toast({ 
                  title: "Paramètres",
                  description: "Accédez à vos paramètres de compte"
                })}>
                  <Settings className="h-4 w-4" />
                  <span className="hidden md:inline">Paramètres</span>
                </Button>
                
                <Button variant="soft" size="sm" className="gap-1" onClick={() => toast({ 
                  title: "Profil",
                  description: "Modifiez vos informations personnelles"
                })}>
                  <User className="h-4 w-4" />
                  <span>Profil</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
