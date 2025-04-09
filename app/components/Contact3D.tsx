"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Github, ExternalLink } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function Contact3D() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you as soon as possible.",
      })
      form.reset()
    }, 2000)
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <motion.h2
          className="text-3xl font-bold mb-16 text-center text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Get in Touch
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <Card3D>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Contact Information</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-primary mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Email</h4>
                  <a href="mailto:ravansagar@sagarthakur.com.np" className="text-primary hover:underline hover-trigger">
                    ravansagar@sagarthakur.com.np
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-6 w-6 text-primary mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Phone</h4>
                  <a href="tel:+9779746899004" className="text-muted-foreground hover-trigger">
                    +977 974 689 9004
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-primary mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Location</h4>
                  <p className="text-muted-foreground">Biratnagar, Nepal</p>
                </div>
              </div>

              <div className="flex items-start">
                <Github className="h-6 w-6 text-primary mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">GitHub</h4>
                  <a
                    href="https://github.com/ravansagar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline hover-trigger"
                  >
                    github.com/ravansagar
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <ExternalLink className="h-6 w-6 text-primary mr-4 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Website</h4>
                  <a
                    href="https://www.sagarthakur.com.np"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline hover-trigger"
                  >
                    www.sagarthakur.com.np
                  </a>
                </div>
              </div>
            </div>
          </Card3D>

          <Card3D>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Send Me a Message</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Full name" {...field} className="hover-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="example@example.com" {...field} className="hover-input" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell me about your project or opportunity..."
                          className="min-h-[120px] hover-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full hover-3d-button" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </Card3D>
        </div>
      </div>
    </section>
  )
}

function Card3D({ children }: { children: React.ReactNode }) {
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover-glow"
      style={{ perspective: 1000 }}
    >
      <motion.div animate={controls} style={{ transformStyle: "preserve-3d" }}>
        {children}
      </motion.div>
    </motion.div>
  )
}
