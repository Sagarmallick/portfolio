"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TickerTitle } from "@/components/ui/TickerTitle";

export function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(textRef.current, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                ease: "power3.out",
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={containerRef} className="py-12 md:py-20 bg-muted/50">
            <div className="container px-4 md:px-6">
                <TickerTitle title="About Me" className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        About Me
                    </h2>
                </TickerTitle>
                <div ref={textRef} className="max-w-3xl space-y-8 text-gray-500 dark:text-gray-400">
                    <div>
                        <p className="md:text-lg mb-4">
                            I am a Software Engineer with over 4+ years of experience in engineering comprehensive web applications.
                            My expertise lies in the React ecosystem (Next.js, Redux, Tailwind CSS) and building scalable, high-performance frontend architectures.
                        </p>
                        <p className="md:text-lg">
                            Currently working at <strong>Quokka Labs</strong>, I've led the development of complex platforms like conference management portals and premium promotional websites. I focus on clean code, performance optimization, and delivering seamless user experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-semibold text-foreground mb-4">Technical Skills</h3>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>Languages:</strong> JavaScript (ES6+), TypeScript, HTML, CSS</li>
                                <li><strong>Frameworks:</strong> React.js, Next.js, Redux Toolkit, Tailwind CSS</li>
                                <li><strong>Tools:</strong> Git, GitHub, Postman, Jira, Figma</li>
                                <li><strong>Optimization:</strong> Lighthouse, Core Web Vitals, SEO</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-foreground mb-4">Education</h3>
                            <ul className="space-y-4">
                                <li>
                                    <div className="font-semibold">Master of Computer Applications</div>
                                    <div className="text-sm">Swami Vivekanand Subharti University (2017-2019)</div>
                                </li>
                                <li>
                                    <div className="font-semibold">Bachelor of Computer Applications</div>
                                    <div className="text-sm">Swami Vivekanand Subharti University (2014-2017)</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
