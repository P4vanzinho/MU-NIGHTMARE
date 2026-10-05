import { useSyncExternalStore } from "react";
import { initialPosts } from "./seed";
import type { BlogState } from "./blog.types";
const key = "nightmare-blog-v1";
function read(): BlogState {
  try {
    const saved = JSON.parse(localStorage.getItem(key) || "null");
    if (saved && Array.isArray(saved.posts)) return saved;
  } catch {
    /* Start from demo posts if stored data is invalid. */
  }
  return { posts: initialPosts };
}
let state = read();
const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
export function updateBlog(change: (state: BlogState) => BlogState) {
  state = change(state);
  localStorage.setItem(key, JSON.stringify(state));
  listeners.forEach((listener) => listener());
}
window.addEventListener("storage", (event) => {
  if (event.key === key || event.key === null) {
    state = read();
    listeners.forEach((listener) => listener());
  }
});
export function useBlog() {
  return useSyncExternalStore(subscribe, () => state);
}
