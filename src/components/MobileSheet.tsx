"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetTrigger, SheetClose } from "./ui/sheet";
import { Button } from "./ui/button";

interface MobileSheetProps {
    title?: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export function MobileSheet({
    title = "Menu",
    description = "",
    children,
    footer,
}: MobileSheetProps) {
    return (
        <Sheet>

            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-white hover:text-green-600 md:hidden p-2 bg-primary-dark"
                >
                    <Menu className="w-6 h-6" />
                </Button>
            </SheetTrigger>

            {/* Sheet Content */}
            <SheetContent
                side="right"
                className="w-64 sm:w-80 h-[90vh] p-4 rounded-md mt-16 flex flex-col justify-between"
            >
                {/* Header */}
                <SheetHeader className="bg-accent rounded-md">
                    <SheetTitle className="text-lg font-bold text-primary-dark bg-secondary">{title}</SheetTitle>
                    {description && <SheetDescription className="text-sm text-gray-500">{description}</SheetDescription>}
                </SheetHeader>

                {/* Body */}
                <div className="flex-1 overflow-y-auto mt-2">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <SheetFooter className="flex justify-end gap-2">
                        {footer}
                        <SheetClose asChild>
                            <Button variant="outline">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}
