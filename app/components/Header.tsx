"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { MoonIcon, SunIcon, MenuIcon, XIcon } from "lucide-react"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])
  useEffect(() => {
    const handleScroll = () => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mobileMenuOpen])

  return (
    <>
      <motion.header
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-md"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <img
                height={70}
                width={70}
                src="/logo.png"
                className="-my-8"
                alt="Logo"
              />
            </Link>
          </div>

          <div className="hidden lg:flex gap-x-12">
            <Link href="#projects" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">Projects</Link>
            <Link href="#skills" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">Skills</Link>
            <Link href="#education" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">Education</Link>
            <Link href="#contact" className="text-sm font-semibold leading-6 text-foreground hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="flex lg:hidden gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary hover:text-primary/70 transition-colors"
            >
              {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>

          <div className="hidden lg:flex flex-1 justify-end">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full p-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
            )}
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-[40%] h-[50%] bg-background border-r border-border z-40 flex items-center justify-center"
          >
            <div className="flex flex-col items-center space-y-6">
              <Link href="#" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-foreground hover:text-primary transform transition-transform duration-200 hover:scale-[1.05] ">Home</Link>
              <Link href="#projects" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-foreground hover:text-primary transform transition-transform duration-200 hover:scale-[1.05] ">Projects</Link>
              <Link href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-foreground hover:text-primary transform transition-transform duration-200 hover:scale-[1.05]">Skills</Link>
              <Link href="#education" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-foreground hover:text-primary transform transition-transform duration-200 hover:scale-[1.05]">Education</Link>
              <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-base font-semibold text-foreground hover:text-primary transform transition-transform duration-200 hover:scale-[1.05]">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
