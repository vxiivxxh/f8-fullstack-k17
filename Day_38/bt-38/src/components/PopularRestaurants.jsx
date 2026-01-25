import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchRestaurants = async () => {
  const res = await fetch("http://localhost:3000/restaurants");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export default function PopularRestaurants() {
  const {
    data: restaurants,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants,
  });

  if (isLoading)
    return <div className="text-center py-10">Loading restaurants...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading restaurants
      </div>
    );

  return (
    <section className="bg-[#fbfbfb] py-16">
      <div className="w-full max-w-[1550px] mx-auto px-4">
        <h2 className="text-3xl font-black text-[#03081f] mb-10 text-center md:text-left">
          Popular Restaurants
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {restaurants.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-gray-100 flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-xl ${item.bgColor}`}
            >
              <div
                className={`w-full h-32 flex items-center justify-center p-4 ${item.bgColor}`}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="bg-[#fc8a06] w-full py-4 text-center">
                <h3 className="text-white font-bold text-lg leading-tight truncate px-2">
                  {item.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
