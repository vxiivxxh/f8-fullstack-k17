import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const fetchDeals = async () => {
  const res = await fetch("http://localhost:3000/deals");
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export default function ExclusiveDeals() {
  const {
    data: deals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["deals"],
    queryFn: fetchDeals,
  });

  if (isLoading)
    return <div className="text-center py-10">Loading deals...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">Error loading deals</div>
    );

  const renderDeals = (categoryName) => {
    const filteredDeals = deals.filter(
      (deal) => deal.category.toLowerCase() === categoryName.toLowerCase(),
    );

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-0">
        {filteredDeals.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-[20px] overflow-hidden h-[320px] cursor-pointer shadow-lg"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-full object-cover transition-all group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"></div>
            <div className="absolute top-0 right-8 bg-[#03081f] text-white px-5 py-3 rounded-b-xl font-bold">
              {item.discount}
            </div>
            <div className="absolute bottom-8 left-8">
              <p className="text-[#fc8a06] font-bold text-sm mb-1 uppercase">
                Restaurant
              </p>
              <h3 className="text-white text-2xl font-black">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="w-full max-w-[1550px] mx-auto px-4 py-12">
      <Tabs defaultValue="vegan" className="w-full">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-black text-[#03081f]">
            Up to -40% 🎊 Order.uk exclusive deals
          </h2>

          <TabsList className="bg-transparent h-auto gap-2">
            {["vegan", "sushi", "pizza", "others"].map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="rounded-full px-8 py-3 capitalize data-[state=active]:border-[#fc8a06] data-[state=active]:text-[#fc8a06] border border-gray-200 font-bold"
              >
                {cat === "pizza" ? "Pizza & Fast food" : cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value="vegan">{renderDeals("vegan")}</TabsContent>
        <TabsContent value="sushi">{renderDeals("sushi")}</TabsContent>
        <TabsContent value="pizza">{renderDeals("pizza")}</TabsContent>
        <TabsContent value="others">{renderDeals("others")}</TabsContent>
      </Tabs>
    </section>
  );
}
