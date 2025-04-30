
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileStatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: 'up' | 'down' | 'stable';
  bgClass?: string;
  onClick?: () => void;
}

const ProfileStatCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  bgClass = "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200",
  onClick 
}: ProfileStatCardProps) => {
  return (
    <Card 
      className={cn(
        "border shadow-sm hover:shadow-md transition-all cursor-pointer", 
        bgClass
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon}
        </div>
        
        <div className="flex items-end justify-between">
          <h3 className="text-3xl font-bold">{value}</h3>
          
          <div className={cn(
            "flex items-center text-xs font-medium rounded-full px-2 py-1",
            trend === 'up' ? "text-emerald-700 bg-emerald-100" : 
            trend === 'down' ? "text-rose-700 bg-rose-100" : 
            "text-slate-700 bg-slate-100"
          )}>
            {trend === 'up' && <ArrowUpIcon className="h-3 w-3 mr-1" />}
            {trend === 'down' && <ArrowDownIcon className="h-3 w-3 mr-1" />}
            {trend === 'stable' && <MinusIcon className="h-3 w-3 mr-1" />}
            {trend === 'up' && "+10%"}
            {trend === 'down' && "-5%"}
            {trend === 'stable' && "stable"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileStatCard;
