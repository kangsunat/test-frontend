"use client";

import { useEffect, useState } from "react";

export default function useDebounce<T>(
  value: T,
  props?: { delay?: number; cb?: () => void },
) {
  const [debounceValue, setDebaounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebaounceValue(value);
      props?.cb?.();
    }, props?.delay ?? 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value, props]);

  return debounceValue;
}
