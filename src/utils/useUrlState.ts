import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

export function useUrlState() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = useCallback(
    (key: string, value?: string | number | null) => {
      const params = new URLSearchParams(searchParams.toString());

      if (value === undefined || value === "" || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }

      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  return {
    get: (key: string) => searchParams.get(key),
    set: setParam,
    all: searchParams,
  };
}
