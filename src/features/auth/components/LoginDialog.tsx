import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "./login-form";

interface LoginDialogProps {
  children: React.ReactNode;
  onLoginSuccess?: () => void;
}

export function LoginDialog({ children, onLoginSuccess }: LoginDialogProps) {
  const [open, setOpen] = useState(false);

  const handleLoginSuccess = () => {
    setOpen(false);
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign In to Unlock Features</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}