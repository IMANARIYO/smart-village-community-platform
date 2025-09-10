import React, { forwardRef } from "react"
import clsx from "clsx"
import { Button } from "./ui/button"

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "neutral"
  | "outline"
  | "ghost"
  | "custom"

type ButtonSize = "sm" | "md" | "lg"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const MyButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      startIcon,
      endIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        "bg-primary-normal hover:bg-primary-normal-hover active:bg-primary-normal-active text-white",
      secondary:
        "bg-secondary-normal hover:bg-secondary-normal-hover active:bg-secondary-normal-active text-black",
      accent:
        "bg-accent-normal hover:bg-accent-normal-hover active:bg-accent-normal-active text-white",
      success:
        "bg-success-normal hover:bg-success-normal-hover active:bg-success-normal-active text-white",
      warning:
        "bg-warning-normal hover:bg-warning-normal-hover active:bg-warning-normal-active text-black",
      error:
        "bg-error-normal hover:bg-error-normal-hover active:bg-error-normal-active text-white",
      neutral:
        "bg-neutral-normal hover:bg-neutral-normal-hover active:bg-neutral-normal-active text-white",

      outline:
        "border border-neutral-normal text-neutral-normal hover:bg-neutral-light hover:text-neutral-dark",
      ghost:
        "bg-transparent text-neutral-normal hover:bg-neutral-light active:bg-neutral-light-active",

      custom: "",
    }

    const sizeClasses: Record<ButtonSize, string> = {
      sm: "px-3 py-1.5 text-sm rounded-radius",
      md: "px-4 py-2 text-base rounded-radius",
      lg: "px-6 py-3 text-lg rounded-radius",
    }

    return (
      <Button
        ref={ref}
        className={clsx(
          "inline-flex items-center justify-center gap-2 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading && (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
        )}

        {!isLoading && startIcon && (
          <span className="flex-shrink-0">{startIcon}</span>
        )}

        {isLoading ? "Loading..." : children}

        {!isLoading && endIcon && (
          <span className="flex-shrink-0">{endIcon}</span>
        )}
      </Button>
    )
  }
)

MyButton.displayName = "MyButton"

export default MyButton
