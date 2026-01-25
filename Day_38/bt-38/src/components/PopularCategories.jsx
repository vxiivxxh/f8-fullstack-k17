import React from "react";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async () => {
  const res = await fetch("http://localhost:3000/categories");
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export default function PopularCategories() {
  const {
    data: categories,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading)
    return <div className="text-center py-10">Loading categories...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading categories
      </div>
    );

  return (
    <section className="w-full max-w-[1550px] mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-[#03081f] mb-8">
        Order.uk Popular Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white border border-gray-100"
          >
            <div
              className={`h-40 flex items-center justify-center p-4 ${cat.bgColor}`}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-3 bg-[#F5F5F5]">
              <h3 className="font-bold text-sm text-[#03081f] truncate">
                {cat.name}
              </h3>
              <p className="text-[11px] text-[#FC8A06] font-medium">
                {cat.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
