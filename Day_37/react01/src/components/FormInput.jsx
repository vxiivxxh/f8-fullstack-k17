import React from "react";
import { useFormContext } from "react-hook-form";

export default function FormInput({
  label,
  name,
  type = "text",
  placeholder,
  ...props
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-sm font-semibold text-gray-300">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-[#2d2d2d] border border-[#3d3d3d] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5d5fef] focus:border-transparent placeholder-gray-500 transition-all"
        {...register(name)}
        {...props}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm mt-1 block">
          {errors[name].message}
        </span>
      )}
    </div>
  );
}
