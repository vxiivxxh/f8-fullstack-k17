import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { loginRequest } from "../services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm({ onSuccess }) {
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data, variables) => {
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);

      const mockUser = {
        name: variables.email.split("@")[0],
        email: variables.email,
        avatar: "https://i.pravatar.cc/150",
      };

      localStorage.setItem("user", JSON.stringify(mockUser));

      if (onSuccess) {
        onSuccess(mockUser);
      }

      reset();
      setLoginError(null);
    },
    onError: (err) => {
      setLoginError(err.message);
    },
  });

  const onSubmit = (data) => {
    setLoginError(null);
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
      {loginError && (
        <div className="bg-red-50 text-red-500 text-sm p-3 rounded-md border border-red-200 text-center font-medium">
          {loginError}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email address:</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password:</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-11 text-base"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing in..." : "Sign In"}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <span className="text-primary font-bold cursor-pointer hover:underline">
          Sign up
        </span>
      </div>
    </form>
  );
}
