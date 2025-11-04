import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names safely with Tailwind conflict resolution.
 * Example: cn("p-2", condition && "bg-red-500")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get a value from localStorage and parse it as JSON.
 * Returns null if the key does not exist or parsing fails.
 */
export const getLocalStorage = (key: string): any => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

/**
 * Set a value in localStorage after stringifying it as JSON.
 */
export const setLocalStorage = (key: string, value: any): void => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Fail silently if storage is unavailable
  }
};