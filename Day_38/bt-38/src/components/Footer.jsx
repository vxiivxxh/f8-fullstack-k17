import React from "react";
import { Facebook, Instagram, Twitter, Ghost } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20">
      <div className="bg-[#eeeeee] py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col gap-6">
            <div className="text-4xl font-black">
              <span>Order</span>
              <span className="text-[#fc8a06]">.UK</span>
            </div>
            <div className="flex flex-col gap-3">
              <a href="#" className="w-fit hover:opacity-80 transition-opacity">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="App Store"
                  className="h-10 w-fit"
                />
              </a>
              <a href="#" className="w-fit hover:opacity-80 transition-opacity">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play"
                  className="h-10 w-fit"
                />
              </a>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Company # 490039-445, Registered with House of companies.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h4 className="font-bold text-[#03081f]">
              Get Exclusive Deals in your Inbox
            </h4>
            <div className="relative flex">
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="bg-[#d9d9d9] rounded-full py-4 px-6 w-full outline-none text-sm"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-[#fc8a06] text-white px-8 rounded-full font-bold text-sm">
                Subscribe
              </button>
            </div>
            <p className="text-[10px] text-gray-500">
              we wont spam, read our{" "}
              <span className="underline">email policy</span>
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Facebook size={20} />} />
              <SocialIcon icon={<Instagram size={20} />} />
              <SocialIcon icon={<Twitter size={20} />} />
              <SocialIcon icon={<Ghost size={20} />} />{" "}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#03081f]">Legal Pages</h4>
            <ul className="flex flex-col gap-3 text-sm underline decoration-gray-400">
              <li>
                <a href="#">Terms and conditions</a>
              </li>
              <li>
                <a href="#">Privacy</a>
              </li>
              <li>
                <a href="#">Cookies</a>
              </li>
              <li>
                <a href="#">Modern Slavery Statement</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#03081f]">Important Links</h4>
            <ul className="flex flex-col gap-3 text-sm underline decoration-gray-400">
              <li>
                <a href="#">Get help</a>
              </li>
              <li>
                <a href="#">Add your restaurant</a>
              </li>
              <li>
                <a href="#">Sign up to deliver</a>
              </li>
              <li>
                <a href="#">Create a business account</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#03081f] text-white py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[12px] gap-4">
          <p>Order.uk Copyright 2024, All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Pricing</a>
            <a href="#">Do not sell or share my personal information</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
function SocialIcon({ icon }) {
  return (
    <div className="hover:text-[#fc8a06] cursor-pointer transition-colors">
      {icon}
    </div>
  );
}
