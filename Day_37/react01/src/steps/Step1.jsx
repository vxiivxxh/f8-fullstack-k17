import React from "react";
import FormInput from "../components/FormInput";

export default function Step1() {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-white">Thông tin cá nhân</h2>
      <div className="grid grid-cols-2 gap-6">
        <FormInput
          name="firstName"
          label="Họ"
          placeholder="e.g. John"
        />
        <FormInput name="lastName" label="Tên" placeholder="e.g. Doe" />
        <FormInput name="age" label="Tuổi" type="number" placeholder="e.g. 18" />
        <FormInput name="email" label="Email" placeholder="e.g. john@doe.com" />
      </div>
    </div>
  );
}
