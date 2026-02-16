import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { BugSmasher } from "@/components/ui/BugSmasher";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 bg-background bg-[linear-gradient(to_right,#80808033_1px,transparent_1px),linear-gradient(to_bottom,#80808033_1px,transparent_1px)] bg-[size:24px_24px]">
      <BugSmasher />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
    </main>
  );
}
