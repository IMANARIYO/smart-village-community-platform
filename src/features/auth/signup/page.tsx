import { AuthHeader } from "../components/header";
import { SignupForm } from "../components/signup-form";


export default function SignupPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--sv-background-normal)" }}>
      <AuthHeader />
      <main className="flex items-center justify-center px-4 py-12">
        <SignupForm />
      </main>
    </div>
  )
}
