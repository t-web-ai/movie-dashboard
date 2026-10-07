"use client";

import { useEffect, useState } from "react";

export function useIsDark() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const element = document.documentElement;
    const update = () => setIsDark(element.classList.contains("dark"));

    update();
    const observer = new MutationObserver(update);
    observer.observe(element, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return isDark;
}
