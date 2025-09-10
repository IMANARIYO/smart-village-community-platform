
import React from 'react'

// Defining input field props

export interface InputFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    id: string
    label: string
    error?: string
}
// declaring input field component
const InputField: React.FC<InputFieldProps> = ({ id, label, error, ...inputProps }) => {
    return (
        <div className="flex flex-col mb-4 w-full max-w-md">
            <label htmlFor={id} className="mb-1 font-medium">
                {label}
            </label>
            <input
                id={id}
                {...inputProps} // props includes type, name, value, onChange, placeholder, required, etc.
                className="border rounded-lg px-3 py-2 w-full h-14 sm:h-14 md:h-14 focus:outline-none focus:ring-2 focus:ring-[#0EB90E] text-black bg-[#E5F5E5]"
            />
            {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </div>

    )
}

export default InputField

