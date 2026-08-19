"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/api/query.client";
import { Toaster } from "@/components/ui/sonner";
import { AuthSessionBootstrap } from "@/modules/auth/components/AuthSessionBootstrap";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthSessionBootstrap />
      {children}
      <Toaster />
    </QueryClientProvider>
  );
}
