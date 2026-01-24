import React from "react";
import { useFormContext } from "react-hook-form";

const Step4 = () => {
  const { watch } = useFormContext();
  const values = watch();

  const formattedValues = {
    email: values.email,
    age: Number(values.age),
    firstName: values.firstName,
    lastName: values.lastName,
    username: values.username,
  };

  return (
    <div className="text-left animate-in zoom-in duration-500">
      <h2 className="text-3xl font-bold mb-4 text-emerald-400 uppercase ">
        Chúc mừng!
      </h2>
      <p className="text-gray-300 mb-4 text-lg">
        Bạn đã hoàn thành {values.username}!
      </p>
      <p className="text-gray-400 mb-2">Đây là thông tin bạn đã nhập:</p>
      <div className="bg-[#0f172a] p-8 rounded-xl border border-gray-800 shadow-2xl">
        <pre className="text-emerald-300 font-mono text-sm leading-6 overflow-auto">
          {JSON.stringify(formattedValues, null, 2)}
        </pre>
      </div>
    </div>
  );
};
export default Step4;
