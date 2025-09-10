import { StarHalfIcon } from "lucide-react";
import MyButton from "./MyButton";

export function ButtonShowcase() {
    return (
        <div className="space-y-4 p-4">
            {/* Variants */}
            <MyButton variant="primary">Primary</MyButton>
            <MyButton variant="secondary">Secondary</MyButton>
            <MyButton variant="outline">Outline</MyButton>
            <MyButton variant="ghost">Ghost</MyButton>
            <MyButton variant="success">Success</MyButton>

            <MyButton variant="warning">Warning</MyButton>
            <MyButton variant="custom" className="bg-[#2E7D32] text-white">
                Custom Green
            </MyButton>

            {/* Sizes */}
            <div className="flex gap-2">
                <MyButton size="sm">Small</MyButton>
                <MyButton size="md">Medium</MyButton>
                <MyButton size="lg">Large</MyButton>
            </div>

            {/* With icons */}
            <MyButton startIcon={<span><StarHalfIcon /></span>}>With Icon</MyButton>
            <MyButton endIcon={<span>➡️</span>}>Next</MyButton>

            {/* Full width */}
            <MyButton className="w-full">Full Width</MyButton>

            {/* Loading */}
            <MyButton isLoading>Loading Button</MyButton>

            {/* Disabled */}
            <MyButton disabled>Disabled</MyButton>
        </div>
    );
}
