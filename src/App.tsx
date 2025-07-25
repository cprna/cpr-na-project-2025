import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CourseFlow from "./pages/CourseFlow";
import Articles from "./pages/Articles";
import Admin from "./pages/Admin";
import Learn from "./pages/Learn";
import PreTest from "./pages/PreTest";
import PostTest from "./pages/PostTest";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/course" element={<CourseFlow />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/pretest" element={<PreTest />} />
          <Route path="/posttest" element={<PostTest />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/admin" element={<Admin />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
