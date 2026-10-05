import type { ReactNode } from "react";
export interface InfiniteConveyorProps<T> {
  items: readonly T[];
  renderItem: (item: T, duplicate: boolean) => ReactNode;
  getKey: (item: T) => string;
  title: string;
  className?: string;
  pauseLabel: string;
  resumeLabel: string;
}
