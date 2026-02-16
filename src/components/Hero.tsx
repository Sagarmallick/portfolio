"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BugSmasher } from "@/components/ui/BugSmasher";

gsap.registerPlugin(ScrollTrigger);

const TechIcons = {
    React: (props: any) => (
        <svg viewBox="-10.5 -9.45 21 18.9" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
            <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
            <g stroke="currentColor" strokeWidth="1" fill="none">
                <ellipse rx="10" ry="4.5"></ellipse>
                <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
            </g>
        </svg>
    ),
    NextJS: (props: any) => (
        <svg viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
            <mask id="mask0_408_134" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
                <circle cx="90" cy="90" r="90" fill="black" />
            </mask>
            <g mask="url(#mask0_408_134)">
                <circle cx="90" cy="90" r="90" fill="black" stroke="white" strokeWidth="6" />
                <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="white" />
                <rect x="115" y="54" width="12" height="72" fill="white" />
            </g>
        </svg>
    ),
    Tailwind: (props: any) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
    ),
    TypeScript: (props: any) => (
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect width="36" height="36" x="6" y="6" fill="#1976d2" />
            <polygon fill="#fff" points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264" />
            <path fill="#fff" d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986 c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92 c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z" />
        </svg>
    ),
    Node: (props: any) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
            <path d="M12 2l-9 5v10l9 5 9-5V7l-9-5zm.5 15.5v-5l4.5-2.5v5L12.5 17.5zm-1-5v5l-4.5-2.5v-5l4.5 2.5zm-4-3l4.5-2.5 4.5 2.5-4.5 2.5-4.5-2.5z" />
        </svg>
    ),
    JavaScript: (props: any) => (
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fill="#ffd600" d="M6,42V6h36v36H6z" />
            <path fill="#000001" d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z" />
        </svg>
    ),
    Postman: (props: any) => (
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zm0 26C9.373 28 4 22.627 4 16S9.373 4 16 4s12 5.373 12 12-5.373 12-12 12z" fill="#FF6C37" />
            <path d="M16 8c-3.12 0-5.8 1.88-7.15 4.67l1.79.89C11.66 11.53 13.68 10 16 10s4.34 1.53 5.36 3.56l1.79-.89C21.8 9.88 19.12 8 16 8zm0 14c2.32 0 4.34-1.53 5.36-3.56l1.79.89C21.8 22.12 19.12 24 16 24s-5.8-1.88-7.15-4.67l1.79-.89C11.66 20.47 13.68 22 16 22zm0-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#FF6C37" />
        </svg>
    ),
    Figma: (props: any) => (
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fill="#e64a19" d="M26,17h-8c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h8V17z" />
            <path fill="#7c4dff" d="M25,31h-7c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7V31z" />
            <path fill="#66bb6a" d="M18,45L18,45c-3.866,0-7-3.134-7-7v0c0-3.866,3.134-7,7-7h7v7C25,41.866,21.866,45,18,45z" />
            <path fill="#ff7043" d="M32,17h-7V3h7c3.866,0,7,3.134,7,7v0C39,13.866,35.866,17,32,17z" />
            <circle cx="32" cy="24" r="7" fill="#29b6f6" />
        </svg>
    ),
    Redux: (props: any) => (
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path fill="#7e57c2" d="M23,4c-6.617,0-12,7.27-12,16.205c0,4.834,1.582,9.169,4.078,12.136C15.03,32.554,15,32.773,15,33	c0,1.657,1.343,3,3,3s3-1.343,3-3s-1.343-3-3-3c-0.315,0-0.612,0.062-0.897,0.152C15.206,27.731,14,24.175,14,20.205	C14,12.924,18.037,7,23,7c3.837,0,7.111,3.547,8.404,8.518c1.122,0.346,2.237,0.782,3.33,1.308C33.579,9.508,28.759,4,23,4z" />
            <path fill="#7e57c2" d="M35.507,20.084c-3.947-2.392-8.374-3.442-12.182-2.959C22.775,16.444,21.943,16,21,16	c-1.657,0-3,1.343-3,3s1.343,3,3,3c1.272,0,2.353-0.795,2.789-1.912c3.118-0.379,6.812,0.531,10.163,2.563	c6.403,3.881,9.67,10.569,7.282,14.911c-0.827,1.504-2.286,2.572-4.218,3.09c-2.286,0.611-5.007,0.394-7.727-0.528	c-0.839,0.772-1.749,1.498-2.725,2.168c2.552,1.117,5.196,1.704,7.669,1.704c1.24,0,2.438-0.147,3.559-0.447	c2.741-0.733,4.841-2.304,6.071-4.542C47.016,33.276,43.267,24.787,35.507,20.084z" />
            <path fill="#7e57c2" d="M35,28.992C35,27.34,33.657,26,32,26s-3,1.34-3,2.992c0,0.669,0.228,1.281,0.6,1.779	c-1.279,2.802-3.744,5.567-7.062,7.578c-3.865,2.344-8.185,3.202-11.555,2.302c-1.932-0.518-3.391-1.586-4.218-3.09	c-1.702-3.094-0.521-7.376,2.61-10.988c-0.323-1.144-0.562-2.34-0.706-3.575c-5.07,4.797-7.109,11.323-4.532,16.009	c1.23,2.238,3.33,3.809,6.071,4.542c1.121,0.3,2.318,0.447,3.559,0.447c3.346,0,7.007-1.068,10.326-3.08	c3.836-2.325,6.683-5.577,8.209-8.962C33.815,31.801,35,30.541,35,28.992z" />
        </svg>
    ),
    Lighthouse: (props: any) => (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path d="M12 3l-2.25 4.5h4.5L12 3zm-3 5.5l1.5 5h3l1.5-5H9zm.75 6l1.25 4.5h2L14.25 14.5h-4.5zM3 21h18v-2H3v2z" fill="#F44B21" />
            <path d="M12 2L9 8h6l-3-6zM8 19h8v2H8v-2z" fill="none" />
            <rect x="7" y="21" width="10" height="2" fill="#F44B21" />
        </svg>
    )
};

