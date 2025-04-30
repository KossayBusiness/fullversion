
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UserInfoProps {
  userData: {
    name: string;
    age: number;
    gender: string;
    email: string;
  };
  onUpdate: (userData: any) => void;
}

export const UserInfoStep: React.FC<UserInfoProps> = ({ userData, onUpdate }) => {
  const handleChange = (field: string, value: string | number) => {
    onUpdate({
      ...userData,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name"
            placeholder="Enter your name" 
            value={userData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email"
            placeholder="Your email address" 
            value={userData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select 
            value={userData.gender || ''}
            onValueChange={(value) => handleChange('gender', value)}
          >
            <SelectTrigger id="gender">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input 
            id="age"
            type="number"
            placeholder="Your age" 
            value={userData.age || ''}
            onChange={(e) => handleChange('age', parseInt(e.target.value, 10) || 0)}
          />
        </div>
      </div>
    </div>
  );
};
