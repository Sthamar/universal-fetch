# Universal Fetch

`universal-fetch` is a lightweight, universal HTTP fetching library for **React** and **Svelte** projects. It provides a simple `useFetch` hook for React and a helper for Svelte, making API calls easy, type-safe, and reactive.

---

## Features

- Works seamlessly with **React (>=18)** and **Svelte (>=4)**
- TypeScript support with full type definitions
- Minimal bundle size
- Simple and consistent API for fetching data
- Handles loading and error states

---

## Installation

```bash
# Using npm
npm install universal-fetch

# Using yarn
yarn add universal-fetch


# react usage
import React from "react";
import { useFetch } from "universal-fetch";

interface Post {
  id: number;
  title: string;
  body: string;
}

export default function App() {
  const { data, loading, error } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {data?.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}


# svelte usage

<script lang="ts">
  import { svelteFetch } from "universal-fetch";

  let data;
  let loading = true;
  let error = null;

  svelteFetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => data = res)
    .catch(err => error = err)
    .finally(() => loading = false);
</script>

{#if loading}
  <p>Loading...</p>
{:else if error}
  <p>Error: {error.message}</p>
{:else}
  <ul>
    {#each data as post}
      <li>
        <strong>{post.title}</strong>
        <p>{post.body}</p>
      </li>
    {/each}
  </ul>
{/if}


# Contributing
Contributions are welcome! Please fork the repo, create a branch, and open a pull request.

# License
MIT © Amar Shrestha



