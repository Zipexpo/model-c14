import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/ui/Nav/Nav";
import { AuthProvider } from "./Provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "c14",
  description: "c14 model-report",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex-col`}
      >
        <AuthProvider>
          {/* <div className="flex-none">
            <Nav />
          </div> */}
          <div className="grow">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
