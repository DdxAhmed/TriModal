import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import Article from '@/pages/article';
import { Navbar } from '@/components/navbar';
import { Preloader } from '@/components/preloader';
import { Route, Switch, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/article" component={Article} />
      <Route path="/article/:id" component={Article} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />
            <div className="flex-1">
              <Router />
            </div>
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