export function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const orbit1Ref = useRef<HTMLDivElement>(null);
    const orbit2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Initial Entrance
            tl.from(titleRef.current, { opacity: 0, y: 50, duration: 1, ease: "power3.out" })
                .from(".hero-element", { opacity: 0, y: 30, duration: 0.8, stagger: 0.2, ease: "power3.out" }, "-=0.5");

            // Orbit 1 Animation (Clockwise)
            const orbit1Tween = gsap.to(orbit1Ref.current, {
                rotation: 360,
                duration: 60,
                repeat: -1,
                ease: "linear",
            });

            // Counter-rotate icons in Orbit 1
            const orbit1Icons = orbit1Ref.current?.querySelectorAll(".planet-icon");
            const orbit1IconsTween = orbit1Icons ? gsap.to(orbit1Icons, {
                rotation: -360,
                duration: 60,
                repeat: -1,
                ease: "linear",
            }) : null;

            // Orbit 2 Animation (Counter-Clockwise)
            const orbit2Tween = gsap.to(orbit2Ref.current, {
                rotation: -360,
                duration: 80,
                repeat: -1,
                ease: "linear",
            });

            // Counter-rotate icons in Orbit 2
            const orbit2Icons = orbit2Ref.current?.querySelectorAll(".planet-icon");
            const orbit2IconsTween = orbit2Icons ? gsap.to(orbit2Icons, {
                rotation: 360,
                duration: 80,
                repeat: -1,
                ease: "linear",
            }) : null;

            const animations = [orbit1Tween, orbit1IconsTween, orbit2Tween, orbit2IconsTween].filter(Boolean);

            // Scroll Velocity Acceleration
            ScrollTrigger.create({
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                onUpdate: (self) => {
                    const velocity = Math.abs(self.getVelocity());
                    // velocity is typically pixels/sec. 
                    // e.g., 2000px/s -> 1 + 10 = 11x speed.
                    const targetTimeScale = 1 + (velocity / 200);

                    // Accelerate
                    gsap.to(animations, {
                        timeScale: targetTimeScale,
                        duration: 0.5,
                        overwrite: true,
                        ease: "power1.out"
                    });

                    // Decelerate back to 1
                    gsap.to(animations, {
                        timeScale: 1,
                        duration: 2,
                        delay: 0.5,
                        ease: "power2.out"
                    });
                }
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="flex min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center text-center space-y-8 py-12 md:py-24 lg:py-32 overflow-hidden relative "
        >
            {/* Solar System Container - Centered on Title approximately */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none select-none hidden md:block">

                {/* Orbit 1 (Inner) - 5 Icons */}
                <div ref={orbit1Ref} className="absolute inset-0 border border-neutral-300/30 dark:border-neutral-700/30 rounded-full w-[500px] h-[500px] top-[150px] left-[150px]">
                    {/* Position 1: Top (0 deg) */}
                    <div className="planet-icon absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-3 rounded-full border shadow-sm z-10">
                        <TechIcons.React className="w-8 h-8 text-blue-500" />
                    </div>
                    {/* Position 2: ~72 deg */}
                    <div className="planet-icon absolute top-[30%] right-[5%] translate-x-1/2 -translate-y-1/2 bg-background p-3 rounded-full border shadow-sm z-10">
                        <TechIcons.NextJS className="w-8 h-8 text-foreground" />
                    </div>
                    {/* Position 3: ~144 deg */}
                    <div className="planet-icon absolute bottom-[15%] right-[20%] translate-x-1/2 translate-y-1/2 bg-background p-3 rounded-full border shadow-sm z-10">
                        <TechIcons.Tailwind className="w-8 h-8 text-cyan-400" />
                    </div>
                    {/* Position 4: ~216 deg */}
                    <div className="planet-icon absolute bottom-[15%] left-[20%] -translate-x-1/2 translate-y-1/2 bg-background p-3 rounded-full border shadow-sm z-10">
                        <TechIcons.JavaScript className="w-8 h-8 text-yellow-400" />
                    </div>
                    {/* Position 5: ~288 deg */}
                    <div className="planet-icon absolute top-[30%] left-[5%] -translate-x-1/2 -translate-y-1/2 bg-background p-3 rounded-full border shadow-sm z-10">
                        <TechIcons.TypeScript className="w-8 h-8" />
                    </div>
                </div>

                {/* Orbit 2 (Outer) - 5 Icons */}
                <div ref={orbit2Ref} className="absolute inset-0 border border-neutral-200/30 dark:border-neutral-800/30 rounded-full w-[700px] h-[700px] top-[50px] left-[50px]">
                    {/* Position 1: Top (0 deg) */}
                    <div className="planet-icon absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background p-3 rounded-full border shadow-sm z-10">
                        <TechIcons.Node className="w-8 h-8 text-green-500" />
                    </div>
                    {/* Position 2: ~72 deg */}
                    <div className="planet-icon absolute top-[30%] right-[5%] translate-x-1/2 -translate-y-1/2 bg-background p-3 rounded-full border shadow-sm z-10">
                        <TechIcons.Postman className="w-8 h-8 text-orange-500" />
                    </div>
                    {/* Position 3: ~144 deg */}
                    <div className="planet-icon absolute bottom-[15%] right-[20%] translate-x-1/2 translate-y-1/2 bg-background p-3 rounded-full border shadow-sm z-10">
                        <TechIcons.Figma className="w-8 h-8 text-pink-500" />
                    </div>
                    {/* Position 4: ~216 deg */}
                    <div className="planet-icon absolute bottom-[15%] left-[20%] -translate-x-1/2 translate-y-1/2 bg-background p-3 rounded-full border shadow-sm z-10">
                        <TechIcons.Redux className="w-8 h-8 text-purple-600" />
                    </div>
                    {/* Position 5: ~288 deg */}
                    <div className="planet-icon absolute top-[30%] left-[5%] -translate-x-1/2 -translate-y-1/2 bg-background p-3 rounded-full border shadow-sm z-10">
                        <TechIcons.Lighthouse className="w-8 h-8 text-red-500" />
                    </div>
                </div>

            </div>

            <div className="container px-4 md:px-6 relative z-10">
                <h1
                    ref={titleRef}
                    className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 to-neutral-500 dark:from-neutral-100 dark:to-neutral-400 mb-6"
                >
                    Sagar Mallick
                    <br />
                    Software Engineer
                </h1>
                <p className="hero-element mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
                    Creating digital experiences with modern web technologies. Specialized in Next.js, React, and scalable frontend architectures.
                </p>
                <div className="hero-element flex flex-col gap-4 min-[400px]:flex-row justify-center mt-8">
                    <Button size="lg" asChild>
                        <Link href="#projects">View Projects</Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href="#contact">Contact Me</Link>
                    </Button>
                </div>
            </div>

            {/* Interactive Elements */}

        </section>
    );
}
