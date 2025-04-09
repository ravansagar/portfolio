"use client"

import type React from "react"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"
import { GraduationCap, BookOpen, Calendar } from "lucide-react"

export default function Education3D() {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          className="text-3xl font-bold mb-16 text-center text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Education & Training
        </motion.h2>

        <Card3D delay={0.1}>
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Bachelor of Science in Information Technology</h3>
              <p className="text-muted-foreground mb-2">
                Mahendra Morang Adarsh Multiple Campus (Tribhuwan University)
              </p>
              <div className="flex items-center text-muted-foreground mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Sept 2025 (Expected)</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Relevant Coursework:</h4>
              <p className="text-muted-foreground">
                Mobile Application Development, Computer Architecture, Introduction to Data Science, Cross Platform
                Development, Web Development, Game Development, Artificial Intelligence, Database Administration,
                Networking, Software Project Management.
              </p>
            </div>
          </div>
        </Card3D>

        <h3 className="text-2xl font-bold mb-8 text-foreground">Workshops & Training</h3>

        <div className="space-y-8">
          <Card3D delay={0.2}>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground">Workshop on Python</h4>
                <p className="text-muted-foreground mb-2">
                  Mahendra Morang Adarsh Multiple Campus, Tribhuwan University
                </p>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>February 2022</span>
                </div>
                <p className="text-muted-foreground">
                  Gained intermediate knowledge of Python, deal with some basic modules, developed frontend and backend
                  using Django library.
                </p>
              </div>
            </div>
          </Card3D>

          <Card3D delay={0.3}>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground">Workshop on Machine Learning</h4>
                <p className="text-muted-foreground mb-2">
                  Mahendra Morang Adarsh Multiple Campus, Tribhuwan University
                </p>
                <div className="flex items-center text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>February 2022</span>
                </div>
                <p className="text-muted-foreground">
                  Focused on machine learning algorithms and deep learning concepts, completing projects using Kaggle
                  datasets on Google Colab.
                </p>
              </div>
            </div>
          </Card3D>

          <Card3D delay={0.4}>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground">Training of Journalism and News Writer</h4>
                <p className="text-muted-foreground mb-2">Save the Children</p>
                <p className="text-muted-foreground">
                  • Achieved basic knowledge about NEWS
                  <br />• Got training on how to collect data and process information
                  <br />• Learned about manners of writing NEWS articles
                </p>
              </div>
            </div>
          </Card3D>
        </div>
      </div>
    </section>
  )
}

function Card3D({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
        z: 10,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      })
    }

    const handleMouseLeave = () => {
      controls.start({
        rotateY: 0,
        rotateX: 0,
        z: 0,
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
    <motion.div
      ref={ref}
      className="mb-16 bg-card rounded-xl p-8 shadow-lg border border-border hover-glow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      style={{ perspective: 1000 }}
    >
      <motion.div animate={controls} style={{ transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </motion.div>
  )
}
