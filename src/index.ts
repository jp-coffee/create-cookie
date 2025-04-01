import { useCallback, useEffect, useState } from "react";

type CookieOptions = {
  expires?: Date | number;
  path?: string;
};

type CookieAPI<T> = {
  get: () => T;
  set: (value: T, options?: CookieOptions) => void;
  reset: () => void;
  hasValue: () => boolean;
};

const useFunction = <T>(name: string, initialValue: T, options?: CookieOptions): CookieAPI<T> => {
  const [value, setStateValue] = useState<T>(() => {
    if (typeof document === "undefined") return initialValue;
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];
    if (cookieValue !== undefined) {
      try {
        return JSON.parse(decodeURIComponent(cookieValue)) as T;
      } catch {
        console.warn(`Failed to parse cookie value for key "${name}". Falling back to raw value.`);
        return decodeURIComponent(cookieValue) as T;
      }
    }
    return initialValue;
  });

  const get = useCallback(() => value, [value]);

  const set = useCallback(
    (newValue: T, customOptions?: CookieOptions) => {
      setStateValue(newValue);
      if (typeof document !== "undefined") {
        const serializedValue =
          typeof newValue === "string" ? newValue : JSON.stringify(newValue);
        const cookieParts = [`${name}=${encodeURIComponent(serializedValue)}`];
        const expiresOption = customOptions?.expires ?? options?.expires;
        if (expiresOption instanceof Date) {
          cookieParts.push(`expires=${expiresOption.toUTCString()}`);
        } else if (typeof expiresOption === "number") {
          const date = new Date();
          date.setTime(date.getTime() + expiresOption * 24 * 60 * 60 * 1000);
          cookieParts.push(`expires=${date.toUTCString()}`);
        }
        const path = customOptions?.path ?? options?.path ?? "/";
        cookieParts.push(`path=${path}`);
        document.cookie = cookieParts.join("; ");
      }
    },
    [name, options]
  );

  const reset = useCallback(() => {
    setStateValue(initialValue);
    if (typeof document !== "undefined") {
      const path = options?.path ?? "/";
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
    }
  }, [name, initialValue, options]);

  const hasValue = useCallback(() => value !== "", [value]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1];
    if (cookieValue !== undefined) {
      try {
        const parsedValue = JSON.parse(decodeURIComponent(cookieValue)) as T;
        if (JSON.stringify(parsedValue) !== JSON.stringify(value)) {
          setStateValue(parsedValue);
        }
      } catch {
        console.warn(`Failed to parse cookie value for key "${name}". Falling back to raw value.`);
        const rawValue = decodeURIComponent(cookieValue) as T;
        if (rawValue !== value) {
          setStateValue(rawValue);
        }
      }
    } else {
      const serializedValue =
        typeof initialValue === "string" ? initialValue : JSON.stringify(initialValue);
      const cookieParts = [`${name}=${encodeURIComponent(serializedValue)}`];
      const expiresOption = options?.expires;
      if (expiresOption instanceof Date) {
        cookieParts.push(`expires=${expiresOption.toUTCString()}`);
      } else if (typeof expiresOption === "number") {
        const date = new Date();
        date.setTime(date.getTime() + expiresOption * 24 * 60 * 60 * 1000);
        cookieParts.push(`expires=${date.toUTCString()}`);
      }
      const path = options?.path ?? "/";
      cookieParts.push(`path=${path}`);
      document.cookie = cookieParts.join("; ");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, options, initialValue]);

  return {
    get,
    set,
    reset,
    hasValue,
  };
};

export { useFunction as createCookie };