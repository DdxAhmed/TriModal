import { useState, lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import Home from '@/pages/home';
import { Navbar } from '@/components/navbar';
import { Preloader } from '@/components/preloader';
import { Route, Switch, Router as WouterRouter } from 'wouter';

const Article = lazy(() => import('@/pages/article'));
const queryClient = new QueryClient();

function Router() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background text-primary font-mono flex items-center justify-center text-sm" dir="ltr">
        <span>LOADING_SYSTEM_RESOURCES...</span>
      </div>
    }>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/article" component={Article} />
        <Route path="/article/:id" component={Article} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
