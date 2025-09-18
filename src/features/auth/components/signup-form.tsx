/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

import { ProgressIndicator } from "./progress-indicator";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select";
import { Button } from "../../../components/ui/button";
import { useLocationSelector } from "../../homePages/hooks/useLocationSelector";
import type { RegisterPayload } from "../authTypes";
import UserService from "../authService";


interface FormData {
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "";
  idNumber: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  province: string;
  district: string;
  sector: string;
  cell: string;
  village: string;
}

export function SignupForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const location = useLocationSelector();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { errors },
    setValue,
    getValues
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      idNumber: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      province: "",
      district: "",
      sector: "",
      cell: "",
      village: ""
    },
    mode: "onChange"
  });

  // Step validation schemas
  const stepValidations = {
    1: ["firstName", "lastName", "gender", "idNumber"],
    2: ["phoneNumber", "province", "district", "sector", "cell", "village"],
    3: ["password", "confirmPassword"]
  };

  const validateStep1 = async () => {
    const isValid = await trigger(stepValidations[1] as any);
    if (isValid) {
      setCurrentStep(2);
    }
  };

  const validateStep2 = async () => {
    const isValid = await trigger(stepValidations[2] as any);
    if (isValid) {
      setCurrentStep(3);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);

    // Final validation
    const isValid = await trigger();
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const payload: RegisterPayload = {
        phone_number: data.phoneNumber,
        password: data.password,
        confirm_password: data.confirmPassword,
        person: {
          first_name: data.firstName,
          last_name: data.lastName,
          national_id: parseInt(data.idNumber),
          gender: data.gender as "male" | "female",
        },
        location_id: location.village?.village_id || "",
      };

      const response = await UserService.register(payload);

      if (response.success) {
        console.log("Registration successful:", response.data);

        localStorage.setItem("phoneNumber", data.phoneNumber);
        localStorage.setItem("password", data.password);
        navigate("/auth/login");
      } else {
        setError(response.message || "Registration failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const getStepLabel = () => {
    switch (currentStep) {
      case 1:
        return "Personal Information";
      case 2:
        return "Contact Information";
      case 3:
        return "Account Information";
      default:
        return "";
    }
  };

  // Watch password for confirmation validation
  const password = watch("password");

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--sv-primary-normal)" }}>
            Join Your Village
          </h2>
          <p className="text-muted-foreground">Sign up to your village account</p>
        </div>

        {error && (
          <div className="bg-destructive/15 text-destructive p-3 rounded-md mb-4 text-sm">
            {error}
          </div>
        )}

        <ProgressIndicator currentStep={currentStep} totalSteps={3} stepLabel={getStepLabel()} />

        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-foreground">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters"
                      }
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-foreground">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters"
                      }
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-foreground">
                  Gender
                </Label>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <p className="text-red-500 text-xs">{errors.gender.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="idNumber" className="text-foreground">
                  ID Number
                </Label>
                <Input
                  id="idNumber"
                  placeholder="Enter your ID number"
                  {...register("idNumber", {
                    required: "ID number is required",
                    pattern: {
                      value: /^\d{16}$/,
                      message: "ID number must be exactly 16 digits"
                    }
                  })}
                />
                {errors.idNumber && (
                  <p className="text-red-500 text-xs">{errors.idNumber.message}</p>
                )}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-foreground">
                  Phone Number
                </Label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    validate: (value) => {
                      if (!value) return "Phone number is required";

                      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
                      return phoneRegex.test(value) || "Please enter a valid phone number";
                    }
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      international
                      defaultCountry="RW"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Enter phone number"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">{errors.phoneNumber.message}</p>
                )}
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Controller
                    name="province"
                    control={control}
                    rules={{ required: "Province is required" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          location.setProvince(value);
                          location.resetLowerLevels("province");
                          setValue("district", "");
                          setValue("sector", "");
                          setValue("cell", "");
                          setValue("village", "");
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Province" />
                        </SelectTrigger>
                        <SelectContent>
                          {location.provinces.map((p) => (
                            <SelectItem key={p} value={p}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.province && (
                    <p className="text-red-500 text-xs">{errors.province.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Controller
                    name="district"
                    control={control}
                    rules={{ required: "District is required" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          location.setDistrict(value);
                          location.resetLowerLevels("district");
                          setValue("sector", "");
                          setValue("cell", "");
                          setValue("village", "");
                        }}
                        disabled={!getValues("province")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent>
                          {location.districts.map((d) => (
                            <SelectItem key={d} value={d}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.district && (
                    <p className="text-red-500 text-xs">{errors.district.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Controller
                    name="sector"
                    control={control}
                    rules={{ required: "Sector is required" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          location.setSector(value);
                          location.resetLowerLevels("sector");
                          setValue("cell", "");
                          setValue("village", "");
                        }}
                        disabled={!getValues("district")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Sector" />
                        </SelectTrigger>
                        <SelectContent>
                          {location.sectors.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.sector && (
                    <p className="text-red-500 text-xs">{errors.sector.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Controller
                    name="cell"
                    control={control}
                    rules={{ required: "Cell is required" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          location.setCell(value);
                          location.resetLowerLevels("cell");
                          setValue("village", "");
                        }}
                        disabled={!getValues("sector")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Cell" />
                        </SelectTrigger>
                        <SelectContent>
                          {location.cells.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.cell && (
                    <p className="text-red-500 text-xs">{errors.cell.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Controller
                    name="village"
                    control={control}
                    rules={{ required: "Village is required" }}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={(selectedVillageName) => {
                          field.onChange(selectedVillageName);
                          const selectedVillage = location.villages.find((v) => v.village === selectedVillageName) || null;
                          location.setVillage(selectedVillage);
                        }}
                        disabled={!getValues("cell")}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Village" />
                        </SelectTrigger>
                        <SelectContent>
                          {location.villages.map((v) => (
                            <SelectItem key={v.village_id} value={v.village}>
                              {v.village}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.village && (
                    <p className="text-red-500 text-xs">{errors.village.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 6, message: "Password must be at least 6 characters" },
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-sm text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm your password"
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) => value === password || "Passwords do not match",
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-2 text-sm text-gray-500"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? "Hide" : "Show"}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="flex-1 bg-transparent"
                style={{
                  borderColor: "var(--sv-primary-normal)",
                  color: "var(--sv-primary-normal)",
                }}
                disabled={loading}
              >
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={currentStep === 1 ? validateStep1 : validateStep2}
                className="flex-1 text-white"
                style={{ backgroundColor: "var(--sv-primary-normal)" }}
                disabled={loading}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="flex-1 text-white"
                style={{ backgroundColor: "var(--sv-primary-normal)" }}
                disabled={loading}
              >
                {loading ? "Processing..." : "Create Account"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}