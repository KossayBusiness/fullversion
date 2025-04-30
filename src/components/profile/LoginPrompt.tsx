import { Button } from "@/components/ui/button";

interface LoginPromptProps {
  onLogin: () => void;
}

const LoginPrompt = ({ onLogin }: LoginPromptProps) => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">Your Personalized Health Profile</h1>
        <p className="text-lg mb-8">
          Access your personal dashboard to track your progress, view your reading history, and receive recommendations tailored to your specific needs.
        </p>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <div className="bg-primary/5 p-4 rounded-lg flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <h3 className="text-lg font-semibold mb-2">Personalized Tracking</h3>
            <p className="text-center">Track your challenges and progress towards better health</p>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-3"><path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1"/><path d="M15 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1"/><path d="M2 12h20"/><path d="M20 16v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1"/><path d="M12 3v9"/><path d="M12 19v2"/></svg>
            <h3 className="text-lg font-semibold mb-2">Tailored Recommendations</h3>
            <p className="text-center">Get advice tailored to your specific needs and interests</p>
          </div>
        </div>

        <Button size="lg" onClick={onLogin}>
          Log in to access your profile
        </Button>

        <p className="mt-4 text-sm text-muted-foreground">
          Note: For demonstration purposes, simply click the button to simulate a login. In a final version, a complete authentication system would be implemented.
        </p>
      </div>
    </div>
  );
};

export { LoginPrompt };
export default LoginPrompt;