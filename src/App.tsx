import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DirectionsPage from "./pages/DirectionsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ShopPage from "./pages/ShopPage";
import NewsPage from "./pages/NewsPage";
import ContactsPage from "./pages/ContactsPage";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public site */}
          <Route element={<SiteLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/directions" element={<DirectionsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Route>
          {/* Admin (без общего layout) */}
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
