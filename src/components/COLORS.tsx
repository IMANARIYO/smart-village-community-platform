"use client";



const colorGroups = [
    "primary",
    "secondary",
    "accent",
    "background",
    "neutral",
    "success",
    "info",
    "warning",
    "error",
];

const shades = ["light", "normal", "dark", "darker"];

const svColors = ["sv-primary", "sv-secondary", "sv-background", "sv-neutral"];

export default function ColorVisualizer() {
    return (
        <div className="p-6 space-y-8 bg-transparent">
            {/* Main colors */}
            {colorGroups.map((group) => (
                <div key={group}>
                    <h2 className="text-lg font-bold mb-2">{group.toUpperCase()}</h2>
                    <div className="grid grid-cols-4 gap-4">
                        {shades.map((shade) => (
                            <div
                                key={shade}
                                className="p-4 rounded-lg text-white flex flex-col items-center justify-center"
                                style={{
                                    backgroundColor: `var(--color-${group}-${shade})`,
                                    color:
                                        shade === "light" ? "black" : "white",
                                }}
                            >
                                <span className="text-sm font-medium">{shade}</span>
                                <span className="text-xs mt-1">
                                    {getComputedStyle(document.documentElement).getPropertyValue(
                                        `--color-${group}-${shade}`
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}


            {svColors.map((group) => (
                <div key={group}>
                    <h2 className="text-lg font-bold mb-2">{group.toUpperCase()}</h2>
                    <div className="grid grid-cols-3 gap-4">
                        {["light", "", "dark"].map((shade) => {
                            const varName = shade ? `--color-${group}-${shade}` : `--color-${group}`;
                            return (
                                <div
                                    key={shade}
                                    className="p-4 rounded-lg text-white flex flex-col items-center justify-center"
                                    style={{
                                        backgroundColor: `var(${varName})`,
                                        color: shade === "light" ? "black" : "white",
                                    }}
                                >
                                    <span className="text-sm font-medium">{shade || "normal"}</span>
                                    <span className="text-xs mt-1">
                                        {getComputedStyle(document.documentElement).getPropertyValue(varName)}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
