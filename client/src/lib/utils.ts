import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const downloadFile = async (resumeUrl: string) => {
  const response = await fetch(resumeUrl);
  const blob = await response.blob();
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = resumeUrl?.split("/")?.pop()?.split("?")?.[0] || "";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
