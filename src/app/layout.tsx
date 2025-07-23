import "@/app/global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        inter.className,
        "selection:bg-slate-900 selection:text-white"
      )}
    >
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <DocsLayout tree={source.pageTree} {...baseOptions}>
            {children}
            <Toaster richColors expand toastOptions={{ duration: 3000 }} />
          </DocsLayout>
        </RootProvider>
      </body>
    </html>
  );
}
