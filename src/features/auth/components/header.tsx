import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AuthHeader() {
  return (
    <header className="flex items-center justify-between p-6 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold" style={{ color: "var(--sv-primary-normal)" }}>
          Smart Village
        </h1>
      </div>
      <Button variant="ghost" size="sm" className="text-muted-foreground hover:bg-muted">
        <Globe className="w-4 h-4 mr-2" />
        English
      </Button>
    </header>
  )
}
