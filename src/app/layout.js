import "./globals.css";
import { Ubuntu, Inter } from "next/font/google";
import ReactTanstackProvider from "@/utils/Provider/ReactTanstackProvider";
import AuthProvider from "@/utils/Provider/AuthProvider";
import { Toaster } from "react-hot-toast";

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

const inter = Inter({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "YouthLink Tech.",
  description:
    "At YouthLink, we are the architects of digital transformation, providing a suite of services that encompass internet solutions, software development, and digital marketing.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${ubuntu.className} bg-black max-sm:text-sm`}>
        <ReactTanstackProvider>
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </ReactTanstackProvider>
      </body>
    </html>
  );
}
