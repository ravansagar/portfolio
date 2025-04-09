import Hero3D from "@/app/components/Hero3D"
import Projects3D from "@/app/components/Projects3D"
import Skills3D from "@/app/components/Skills3D"
import Education3D from "@/app/components/Education3D"
import Contact3D from "@/app/components/Contact3D"
import Objective3D from "@/app/components/Objective3D"

export default function Home() {
  return (
    <>
      <Hero3D />
      <Objective3D />
      <Projects3D />
      <Skills3D />
      <Education3D />
      <Contact3D />
    </>
  )
}
