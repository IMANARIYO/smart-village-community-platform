

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
                    className="text-white hover:text-primary md:hidden p-2 bg-primary-dark min-h-[44px] min-w-[44px]"
                >
                    <Menu className="w-5 h-5" />
                </Button>
            </SheetTrigger>

            {/* Sheet Content */}
            <SheetContent
                side="right"
                className="w-[85vw] max-w-sm h-full p-3 sm:p-4 flex flex-col"
            >
                {/* Header */}
                <SheetHeader className="bg-accent rounded-md p-3 mb-4">
                    <SheetTitle className="text-base sm:text-lg font-bold text-primary-dark">{title}</SheetTitle>
                    {description && <SheetDescription className="text-xs sm:text-sm text-muted-foreground mt-1">{description}</SheetDescription>}
                </SheetHeader>

                {/* Body */}
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <SheetFooter className="flex flex-col sm:flex-row justify-end gap-2 mt-4 pt-4 border-t">
                        {footer}
                        <SheetClose asChild>
                            <Button variant="outline" className="w-full sm:w-auto">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
}
