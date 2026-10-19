import Navbar from "@/Components/Navbar/Navbar";
import "./globals.css";
import { Toaster } from "sonner";
import Footer from "@/Components/Footer/Footer";


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className="min-full-screen flex flex-col">
        <Navbar></Navbar> 

        <main>
          {
            children
          }
        </main>
        <Toaster position="top-right"/>
        <Footer/>
      </body>
    </html>
  );
}
