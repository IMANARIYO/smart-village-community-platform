interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  stepLabel: string
}

export function ProgressIndicator({ currentStep, totalSteps, stepLabel }: ProgressIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      <div className="flex items-center gap-4">
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  isActive ? "text-black" : isCompleted ? "text-white" : "bg-muted text-muted-foreground"
                }`}
                style={{
                  backgroundColor: isActive
                    ? "var(--sv-secondary-normal)"
                    : isCompleted
                      ? "var(--sv-primary-normal)"
                      : undefined,
                }}
              >
                {stepNumber}
              </div>
              {stepNumber < totalSteps && (
                <div
                  className="w-12 h-0.5 mx-2"
                  style={{
                    backgroundColor:
                      stepNumber < currentStep ? "var(--sv-primary-normal)" : "var(--sv-secondary-normal)",
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
      <p className="text-sm text-muted-foreground">
        Step {currentStep} of {totalSteps}: {stepLabel}
      </p>
    </div>
  )
}
