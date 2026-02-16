"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TickerTitle } from "@/components/ui/TickerTitle";

const experiences = [
    {
        company: "Quokka Labs",
        role: "Software Engineer L1",
        period: "July 2025 – Present",
        project: "Submittree: Online Conference Management Portal",
        description: "Engineered a comprehensive conference management portal from scratch. Architected the frontend using Next.js and Tailwind CSS. Implemented complex state management with Redux Toolkit and RBAC for multiple user roles. Integrated Razorpay for payments.",
        technologies: ["Next.js", "Shadcn/UI", "Redux Toolkit", "RTK Query", "React Hook Form", "Razorpay API"],
    },
    {
        company: "Quokka Labs",
        role: "Software Engineer L1",
        period: "August 2022 – August 2023",
        project: "The Neat Trick: Premium Promotional & Lead Generation Platform",
        description: "Spearheaded end-to-end development of a premium agency website. Integrated Strapi JS for content management. Built interactive UI components with Framer Motion. Ensured pixel-perfect responsiveness and high performance.",
        technologies: ["Next.js", "Strapi JS", "Framer Motion", "Tailwind CSS", "TypeScript"],
    },
    {
        company: "Quokka Labs",
        role: "Software Engineer L1",
        period: "March 2021 – Present",
        project: "Quokka Labs: Official Corporate Website",
        description: "Engineered the corporate website focusing on performance and modern UI/UX. Used Alpine.js for lightweight interactivity. Executed SEO strategies and achieved high Core Web Vitals scores.",
        technologies: ["HTML5", "CSS3", "Tailwind", "Alpine.js", "SEO Tools"],
    },
];

export function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const timelineRef = useRef<HTMLDivElement>(null);

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

            gsap.from(timelineRef.current?.children || [], {
                scrollTrigger: {
                    trigger: timelineRef.current,
                    start: "top 75%",
                },
                opacity: 0,
                x: -20,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" ref={containerRef} className="py-12 md:py-20">
            <div className="container px-4 md:px-6">
                <TickerTitle title="Work Experience" className="mb-12">
                    <h2 ref={headingRef} className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center md:text-left">
                        Work Experience
                    </h2>
                </TickerTitle>
                <div ref={timelineRef} className="space-y-8 max-w-4xl">
                    {experiences.map((exp, index) => (
                        <Card key={index} className="relative border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader>
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                                    <div>
                                        <CardTitle className="text-xl">{exp.role} @ {exp.company}</CardTitle>
                                        <CardDescription className="text-base font-medium mt-1">{exp.project}</CardDescription>
                                    </div>
                                    <span className="text-sm text-muted-foreground whitespace-nowrap bg-secondary px-3 py-1 rounded-full">{exp.period}</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    {exp.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                        <span key={tech} className="text-xs font-semibold px-2.5 py-0.5 rounded border bg-background">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
