import { useState, useCallback } from "react";

export function useToggle(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle, setValue] as const;
}
