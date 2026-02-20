"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
export function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

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

            gsap.from(formRef.current, {
                scrollTrigger: {
                    trigger: formRef.current,
                    start: "top 75%",
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.2
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="contact" ref={containerRef} className="py-12 md:py-20 bg-muted/50">

            <div className="container px-4 md:px-6 max-w-4xl mx-auto">
                <h2 ref={headingRef} className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-8 text-center">
                    Get in Touch

                </h2>
                <div className="mb-8 text-center text-muted-foreground">
                    <p>Email: <a href="mailto:sagarmallick711@gmail.com" className="hover:text-foreground transition-colors">sagarmallick711@gmail.com</a></p>
                    <p>Mobile: <a href="tel:+919958789938" className="hover:text-foreground transition-colors">+91-9958789938</a></p>
                </div>
                <form ref={formRef} className="space-y-6 bg-card p-6 md:p-8 rounded-xl shadow-sm border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                            <Input id="name" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                            <Input id="email" type="email" placeholder="john@example.com" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                        <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" />
                    </div>
                    <Button type="submit" className="w-full md:w-auto">Send Message</Button>
                </form>
            </div>
        </section>
    );
}
