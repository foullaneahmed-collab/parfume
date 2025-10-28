// Cache utility functions for optimized performance

/**
 * Simple in-memory cache for product data
 */
const cache = new Map<string, { data: any; timestamp: number }>();

const CACHE_DURATION = 1000 * 60 * 60 * 24; // 1 day

export function getCachedData<T>(key: string): T | null {
  const cached = cache.get(key);

  if (!cached) return null;

  const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;

  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return cached.data as T;
}

export function setCachedData<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}

export function clearCache(): void {
  cache.clear();
}

/**
 * Memoize expensive calculations
 */
export function memoize<T extends (...args: any[]) => any>(fn: T): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  }) as T;
}
