import { clsx, type ClassValue } from "clsx";
import { Key } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Tag = {
  id: Key | null | undefined;
  path: string | Blob | undefined;
  name: string;
};

export enum AlertType {
  "success",
  "danger",
}
