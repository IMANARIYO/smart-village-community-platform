import { useEffect, useState } from "react";

export function useActiveSection(ids: string[]) {
    const [active, setActive] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(entry => entry.isIntersecting);
                if (visibleEntries.length > 0) {
                    const mostVisible = visibleEntries.reduce((prev, current) =>
                        current.intersectionRatio > prev.intersectionRatio ? current : prev
                    );
                    setActive(mostVisible.target.id);
                }
            },
            {
                rootMargin: "-20% 0px -70% 0px",
                threshold: [0, 0.1, 0.25, 0.5, 0.75, 1]
            }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [ids]);

    return active;
}