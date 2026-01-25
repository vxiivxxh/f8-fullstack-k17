import React from "react";
import FriendsImg from "../assets/friends.png";

export default function DownloadBanner() {
  return (
    <section className="w-full max-w-[1550px] mx-auto px-4 py-16">
      <div className="bg-[#e8e8e8] rounded-[40px] flex flex-col md:flex-row items-center overflow-hidden relative">
        <div className="md:w-1/2 w-full flex justify-center items-end self-end pt-10">
          <img
            src={FriendsImg}
            alt="Friends using phones"
            className="max-h-[500px] object-contain"
          />
        </div>

        <div className="md:w-1/2 w-full p-10 md:p-20 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex flex-col mb-6">
            <div className="text-4xl md:text-6xl font-black text-[#03081f] flex flex-nowrap justify-center md:justify-start items-center gap-1 whitespace-nowrap">
              <span>Order</span>
              <div className="bg-[#fc8a06] text-white px-2 py-1 text-sm rounded-lg -ml-1 -mr-1 rotate-0 transform skew-x-0">
                <span className="text-[#03081f] font-bold text-xl leading-none block">
                  .UK
                </span>
              </div>
              <span>ing</span>
              <span className="ml-2">is more</span>
            </div>

            <div className="mt-4 bg-[#03081f] text-white text-3xl md:text-5xl font-bold px-8 py-4 rounded-full inline-block whitespace-nowrap">
              <span className="text-[#fc8a06] underline decoration-2 underline-offset-8">
                Personalised
              </span>{" "}
              & Instant
            </div>
          </div>

          <p className="text-gray-600 text-lg mb-8 font-medium">
            Download the Order.uk app for faster ordering
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a href="#" className="transition-transform hover:scale-105">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="App Store"
                className="h-14"
              />
            </a>
            <a href="#" className="transition-transform hover:scale-105">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Google Play"
                className="h-14"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
