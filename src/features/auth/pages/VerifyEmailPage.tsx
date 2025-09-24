import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../authService";
import { extractErrorMessage } from "@/utils/extractErrorMessage";

const verifyEmailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  otp_code: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});

type VerifyEmailFormData = z.infer<typeof verifyEmailSchema>;

export function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<VerifyEmailFormData>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { email: "", otp_code: "" },
  });

  const onSubmit = async (data: VerifyEmailFormData) => {
    setLoading(true);
    try {
      await UserService.verifyEmail(data);
      toast.success("Email verified successfully");
      navigate("/auth/login");
    } catch (error) {
      toast.error(extractErrorMessage(error, "Failed to verify email"));
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const email = form.getValues("email");
    if (!email) {
      toast.error("Please enter your email address first");
      return;
    }

    setResendLoading(true);
    try {
      await UserService.resendOtp({ email });
      toast.success("OTP sent to your email");
    } catch (error) {
      toast.error(extractErrorMessage(error, "Failed to resend OTP"));
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Verify Email</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...form.register("email")}
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="otp_code">OTP Code</Label>
              <Input
                id="otp_code"
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                {...form.register("otp_code")}
              />
              {form.formState.errors.otp_code && (
                <p className="text-sm text-red-600 mt-1">
                  {form.formState.errors.otp_code.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="ghost"
                onClick={handleResendOtp}
                disabled={resendLoading}
                className="text-sm"
              >
                {resendLoading ? "Sending..." : "Resend OTP"}
              </Button>
              <Link to="/auth/login" className="text-sm text-blue-600 hover:underline">
                Back to Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}