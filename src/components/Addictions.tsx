"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TickerTitle } from "@/components/ui/TickerTitle";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

function YouTubeMusicLogo({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            width="80"
            height="80"
            viewBox="0 0 192 192"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="12"
                d="M96 170c40.869 0 74-33.131 74-74 0-40.87-33.131-74-74-74-40.87 0-74 33.13-74 74 0 40.869 33.13 74 74 74Z"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="12"
                d="M74 130V62l60 34-60 34Z"
            />
        </svg>
    );
}

export function Addictions() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const ytRowRef = useRef<HTMLDivElement>(null);
    const ytLogoRef = useRef<HTMLDivElement>(null);
    const ytTextRef = useRef<HTMLDivElement>(null);
    const crRowRef = useRef<HTMLDivElement>(null);
    const crLogoRef = useRef<HTMLDivElement>(null);
    const crTextRef = useRef<HTMLDivElement>(null);
    const agRowRef = useRef<HTMLDivElement>(null);
    const gptRowRef = useRef<HTMLDivElement>(null);
    const gptLogoRef = useRef<HTMLDivElement>(null);
    const gptTextRef = useRef<HTMLDivElement>(null);
    const agLogoRef = useRef<HTMLDivElement>(null);
    const agTextRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Heading entrance
            gsap.from(headingRef.current, {
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: "power3.out",
            });

            const vw = window.innerWidth;

            // YouTube Music rolling animation
            const row = ytRowRef.current;
            const logo = ytLogoRef.current;
            const text = ytTextRef.current;
            if (row && logo && text) {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: row,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1,
                    },
                });

                tl.fromTo(
                    logo,
                    { x: vw + 100, rotation: 0 },
                    {
                        x: 0,
                        rotation: -720,
                        ease: "power2.out",
                        duration: 1,
                    }
                );

                tl.fromTo(
                    text,
                    { x: vw + 200 },
                    {
                        x: 0,
                        ease: "power2.out",
                        duration: 1.5,
                    },
                    0.15
                );
            }

            // Clash Royale floating balloon animation
            const crRow = crRowRef.current;
            const crLogo = crLogoRef.current;
            const crText = crTextRef.current;
            if (crRow && crLogo && crText) {
                const crTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: crRow,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1,
                    },
                });

                crTl.fromTo(
                    crLogo,
                    { x: vw + 100, scale: 0.7, opacity: 0 },
                    {
                        x: 0,
                        scale: 1,
                        opacity: 1,
                        ease: "power2.out",
                        duration: 1,
                    }
                );

                crTl.fromTo(
                    crText,
                    { x: vw + 200 },
                    {
                        x: 0,
                        ease: "power2.out",
                        duration: 1.5,
                    },
                    0.15
                );

                gsap.to(crLogo, {
                    y: -8,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }

            // Antigravity floating animation
            const agRow = agRowRef.current;
            const agLogo = agLogoRef.current;
            const agText = agTextRef.current;
            if (agRow && agLogo && agText) {
                const agTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: agRow,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1,
                    },
                });

                agTl.fromTo(
                    agLogo,
                    { x: vw + 100, scale: 0.7, opacity: 0 },
                    {
                        x: 0,
                        scale: 1,
                        opacity: 1,
                        ease: "power2.out",
                        duration: 1,
                    }
                );

                agTl.fromTo(
                    agText,
                    { x: vw + 200 },
                    {
                        x: 0,
                        ease: "power2.out",
                        duration: 1.5,
                    },
                    0.15
                );




            }

            // ChatGPT floating animation
            const gptRow = gptRowRef.current;
            const gptLogo = gptLogoRef.current;
            const gptText = gptTextRef.current;
            if (gptRow && gptLogo && gptText) {
                const gptTl = gsap.timeline({
                    scrollTrigger: {
                        trigger: gptRow,
                        start: "top 80%",
                        end: "top 20%",
                        scrub: 1,
                    },
                });

                gptTl.fromTo(
                    gptLogo,
                    { x: vw + 100, scale: 0.7, opacity: 0 },
                    {
                        x: 0,
                        scale: 1,
                        opacity: 1,
                        ease: "power2.out",
                        duration: 1,
                    }
                );

                gptTl.fromTo(
                    gptText,
                    { x: vw + 200 },
                    {
                        x: 0,
                        ease: "power2.out",
                        duration: 1.5,
                    },
                    0.15
                );

                const gptGlowColors = [
                    "drop-shadow(0 0 18px rgba(16, 185, 129, 0.8))",
                    "drop-shadow(0 0 22px rgba(6, 182, 212, 0.8))",
                    "drop-shadow(0 0 18px rgba(34, 197, 94, 0.8))",
                    "drop-shadow(0 0 22px rgba(132, 204, 22, 0.8))",
                ];

                const gptGlowTl = gsap.timeline({ repeat: -1 });
                gptGlowColors.forEach((glow) => {
                    gptGlowTl.to(gptLogo, {
                        filter: glow,
                        duration: 1.5,
                        ease: "sine.inOut",
                    });
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="addictions"
            ref={sectionRef}
            className="py-16 md:py-24 overflow-hidden w-full"
        >

            <div className="w-full px-4 md:px-6">
                <TickerTitle title="My Addictions" className="mb-14">
                    <h2
                        ref={headingRef}
                        className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
                    >
                        My Addictions
                    </h2>
                </TickerTitle>

                {/* YouTube Music — rolling tire animation */}
                <div
                    ref={ytRowRef}
                    className="relative h-40 md:h-52 flex items-center overflow-hidden"
                >
                    {/* Rolling Logo */}
                    <div
                        ref={ytLogoRef}
                        className="absolute left-0 z-10 text-red-500"
                        style={{ willChange: "transform" }}
                    >
                        <YouTubeMusicLogo className="w-28 h-28 md:w-36 md:h-36" />
                    </div>

                    {/* Trailing Text */}
                    <div
                        ref={ytTextRef}
                        className="absolute whitespace-nowrap z-0"
                        style={{ willChange: "transform", left: "10rem" }}
                    >
                        <span className="text-5xl md:text-8xl font-extrabold tracking-tight text-foreground/90">
                            YouTube Music
                        </span>
                    </div>
                </div>

                {/* Clash Royale — rolling animation */}
                <div
                    ref={crRowRef}
                    className="relative h-40 md:h-52 flex items-center overflow-hidden mt-4"
                >
                    {/* Rolling Balloon Image */}
                    <div
                        ref={crLogoRef}
                        className="absolute left-0 z-10"
                        style={{ willChange: "transform" }}
                    >
                        <Image
                            src="balloon_1.webp"
                            alt="Clash Royale Balloon"
                            width={160}
                            height={160}
                            className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-lg"
                        />
                    </div>

                    {/* Trailing Text */}
                    <div
                        ref={crTextRef}
                        className="absolute whitespace-nowrap z-0"
                        style={{ willChange: "transform", left: "10rem" }}
                    >
                        <span className="text-5xl md:text-8xl font-extrabold tracking-tight text-foreground/90">
                            Clash Royale
                        </span>
                    </div>
                </div>

                {/* Antigravity — floating animation */}
                <div
                    ref={agRowRef}
                    className="relative h-40 md:h-52 flex items-center overflow-hidden mt-4"
                >
                    <div
                        ref={agLogoRef}
                        className="absolute left-0 z-10"
                        style={{ willChange: "transform" }}
                    >
                        <Image
                            src="antigravity.png"
                            alt="Antigravity"
                            width={160}
                            height={160}
                            className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-lg"
                        />
                    </div>

                    <div
                        ref={agTextRef}
                        className="absolute whitespace-nowrap z-0"
                        style={{ willChange: "transform", left: "10rem" }}
                    >
                        <span className="text-5xl md:text-8xl font-extrabold tracking-tight text-foreground/90">
                            Antigravity
                        </span>
                    </div>
                </div>

                {/* ChatGPT — floating animation */}
                <div
                    ref={gptRowRef}
                    className="relative h-40 md:h-52 flex items-center overflow-hidden mt-4"
                >
                    <div
                        ref={gptLogoRef}
                        className="absolute left-0 z-10"
                        style={{ willChange: "transform" }}
                    >
                        <Image
                            src="chatgpt.png"
                            alt="ChatGPT"
                            width={160}
                            height={160}
                            className="w-28 h-28 md:w-36 md:h-36 object-contain drop-shadow-lg"
                        />
                    </div>

                    <div
                        ref={gptTextRef}
                        className="absolute whitespace-nowrap z-0"
                        style={{ willChange: "transform", left: "10rem" }}
                    >
                        <span className="text-5xl md:text-8xl font-extrabold tracking-tight text-foreground/90">
                            ChatGPT
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
