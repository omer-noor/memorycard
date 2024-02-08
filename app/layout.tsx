import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "./components/Footer";
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



export default function RootLayout({  
  children,
}: {  
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="dark bg-background text-foreground">        
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
