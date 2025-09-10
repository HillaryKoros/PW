import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import Navigation from "./components/layout/navigation";
import NotFound from "./pages/not-found";
import MapViewer from "./pages/map-viewer";
import Home from "./pages/home";
import Analytics from "./pages/analytics";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/mapviewer" component={MapViewer} />
      <Route path="/analytics" component={Analytics} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="h-screen bg-background flex flex-col">
          <Navigation />
          <Router />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
