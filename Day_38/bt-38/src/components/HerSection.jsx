import React from "react";

import PizzaGirl from "../assets/PizzaGirl.png";

export default function Her() {
  return (
    <section className="w-full max-w-[1550px] mx-auto px-4 mt-10">
      <div className="bg-[#f5f5f5] rounded-[50px] flex flex-col md:flex-row items-stretch relative min-h-[580px] overflow-hidden">
        <div className="flex-[0.8] flex flex-col justify-center p-12 md:pl-16 z-10">
          <p className="text-gray-500 text-base mb-2">
            Order Restaurant food, takeaway and groceries.
          </p>
          <h1 className="text-5xl md:text-6xl font-black text-[#03081f] leading-[1.1] mb-8">
            Feast Your <br /> Senses, <br />
            <span className="text-[#fc8a06]">Fast and Fresh</span>
          </h1>

          <p className="text-gray-700 text-sm mb-4 ml-1">
            Enter a postcode to see what we deliver
          </p>
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              placeholder="e.g. EC4R 3TE"
              className="w-full border border-gray-200 rounded-full py-4 px-8 text-base outline-none shadow-sm"
            />
            <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-[#fc8a06] text-white px-8 rounded-full font-bold text-base hover:bg-[#ef8205]">
              Search
            </button>
          </div>
        </div>

        <div className="flex-[1.2] relative min-h-[550px]">
          <div className="absolute right-0 bottom-0 bg-[#fc8a06] w-[95%] h-[90%] rounded-tl-[300px] z-0"></div>

          <div className="absolute bottom-[-55px] left-[-25%] w-full h-full flex justify-start items-end z-20 pointer-events-none">
            <img
              src={PizzaGirl}
              alt="Pizza Girl"
              className="h-[98%] object-contain"
            />
          </div>

          <div className="absolute top-10 right-[-10px] z-30 flex flex-col gap-5">
            <Notification
              number="1"
              title="We've Received your order!"
              desc="Awaiting Restaurant acceptance"
            />
            <Notification
              number="2"
              title="Order Accepted! ✅"
              desc="Your order will be delivered shortly"
            />
            <Notification
              number="3"
              title="Your rider's nearby 🎉"
              desc="They're almost there - get ready!"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Notification({ number, title, desc }) {
  return (
    <div className="bg-white p-5 rounded-[25px] shadow-[0_15px_45px_rgba(0,0,0,0.1)] flex flex-col w-[290px] relative border border-gray-50">
      <span className="absolute top-0 right-5 text-7xl font-black text-gray-100 italic opacity-40">
        {number}
      </span>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-1">
          <span className="text-[10px] font-bold text-[#fc8a06] uppercase tracking-widest">
            Order
          </span>
          <span className="text-[10px] font-bold text-gray-300">now</span>
        </div>
        <h4 className="font-bold text-[14px] text-[#03081f] leading-tight mb-1">
          {title}
        </h4>
        <p className="text-[11px] text-gray-500 font-medium">{desc}</p>
      </div>
    </div>
  );
}
