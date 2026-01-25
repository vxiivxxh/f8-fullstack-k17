import React from "react";
import Header from "./components/Header";
import Her from "./components/HerSection";
import ExclusiveDeals from "./components/ExclusiveDeals";
import PopularCategories from "./components/PopularCategories";
import PopularRestaurants from "./components/PopularRestaurants";
import DownloadBanner from "./components/DownloadBanner";
import PartnerSection from "./components/PartnerSection";
import AboutUs from "./components/AboutUs";
import StatsBanner from "./components/StatsBanner";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Her />
        <ExclusiveDeals />
        <PopularCategories />
        <PopularRestaurants />
        <DownloadBanner />
        <PartnerSection />
        <AboutUs />
        <StatsBanner />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
