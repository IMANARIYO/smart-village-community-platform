/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import UserService from "../authService";
import type { ResetRequestPayload } from "../authTypes";

interface FormData {
    email: string;
}

export default function ForgotPasswordPage() {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        setLoading(true);
        try {
            const payload: ResetRequestPayload = { email: data.email };
            const res = await UserService.requestPasswordReset(payload);

            if (res.success) {
                toast.success("Check your email for reset instructions");
            } else {
                toast.error(res.message || "Failed to send reset email");
            }
        } catch (err: any) {
            console.error(err);
            toast.error("An error occurred while requesting password reset");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md p-8">
                <h1 className="text-2xl font-semibold mb-4 text-center">
                    Forgot Password
                </h1>
                <p className="text-sm text-muted-foreground mb-6 text-center">
                    Enter your email to receive password reset instructions.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please enter a valid email",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs">{errors.email.message}</p>
                        )}
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Sending..." : "Send Reset Link"}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
