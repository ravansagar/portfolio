import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/app/components/ThemeProvider"
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import type React from "react"
import { Toaster } from "sonner"
import MouseFollower from "@/app/components/MouseFollower"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sagar Kumar Thakur | IT Student & Developer",
  description: "Personal portfolio of Sagar Kumar Thakur - IT Student, Developer, and Tech Enthusiast",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <MouseFollower />
          <Header />
          <main>{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
