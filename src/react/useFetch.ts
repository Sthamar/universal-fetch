import { useEffect, useState } from "react";
import { fetchClient, FetchOptions } from "../fetchClient";

export function useFetch<T>(url: string, options: FetchOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController(); // For cancellation
    const signal = controller.signal;

    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const { retries = 0, ...fetchOptions } = options;

      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const res = await fetch(url, { ...fetchOptions, signal });
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          const json = (await res.json()) as T;

          if (!cancelled) setData(json);
          break; // Success: exit retry loop
        } catch (err: any) {
          if (err.name === "AbortError") return; // Request was cancelled
          if (attempt === retries && !cancelled) setError(err);
        }
      }

      if (!cancelled) setLoading(false);
    };

    fetchData();

    return () => {
      cancelled = true;
      controller.abort(); // Cancel ongoing fetch on unmount
    };
  }, [url, JSON.stringify(options)]);

  return { data, loading, error };
}
