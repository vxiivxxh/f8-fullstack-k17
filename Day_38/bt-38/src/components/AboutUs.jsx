import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import {
  Target,
  Users,
  BarChart,
  LifeBuoy,
  Handshake,
  Info,
} from "lucide-react";

const fetchFaqs = async () => {
  const res = await fetch("http://localhost:3000/faqs");
  if (!res.ok) throw new Error("Failed to fetch FAQs");
  return res.json();
};

export default function AboutUs() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const {
    data: faqList,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFaqs,
  });

  const steps = [
    {
      title: "Place an Order!",
      desc: "Place order through our website or Mobile app",
      img: "https://cdn-icons-png.flaticon.com/512/3119/3119338.png",
    },
    {
      title: "Track Progress",
      desc: "Your can track your order status with delivery time",
      img: "https://cdn-icons-png.flaticon.com/512/1037/1037762.png",
    },
    {
      title: "Get your Order!",
      desc: "Receive your order at a lighting fast speed!",
      img: "https://cdn-icons-png.flaticon.com/512/709/709790.png",
    },
  ];

  const ContentWrapper = ({ children }) => (
    <div className="bg-white rounded-[50px] p-8 md:p-16 shadow-sm border border-gray-100 min-h-[500px] animate-in fade-in duration-500">
      {children}
    </div>
  );

  return (
    <section className="bg-[#f5f5f5] py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Tabs defaultValue="faq" className="w-full">
          <div className="flex flex-col gap-8 mb-10">
            <h2 className="text-3xl font-black text-[#03081f]">
              Know more about us!
            </h2>
    
            <TabsList className="bg-transparent h-auto w-full flex flex-row items-center justify-between p-0 gap-2">
              {[
                { id: "faq", label: "Frequent Questions" },
                { id: "who", label: "Who we are?" },
                { id: "partner", label: "Partner Program" },
                { id: "help", label: "Help & Support" },
              ].map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="
          flex-1 
          text-base font-bold text-gray-500 
          py-4 px-2
          rounded-full 
          border border-transparent 
          transition-all 
          whitespace-nowrap
          data-[state=active]:border-[#fc8a06] 
          data-[state=active]:text-[#03081f] 
          data-[state=active]:bg-white 
          data-[state=active]:shadow-none
        "
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="faq" className="mt-0 outline-none">
            <ContentWrapper>
              {isLoading && <div className="text-center">Loading FAQs...</div>}
              {error && (
                <div className="text-center text-red-500">
                  Error loading FAQs
                </div>
              )}

              {faqList && (
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                  <div className="flex flex-col gap-5 w-full lg:w-[35%]">
                    {faqList.map((item, index) => (
                      <button
                        key={item.id}
                        onClick={() => setCurrentQuestion(index)}
                        className={`text-left px-10 py-5 rounded-full font-bold text-[15px] transition-all ${
                          currentQuestion === index
                            ? "bg-[#fc8a06] text-white shadow-lg"
                            : "bg-white border border-gray-100 text-[#03081f] hover:bg-gray-50"
                        }`}
                      >
                        {item.question}
                      </button>
                    ))}
                  </div>

                  <div className="w-full lg:w-[65%] flex flex-col items-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-14">
                      {steps.map((step, idx) => (
                        <div
                          key={idx}
                          className="bg-[#ebebeb] rounded-[30px] p-8 flex flex-col items-center text-center"
                        >
                          <h4 className="font-black text-[#03081f] mb-5 text-sm uppercase tracking-wide">
                            {step.title}
                          </h4>
                          <img
                            src={step.img}
                            alt=""
                            className="h-24 w-24 mb-6 object-contain"
                          />
                          <p className="text-[12px] font-semibold text-gray-500 leading-relaxed uppercase">
                            {step.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-[15px] text-[#03081f] max-w-2xl leading-relaxed font-medium min-h-[50px]">
                      {faqList[currentQuestion]?.answer}
                    </p>
                  </div>
                </div>
              )}
            </ContentWrapper>
          </TabsContent>

          <TabsContent value="who">
            <ContentWrapper>
              <div className="text-center">Who we are content...</div>
            </ContentWrapper>
          </TabsContent>
          <TabsContent value="partner">
            <ContentWrapper>
              <div className="text-center">Partner Program content...</div>
            </ContentWrapper>
          </TabsContent>
          <TabsContent value="help">
            <ContentWrapper>
              <div className="text-center">Help & Support content...</div>
            </ContentWrapper>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
