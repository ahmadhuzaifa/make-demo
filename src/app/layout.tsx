'use client';

import { ThemeProvider } from '@/components/theme-provider';
import { MainNav } from '@/components/MainNav';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background">
            <header className="border-b">
              <div className="flex h-16 items-center px-8">
                <div className="flex items-center space-x-8">
                  <h1 className="text-xl font-bold">Draper Analytics</h1>
                  <MainNav />
                </div>
              </div>
            </header>
            <main className="p-8">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}