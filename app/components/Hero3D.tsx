"use client"

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as THREE from "three";

export default function Hero3D() {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000

    const posArray = new Float32Array(particlesCount * 3)

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10
    }

    particlesGeometry.setAttribute("position", new THREE.BufferAttribute(posArray, 3))

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.8,
    })

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particlesMesh)

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      requestAnimationFrame(animate)

      particlesMesh.rotation.x += 0.001
      particlesMesh.rotation.y += 0.001

      particlesMesh.rotation.x += mouseY * 0.0005
      particlesMesh.rotation.y += mouseX * 0.0005

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }
      scene.remove(particlesMesh)
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [])

  return (
    <div className="relative -mt-8 isolate overflow-hidden bg-background min-h-screen flex items-center">
      <div ref={containerRef} className="absolute inset-0 z-0" />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:flex lg:items-center lg:gap-x-10 lg:px-8 z-10 relative">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0">
          <motion.h1
            className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Hi, I'm <span className="text-gradient">Sagar Kumar Thakur</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg leading-8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            An enthusiastic and results-driven bachelor's in information technology student, with a strong foundation in
            game development, mobile application development, and machine learning.
          </motion.p>
          <motion.div
            className="mt-6 flex gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link
              href="https://github.com/ravansagar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover-trigger transform hover:scale-125 transition-transform duration-300"
            >
              <Github className="w-6 h-6" />
            </Link>
            <Link
              href="mailto:ravansagar@sagarthakur.com.np"
              className="text-muted-foreground hover:text-foreground transition-colors hover-trigger transform hover:scale-125 transition-transform duration-300"
            >
              <Mail className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/sagarthakur"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover-trigger transform hover:scale-125 transition-transform duration-300"
            >
              <Linkedin className="w-6 h-6" />
            </Link>
            <Link
              href="https://www.sagarthakur.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors hover-trigger transform hover:scale-125 transition-transform duration-300"
            >
              <ExternalLink className="w-6 h-6" />
            </Link>
          </motion.div>
          <motion.div
            className="mt-10 flex items-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a href="https://drive.google.com/uc?export=download&id=1v-__ouwkQkuSG5EROTSCBLTe1r2E1ul8" className="apple-button hover-trigger hover-3d-button">
              Download Resume
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold leading-6 text-foreground hover-trigger hover-text-effect"
            >
              Contact Me <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
        <motion.div
          className="mx-auto mt-16 lg:mt-0"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="relative">
            <div className="w-[500px] h-[500px] ml-8 rounded-2xl shadow-xl ring-1 ring-gray-900/10 overflow-hidden hover-3d-card">
              <Image 
                src="/SagarThakur.jpg"
                width={600}
                height={600}
                alt="Sagar Kumar Thakur"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
