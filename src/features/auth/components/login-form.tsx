/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";

import UserService from "../authService";
import type { LoginPayload } from "../authTypes";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

interface FormValues {
  phoneNumber: string;
  password: string;
  rememberMe: boolean;
}

export function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: { phoneNumber: "", password: "", rememberMe: false },
  });

  const phoneNumber = watch("phoneNumber");
  useEffect(() => {
    const savedPhone = localStorage.getItem("phoneNumber");
    const savedPassword = localStorage.getItem("password");

    if (savedPhone) setValue("phoneNumber", savedPhone);
    if (savedPassword) setValue("password", savedPassword);
    if (savedPhone && savedPassword) setValue("rememberMe", true);
  }, [setValue]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    setError(null);

    try {

      const payload: LoginPayload = {
        phone_number: data.phoneNumber,
        password: data.password,
      };

      const response = await UserService.login(payload);

      if (response.success) {
        console.log("Login successful:", response.data);


        if (data.rememberMe) {
          localStorage.setItem("phoneNumber", data.phoneNumber);
          localStorage.setItem("password", data.password);
        }

        navigate("/dashboard");
      } else {
        setError(response.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--sv-primary-normal)" }}>
            Welcome Back
          </h2>
          <p className="text-muted-foreground">Sign in to your village account</p>
        </div>

        {error && (
          <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-foreground">
              Phone Number
            </Label>
            <PhoneInput
              international
              defaultCountry="RW"
              value={phoneNumber}
              onChange={(value) => setValue("phoneNumber", value || "")}
              placeholder="Enter phone number"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            />
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 p-1 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                {...register("rememberMe")}
              />
              <Label htmlFor="rememberMe" className="text-sm text-muted-foreground">
                Remember me
              </Label>
            </div>
            <Link to="/auth/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full text-white" style={{ backgroundColor: "var(--sv-primary-normal)" }} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="hover:underline" style={{ color: "var(--sv-primary-normal)" }}>
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
