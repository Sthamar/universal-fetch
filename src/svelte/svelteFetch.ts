// svelteFetch.ts
import { writable } from "svelte/store";
import { fetchClient, FetchOptions } from "../fetchClient";

export function createFetchStore<T>(url: string, options?: FetchOptions) {
  const { subscribe, set } = writable<{ data: T | null; loading: boolean; error: Error | null }>({
    data: null,
    loading: true,
    error: null,
  });

  fetchClient<T>(url, options)
    .then(data => set({ data, loading: false, error: null }))
    .catch(err => set({ data: null, loading: false, error: err }));

  return { subscribe };
}
