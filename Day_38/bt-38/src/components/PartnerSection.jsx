import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchPartners = async () => {
  const res = await fetch("http://localhost:3000/partners");
  if (!res.ok) throw new Error("Failed to fetch partners");
  return res.json();
};

export default function PartnerSection() {
  const {
    data: partnerCards,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["partners"],
    queryFn: fetchPartners,
  });

  if (isLoading)
    return <div className="text-center py-10">Loading partners...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading partners: {error.message}
      </div>
    );

  console.log("PartnerSection Data:", partnerCards);

  if (!partnerCards || !Array.isArray(partnerCards)) {
    return (
      <div className="text-center py-10 text-gray-500">
        (check console)
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {partnerCards.map((card) => (
          <div
            key={card.id}
            style={{ height: "450px" }}
            className="relative rounded-[30px] overflow-hidden group cursor-pointer shadow-xl"
          >
            <img
              src={card.image}
              alt={card.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <div className="absolute top-0 left-10 bg-white px-8 py-4 rounded-b-2xl shadow-md">
              <span className="text-[#03081f] font-bold text-sm">
                {card.badge}
              </span>
            </div>

            <div className="absolute bottom-10 left-10 z-10">
              <p className="text-[#fc8a06] font-bold text-lg mb-2">
                {card.label}
              </p>
              <h2 className="text-white text-5xl font-black mb-8 leading-tight">
                {card.title}
              </h2>

              <button className="bg-[#fc8a06] text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-[#ef8205] transition-all shadow-lg active:scale-95">
                {card.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
