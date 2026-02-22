"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

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

    async function handleSubmit() {
        if (!name.trim() || !email.trim() || !message.trim()) {
            setStatus("error");
            setErrorMsg("Please fill in all fields.");
            return;
        }
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setStatus("success");
            setName("");
            setEmail("");
            setMessage("");

            // Reset success message after 5 seconds
            setTimeout(() => setStatus("idle"), 5000);
        } catch (err) {
            setStatus("error");
            setErrorMsg(err instanceof Error ? err.message : "Failed to send message");
        }
    }

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
                <div
                    ref={formRef}
                    className="space-y-6 bg-card p-6 md:p-8 rounded-xl shadow-sm border"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Name</label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                                disabled={status === "loading"}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}

                                disabled={status === "loading"}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Message</label>
                        <Textarea
                            id="message"
                            placeholder="Type your message here..."
                            className="min-h-[150px]"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}

                            disabled={status === "loading"}
                        />
                    </div>

                    {/* Success message */}
                    {status === "success" && (
                        <div className="flex items-center gap-2 text-sm text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 px-4 py-3 rounded-lg">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Message sent successfully! I&apos;ll get back to you soon.
                        </div>
                    )}

                    {/* Error message */}
                    {status === "error" && (
                        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 px-4 py-3 rounded-lg">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errorMsg}
                        </div>
                    )}

                    <Button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full md:w-auto"
                        disabled={status === "loading"}
                    >
                        {status === "loading" ? (
                            <span className="flex items-center gap-2">
                                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Sending...
                            </span>
                        ) : "Send Message"}
                    </Button>
                </div>
            </div>
        </section>
    );
}
