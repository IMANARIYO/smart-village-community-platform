
import { LanguageSelector } from "@/components/LanguageSelector"
export function AuthHeader() {
  return (
    <header className="flex items-center justify-between p-6 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold" style={{ color: "var(--sv-primary-normal)" }}>
          Smart Village
        </h1>
      </div>
      <LanguageSelector />
    </header>
  )
}
