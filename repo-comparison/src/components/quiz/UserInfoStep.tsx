
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QuizStepProps } from "./types";

const UserInfoStep = ({ responses, updateResponse }: QuizStepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Votre prénom</Label>
        <Input
          id="name"
          value={responses.name}
          onChange={(e) => updateResponse("name", e.target.value)}
          placeholder="Prénom"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email">Votre email</Label>
        <Input
          id="email"
          type="email"
          value={responses.email}
          onChange={(e) => updateResponse("email", e.target.value)}
          placeholder="email@exemple.com"
          className="mt-1"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Nous utiliserons cette adresse pour vous envoyer vos résultats
        </p>
      </div>
    </div>
  );
};

export default UserInfoStep;
