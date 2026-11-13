import Navbar from "@/Components/Navbar/Navbar";
import "./globals.css";
import { Toaster } from "sonner";
import Footer from "@/Components/Footer/Footer";
import Providers from "./provider";
export const metadata = {
  title: {
    default: "FitZone",
    template: "FitZone - %s"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />

          <main>
            {children}
          </main>

          <Toaster position="top-right" />

          <Footer />
        </Providers>
      </body>
    </html>
  );
}