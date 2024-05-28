import { DM_Sans, Karla, Rubik } from "next/font/google";
import "./globals.css";
import Header from "@/app/_components/Header";
import Footer from "./_components/Footer";
import "tw-elements-react/dist/css/tw-elements-react.min.css";
import { Providers } from "./providers";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "memorycard",
  description: "A video game review site",
};

const globalFont = DM_Sans({subsets:['latin'],display:"swap",weight:"300"})

export default function RootLayout({  
  children,
}: {  
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={globalFont.className}>
      <body className="dark bg-gradient-to-r from-sky-700 to-sky-950 text-foreground">        
          <main className="min-h-screen flex flex-col items-center">
            <div className="w-2/3">
              <Header />
              <Providers>              
              <div>{children}</div>
              </Providers>
            </div>
            <Footer />
          </main>        
      </body>
    </html>
  );
}
