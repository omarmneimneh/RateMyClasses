import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {db} from "../config/firebase";
import { onSnapshot, query, where, collection } from "firebase/firestore"
import { Review } from "@/src/lib/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeWords(str: string): string {
  if(!str) return str;
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

