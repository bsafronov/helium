import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { Toaster } from "~/components/ui/toaster";
import { ThemeProvider } from "~/providers/theme.provider";
import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "./_components/navbar/navbar";
import { Header } from "./_components/header/header";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Helium",
  description: "Helium by Safronov",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable}`}>
        <ThemeProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <Toaster />
            <div className="container flex border-x">
              <Navbar />
              <div className="flex grow flex-col">
                <Header />
                <main className="grow">{children}</main>
              </div>
            </div>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
