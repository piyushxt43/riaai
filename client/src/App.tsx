import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Home from "@/pages/Home";
import PostureCheck from "@/pages/PostureCheck";
import MoodDetector from "@/pages/MoodDetector";
import About from "@/pages/About";
import Leaderboard from "@/pages/Leaderboard";
import Agent from "@/pages/Agent";
import SignIn from "@/pages/SignIn";
import Onboarding from "@/pages/Onboarding";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/posture-check" component={PostureCheck} />
      <Route path="/mood-detector" component={MoodDetector} />
      <Route path="/about" component={About} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/agent" component={Agent} />
      <Route path="/signin" component={SignIn} />
      <Route path="/onboarding" component={Onboarding} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
