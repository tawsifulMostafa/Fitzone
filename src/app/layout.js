import Navbar from "@/Components/Navbar/Navbar";
import "./globals.css";
import { Toaster } from "sonner";


export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body>
        <Navbar></Navbar> 

        <main>
          {
            children
          }
        </main>
        <Toaster/>
      </body>
    </html>
  );
}
