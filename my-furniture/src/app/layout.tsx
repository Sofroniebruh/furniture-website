import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer-component";
import Children from "@/components/children";
import { ClerkProvider } from '@clerk/nextjs'
import { CartProvider } from "@/contexts/cartContext";

export const metadata: Metadata = {
  title: "FUTU",
  description: "Furniture for all kind of taste",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode,
}>) {
  return (

    <html lang="en">
      <>
        <ClerkProvider>
          <CartProvider>
            <body
              className={`min-h-screen antialiased sm:mx-7 flex flex-col justify-between`}
            >
              <Children>{children}</Children>
              <Footer></Footer>
            </body>
          </CartProvider>
        </ClerkProvider>
      </>
    </html >
  );
}
