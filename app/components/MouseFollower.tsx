"use client"

import { useEffect, useState } from "react"
import { motion, Variants } from "framer-motion"

export default function MouseFollower() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState<"default" | "hover">("default")

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hover-trigger")
      ) {
        setCursorVariant("hover")
      } else {
        setCursorVariant("default")
      }
    }

    window.addEventListener("mousemove", mouseMove)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", mouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  const variants: Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      mixBlendMode: "normal" as const,
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      height: 64,
      width: 64,
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      mixBlendMode: "difference" as const,
    },
  }

  return (
    <motion.div
      className="cursor-dot fixed top-0 left-0 rounded-full pointer-events-none z-50 border-2 border-primary hidden md:block"
      variants={variants}
      animate={cursorVariant}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    />
  )
}