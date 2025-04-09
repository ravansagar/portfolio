import Link from "next/link"
import { Github, Mail, ExternalLink } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {["Projects", "Skills", "Education", "Contact"].map((item) => (
            <div key={item} className="pb-6">
              <Link
                href={`#${item.toLowerCase()}`}
                className="text-sm leading-6 text-muted-foreground hover:text-foreground"
              >
                {item}
              </Link>
            </div>
          ))}
        </nav>

        <div className="mt-8 flex justify-center space-x-6">
          <Link
            href="https://github.com/ravansagar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" />
          </Link>
          <Link href="mailto:ravansagar@sagarthakur.com.np" className="text-muted-foreground hover:text-foreground">
            <span className="sr-only">Email</span>
            <Mail className="h-6 w-6" />
          </Link>
          <Link
            href="https://www.sagarthakur.com.np"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <span className="sr-only">Website</span>
            <ExternalLink className="h-6 w-6" />
          </Link>
        </div>

        <p className="mt-8 text-center text-sm leading-5 text-muted-foreground">
          &copy; {new Date().getFullYear()} Sagar Kumar Thakur. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
