"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";


interface MobileSheetProps {
    title?: string;
    children: React.ReactNode;
}

export function MobileSheet({ title = "Menu", children }: MobileSheetProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    className=" text-white hover:text-green-600 md:hidden p-2 bg-primary-dark"
                >
                    <Menu className="w-6 h-6" />
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-64 sm:w-80 max-h-fit p-4 rounded-md">
                <SheetHeader>
                    <SheetTitle className="text-lg font-bold text-primary-dark">{title}</SheetTitle>
                </SheetHeader>

                <div className="mt-6 flex flex-col space-y-4">{children}</div>
            </SheetContent>
        </Sheet>
    );
}
