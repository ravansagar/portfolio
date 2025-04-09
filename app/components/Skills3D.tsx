"use client"

import { motion, useAnimation } from "framer-motion"
import { useEffect, useRef } from "react"
import { Code, Terminal, Layers, Smartphone } from "lucide-react"

const skillCategories = [
  {
    icon: <Code className="w-12 h-12 mb-4 text-blue-500" />,
    title: "Programming Languages",
    skills: ["C", "C++", "Java", "Python", "HTML", "CSS", "JavaScript", "SQL", "C#", "VB", "NodeJS", "PHP"],
  },
  {
    icon: <Terminal className="w-12 h-12 mb-4 text-green-500" />,
    title: "Software Tools",
    skills: ["Jupyter Notebook", "Git", "REST API", "JSON", "Unity", "Oracle 10G", "QASM"],
  },
  {
    icon: <Layers className="w-12 h-12 mb-4 text-yellow-500" />,
    title: "Frameworks & Libraries",
    skills: ["Django", "PyQt", "TensorFlow", "PyTorch", "OpenCV", "React", "Next", "Vite","Material-UI", "Shadcn/ui", "Tailwind", "Qiskit", ],
  },
  {
    icon: <Smartphone className="w-12 h-12 mb-4 text-purple-500" />,
    title: "Development Areas",
    skills: ["Game Development", "Mobile App Development", "Web Development", "Machine Learning", "Data Science", "Quantum Computing"],
  },
]

export default function Skills3D() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl font-bold mb-16 text-center text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Technical Skills
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SkillCard({ category, index }: { category: any; index: number }) {
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
        rotateY: x * 10, 
        rotateX: -y * 10,
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
    <motion.div
      ref={ref}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover-glow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      style={{ perspective: 1000 }}
    >
      <motion.div animate={controls} style={{ transformStyle: "preserve-3d" }}>
        {category.icon}
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{category.title}</h3>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill: string) => (
            <motion.span
              key={skill}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full hover-glow"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 8px rgba(59, 130, 246, 0.6)",
                color: "#00f2ff",
                transition: { duration: 0.2 },
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
