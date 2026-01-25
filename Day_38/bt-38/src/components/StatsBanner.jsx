import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchStats = async () => {
  const res = await fetch("http://localhost:3000/stats");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export default function StatsBanner() {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  if (isLoading)
    return <div className="text-center py-10">Loading stats...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">Error loading stats</div>
    );

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="bg-primary rounded-[30px] py-14 flex flex-col md:flex-row items-center justify-between text-primary-foreground">
        {stats.map((stat, index) => (
          <div
            key={stat.id}
            className={`flex-1 text-center w-full md:w-auto ${
              index !== stats.length - 1 ? "md:border-r border-white/20" : ""
            } ${index !== 0 ? "mt-8 md:mt-0" : ""}`}
          >
            <div className="text-5xl md:text-6xl font-light mb-3">
              {stat.number}
            </div>
            <div className="text-lg md:text-xl font-bold uppercase tracking-wide opacity-90">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
