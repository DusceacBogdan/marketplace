"use client";

import { ThemeProviderProps } from "next-themes/dist/types";
import { Toaster } from "react-hot-toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <Toaster position="top-center" reverseOrder={false} />
      {children}
    </NextThemesProvider>
  );
}
