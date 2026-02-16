"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TickerTitle } from "@/components/ui/TickerTitle";

const projects = [
    {
        title: "Submittree",
        description: "Online Conference Management Portal managing large-scale online conferences with RBAC and payment integration.",
        tags: ["Next.js", "Redux Toolkit", "RTK Query", "Razorpay"],
        link: "#",
    },
    {
        title: "The Neat Trick",
        description: "Premium Promotional & Lead Generation Platform with heavy animations and Strapi CMS integration.",
        tags: ["Next.js", "Strapi CMS", "Framer Motion", "Tailwind"],
        link: "#",
    },
    {
        title: "Quokka Labs Official",
        description: "Corporate website optimized for SEO and Core Web Vitals using lightweight architecture.",
        tags: ["HTML5", "Alpine.js", "Tailwind", "SEO"],
        link: "#",
    },
];

export function Projects() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headingRef.current, {
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
            });

            gsap.from(cardsRef.current?.children || [], {
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 75%",
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);


    return (
        <section id="projects" ref={containerRef} className="py-12 md:py-20">
            <div className="container px-4 md:px-6">
                <TickerTitle title="Featured Projects" className="mb-12">
                    <h2 ref={headingRef} className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Featured Projects
                    </h2>
                </TickerTitle>
                <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <Card key={index} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle>{project.title}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={project.link}>View Project</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section >
    );
}
