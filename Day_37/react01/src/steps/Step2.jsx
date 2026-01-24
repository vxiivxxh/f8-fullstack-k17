import React from "react";
import FormInput from "../components/FormInput";

const Step2 = () => (
  <div className="max-w-md animate-in slide-in-from-right-4 duration-500 text-left">
    <h2 className="text-3xl font-bold mb-2 text-white">Tên đăng nhập</h2>
    <p className="text-slate-400 mb-8 text-sm italic">
      Yêu cầu: Tên đăng nhập phải chứa tên của bạn ở Bước 1.
    </p>
    <FormInput label="Tên đăng nhập" name="username" />
  </div>
);
export default Step2;
