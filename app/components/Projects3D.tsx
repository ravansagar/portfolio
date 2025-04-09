"use client"

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Link from "next/link";
import Project3DCard from "./Project3DCard";

const projects = [
  {
    id: 1,
    title: "Online Card Game: BRAY",
    description:
      "Developed an online multiplayer card game using C# and Unity, integrated Photon Unity Networking for real-time gameplay.",
    imageUrl: "/bray.jpeg",
    height: 600,
    width: 800,
    category: "Game Development",
    technologies: ["C#", "Unity", "Photon Unity Networking"],
    github: "https://github.com/ravansagar",
    live: "https://www.sagarthakur.com.np",
    date: "January 2025",
  },
  {
    id: 2,
    title: "Malicious Software: Ransomware",
    description:
      "Created a ransomware tool for educational purposes, focusing on encryption using pyAesCrypt. Utilized Python and pyinstaller to develop a standalone executable file.",
    imageUrl: "/ransomeWare.jpg",
    height: 600,
    width: 800,
    category: "Security",
    technologies: ["Python", "tkinter", "pyAesCrypt", "pyinstaller"],
    github: "https://github.com/ravansagar/Cryptography/blob/main/ransomWare.py",
    live: "https://www.sagarthakur.com.np",
    date: "February 2024",
  },
  {
    id: 3,
    title: "Lnckitchen Website",
    description:
      "Developed the official website for Lnckitchen, a food delivery service. Built using React, Material-UI (MUI), and Firebase for dynamic and real-time features.",
    imageUrl: "/lncKitchen.png",
    height: 600,
    width: 800,
    category: "Web Development",
    technologies: ["React", "Material-UI", "Firebase", "ePayment Integration"],
    github: "https://github.com/ravansagar/lnckitchen_web",
    live: "https://www.lnckitchen.com.np",
    date: "December 2023",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "Designed and developed a personal portfolio website to showcase projects using HTML5, CSS3, and JavaScript.",
    imageUrl: "/portfolioSite.png",
    height: 600,
    width: 800,
    category: "Web Development",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/ravansagar",
    live: "https://www.sagarthakur.com.np",
    date: "September 2019",
  },
]

export default function Projects3D() {
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">My Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A showcase of my technical skills and programming projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Project3DCard key={project.id} project={project} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="https://github.com/ravansagar"
            target="_blank"
            rel="noopener noreferrer"
            className="apple-button inline-flex items-center hover-3d-button"
          >
            View More on GitHub
            <Github className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
