import type { Metadata } from "next";
import { Montserrat } from 'next/font/google'
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <header>
          <div>
            <h1>Username</h1>
            <div>
              <p>LV.<em>5</em></p>
              <svg xmlns="http://www.w3.org/2000/svg" width="87" height="37" viewBox="0 0 87 37" fill="none">
                <path d="M86.5 16.3952V0.5H8.5935L0.5 19.104V36.5H47.1566H77.6882L86.5 16.3952Z" fill="black" stroke="black"/>
              </svg>
            </div>
          </div>
          <div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
