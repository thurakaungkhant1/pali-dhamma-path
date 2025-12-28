import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Teachings from "./pages/Teachings";
import TeachingDetail from "./pages/TeachingDetail";
import Bookmarks from "./pages/Bookmarks";
import Search from "./pages/Search";
import About from "./pages/About";
import Donate from "./pages/Donate";
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
          <Route path="/teachings" element={<Teachings />} />
          <Route path="/teaching/:id" element={<TeachingDetail />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
