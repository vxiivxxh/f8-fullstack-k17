import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  combinedSchema,
  contactInfoSchema,
  usernameSchema,
} from "./schemas/formSchema";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";

const STEPS = [
  {
    id: 1,
    key: "contact-info",
    label: "Contact Info",
    component: Step1,
    fields: ["firstName", "lastName", "email", "age"],
  },
  {
    id: 2,
    key: "username",
    label: "Tên đăng nhập",
    component: Step2,
    fields: ["username"],
  },
  { id: 3, key: "async", label: "Đồng bộ", component: Step3, fields: [] },
  { id: 4, key: "complete", label: "Hoàn thành", component: Step4, fields: [] },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const savedData = JSON.parse(localStorage.getItem("formWizardData")) || {};

  const methods = useForm({
    resolver: zodResolver(combinedSchema),
    mode: "onChange",
    defaultValues: savedData,
  });

  const {
    watch,
    trigger,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const subscription = watch((value) => {
      localStorage.setItem("formWizardData", JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const step = STEPS.find((s) => s.key === hash);
      if (step) {
        setCurrentStep(step.id);
      } else {
        if (hash !== "contact-info") {
          window.location.hash = "contact-info";
        }
        setCurrentStep(1);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNext = async () => {
    const stepConfig = STEPS[currentStep - 1];

    let isValid = true;
    if (stepConfig.fields.length > 0) {
      isValid = await trigger(stepConfig.fields);
    }

    if (isValid) {
      if (currentStep === 3) {
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setIsSubmitting(false);
      }

      const nextStep = STEPS[currentStep];
      if (nextStep) {
        window.location.hash = nextStep.key;
      }
    }
  };

  const handlePrev = () => {
    const prevStep = STEPS[currentStep - 2];
    if (prevStep) {
      window.location.hash = prevStep.key;
    }
  };

  const StepComponent = STEPS[currentStep - 1]?.component || Step1;
  const currentStepConfig = STEPS[currentStep - 1];
  const currentStepFields = currentStepConfig.fields;
  const currentStepValues = watch(currentStepFields);
  const isNextDisabled = currentStepFields.some((field, index) => {
    const value = currentStepValues[index];
    if (value === undefined || value === null || value === "") return true;
    if (errors[field]) return true;
    return false;
  });

  return (
    <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center text-white font-sans">
      <FormProvider {...methods}>
        <div className="w-full max-w-3xl p-8">
          {/* Nội dung */}
          <div className="mb-8 min-h-[300px]">
            <StepComponent />
          </div>

          {/*Điều hướng */}
          <div className="flex justify-between items-center border-t border-gray-700 pt-6">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1 || isSubmitting}
              className={`flex items-center px-6 py-2 rounded-lg border border-gray-600 font-medium transition-colors ${
                currentStep === 1
                  ? "bg-[#2d2d2d] border-transparent text-gray-500 cursor-not-allowed"
                  : "bg-[#2d2d2d] hover:bg-[#3d3d3d] text-gray-300"
              }`}
            >
              PREVIOUS
            </button>
            {currentStep < STEPS.length && (
              <button
                type="button"
                onClick={handleNext}
                disabled={isNextDisabled || isSubmitting}
                className={`flex items-center px-8 py-2 rounded-lg font-medium transition-colors ${
                  isNextDisabled || isSubmitting
                    ? "bg-[#2d2d2d] text-gray-500 cursor-not-allowed shadow-none"
                    : "bg-[#5d5fef] hover:bg-[#4b4dcf] text-white shadow-[0_4px_14px_0_rgba(93,95,239,0.39)]"
                }`}
              >
                {isSubmitting ? "Loading..." : <>NEXT</>}
              </button>
            )}
          </div>
        </div>
      </FormProvider>
    </div>
  );
}
