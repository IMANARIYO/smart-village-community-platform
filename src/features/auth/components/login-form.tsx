"use client"

import type React from "react"

import { useState } from "react"

import { Link } from "react-router-dom"
import { Label } from "../../../components/ui/label"
import { Input } from "../../../components/ui/input"
import { Checkbox } from "../../../components/ui/checkbox"
import { Button } from "../../../components/ui/button"

export function LoginForm() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login submitted:", formData)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold mb-2" style={{ color: "var(--sv-primary-normal)" }}>
            Welcome Back
          </h2>
          <p className="text-muted-foreground">Sign in to your village account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="text-foreground">
              Phone Number
            </Label>
            <Input
              id="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
              />
              <Label htmlFor="rememberMe" className="text-sm text-muted-foreground">
                Remember me
              </Label>
            </div>
            <Link to="/auth/forgot-password" className="text-sm text-muted-foreground hover:text-foreground">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full text-white" style={{ backgroundColor: "var(--sv-primary-normal)" }}>
            Sign In
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
  )
}
