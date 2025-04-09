"use client"

import { motion, useAnimation } from "framer-motion"
import { Target } from "lucide-react"
import { useRef, useEffect } from "react"

export default function Objective3D() {
  const ref = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      controls.start({
        rotateY: x * 5,
        rotateX: -y * 5,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      })
    }

    const handleMouseLeave = () => {
      controls.start({
        rotateY: 0,
        rotateX: 0,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      })
    }

    element.addEventListener("mousemove", handleMouseMove)
    element.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      element.removeEventListener("mousemove", handleMouseMove)
      element.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [controls])

  return (
    <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="bg-card rounded-2xl p-8 shadow-lg border border-border hover-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ perspective: 1000 }}
        >
          <motion.div animate={controls} style={{ transformStyle: "preserve-3d" }}>
            <div className="flex items-start gap-6">
              <div className="bg-primary/10 p-3 rounded-full">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Career Objective</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  An enthusiastic and results-driven bachelor's in information technology student, with a strong
                  foundation in game development, mobile application development, and machine learning. Seeking an
                  internship to apply my skills in programming and problem-solving while gaining real-world experience
                  in the tech industry.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
