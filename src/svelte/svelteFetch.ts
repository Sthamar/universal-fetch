// svelteFetch.ts
import { writable } from "svelte/store";
import { FetchOptions, fetchClient } from "../fetchClient";

export function createFetchStore<T>(url: string, options: FetchOptions = {}) {
  const { subscribe, set } = writable<{
    data: T | null;
    loading: boolean;
    error: Error | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  const controller = new AbortController();
  const signal = controller.signal;
  let cancelled = false;

  const fetchData = async () => {
    const { retries = 0, ...fetchOptions } = options;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res = await fetch(url, { ...fetchOptions, signal });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = (await res.json()) as T;

        if (!cancelled) set({ data: json, loading: false, error: null });
        break; // success, exit loop
      } catch (err: any) {
        if (err.name === "AbortError") return; // fetch was cancelled
        if (attempt === retries && !cancelled) {
          set({ data: null, loading: false, error: err });
        }
      }
    }
  };

  fetchData();

  return {
    subscribe,
    cancel: () => {
      cancelled = true;
      controller.abort();
    },
  };
}
