import { AuthHeader } from "../components/header";
import { LoginForm } from "../components/login-form";


export default function LoginPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--sv-background-normal)" }}>
      <AuthHeader />
      <main className="flex items-center justify-center px-4 py-12">
        <LoginForm />
      </main>
    </div>
  )
}
