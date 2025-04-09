"use client"

import type React from "react"

import { motion, useMotionValue, useTransform } from "framer-motion"
import { useState } from "react"
import { Github, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Project3DCardProps {
  project: {
    id: number
    title: string
    description: string
    imageUrl: string
    height: number
    width: number
    category: string
    technologies: string[]
    github: string
    live: string
    date: string
  }
}

export default function Project3DCard({ project }: Project3DCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-100, 100], [10, -10])
  const rotateY = useTransform(x, [-100, 100], [-10, 10])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set(e.clientX - centerX)
    y.set(e.clientY - centerY)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: project.id * 0.1 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        x.set(0)
        y.set(0)
      }}
      onMouseMove={handleMouseMove}
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className="bg-background rounded-3xl shadow-lg overflow-hidden border-2 border-transparent hover:border-primary/20 h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 },
        }}
      >
        <div className="relative h-64 overflow-hidden">
          <Image
            src={project.imageUrl || ""}
            height={project.height}
            width={project.width}
            alt={project.title}
            className="object-cover	transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white text-center px-4">{project.description}</p>
          </motion.div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-primary">{project.category}</span>
            <span className="text-sm text-muted-foreground">{project.date}</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full hover-glow">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline hover-trigger transform hover:scale-110 transition-transform duration-300"
            >
              <Github className="w-4 h-4 mr-1" />
              GitHub
            </Link>
            <Link
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline hover-trigger transform hover:scale-110 transition-transform duration-300"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Live Demo
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
