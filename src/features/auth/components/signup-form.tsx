"use client"

import { useState } from "react"

import { ProgressIndicator } from "./progress-indicator"
import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Button } from "../../../components/ui/button"

interface FormData {
  firstName: string
  lastName: string
  gender: string
  idNumber: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

export function SignupForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    gender: "",
    idNumber: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  const getStepLabel = () => {
    switch (currentStep) {
      case 1:
        return "Personal Information"
      case 2:
        return "Contact Information"
      case 3:
        return "Account Information"
      default:
        return ""
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--sv-primary-normal)" }}>
            Join Your Village
          </h2>
          <p className="text-muted-foreground">Sign up to your village account</p>
        </div>

        <ProgressIndicator currentStep={currentStep} totalSteps={3} stepLabel={getStepLabel()} />

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
                  value={formData.firstName}
                  onChange={(e) => updateFormData("firstName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => updateFormData("lastName", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-foreground">
                Gender
              </Label>
              <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber" className="text-foreground">
                ID Number
              </Label>
              <Input
                id="idNumber"
                placeholder="Enter your ID number"
                value={formData.idNumber}
                onChange={(e) => updateFormData("idNumber", e.target.value)}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-foreground">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData("phoneNumber", e.target.value)}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-foreground">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={(e) => updateFormData("phoneNumber", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create password"
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => updateFormData("confirmPassword", e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="flex gap-4 mt-8">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              className="flex-1 bg-transparent"
              style={{
                borderColor: "var(--sv-primary-normal)",
                color: "var(--sv-primary-normal)",
              }}
            >
              Back
            </Button>
          )}
          <Button
            onClick={currentStep === 3 ? handleSubmit : handleNext}
            className="flex-1 text-white"
            style={{ backgroundColor: "var(--sv-primary-normal)" }}
          >
            {currentStep === 3 ? "Create Account" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  )
}
