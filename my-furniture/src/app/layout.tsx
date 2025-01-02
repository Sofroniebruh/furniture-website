import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar-component";
import Footer from "@/components/footer-component";
import { Toaster } from "@/components/ui/sonner";
import { CartProvider } from "@/contexts/cartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FUTU",
  description: "Furniture for all kind of taste",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <>
        <CartProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased my-6 sm:mx-7 mx-4 flex flex-col`}
          >
            <Navbar></Navbar>
            <Toaster />
            {children}
            <Footer></Footer>
          </body>
        </CartProvider>
      </>
    </html>
  );
}
