"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

interface Splatter {
    id: number;
    x: number;
    y: number;
    rotation: number;
    droplets: { dx: number; dy: number; size: number; opacity: number }[];
}

/* ── Inline SVG: alive crawling bug ── */
function AliveBug() {
    return (
        <svg width="36" height="36" viewBox="0 0 100 100" className="drop-shadow-md">
            {/* Body */}
            <ellipse cx="50" cy="55" rx="16" ry="22" fill="#1a1a1a" />
            <ellipse cx="50" cy="32" rx="12" ry="12" fill="#2a2a2a" />
            {/* Eyes */}
            <circle cx="44" cy="28" r="3" fill="#ff4444" />
            <circle cx="56" cy="28" r="3" fill="#ff4444" />
            {/* Legs left */}
            <line x1="34" y1="42" x2="15" y2="30" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
            <line x1="34" y1="55" x2="12" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
            <line x1="34" y1="68" x2="15" y2="80" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
            {/* Legs right */}
            <line x1="66" y1="42" x2="85" y2="30" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
            <line x1="66" y1="55" x2="88" y2="55" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
            <line x1="66" y1="68" x2="85" y2="80" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
            {/* Antennae */}
            <line x1="44" y1="22" x2="30" y2="8" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            <line x1="56" y1="22" x2="70" y2="8" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" />
            <circle cx="30" cy="8" r="2.5" fill="#1a1a1a" />
            <circle cx="70" cy="8" r="2.5" fill="#1a1a1a" />
        </svg>
    );
}

/* ── Inline SVG: dead squished bug ── */
function DeadBug() {
    return (
        <svg width="40" height="40" viewBox="0 0 100 100" style={{ filter: "blur(0.3px)" }}>
            {/* Flattened body - wider & shorter */}
            <ellipse cx="50" cy="52" rx="24" ry="12" fill="#0d0d0d" opacity="0.85" />
            <ellipse cx="50" cy="38" rx="16" ry="7" fill="#1a1a1a" opacity="0.8" />
            {/* Squished legs - splayed out */}
            <line x1="26" y1="45" x2="5" y2="25" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            <line x1="26" y1="52" x2="2" y2="55" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            <line x1="28" y1="60" x2="8" y2="82" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            <line x1="74" y1="45" x2="95" y2="25" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            <line x1="74" y1="52" x2="98" y2="55" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            <line x1="72" y1="60" x2="92" y2="82" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            {/* Cracked shell lines */}
            <line x1="40" y1="45" x2="60" y2="55" stroke="#333" strokeWidth="1" opacity="0.6" />
            <line x1="55" y1="42" x2="45" y2="58" stroke="#333" strokeWidth="1" opacity="0.6" />
        </svg>
    );
}

export function BugSmasher() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bugRef = useRef<HTMLButtonElement>(null);
    const wiggleTweenRef = useRef<gsap.core.Tween | null>(null);
    const moveTweenRef = useRef<gsap.core.Tween | null>(null);

    const [splatters, setSplatters] = useState<Splatter[]>([]);
    const [isDead, setIsDead] = useState(false);
    const [killCount, setKillCount] = useState(0);

    // Inline SVG hammer cursor as data URI
    const hammerCursor = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ctext x='0' y='26' font-size='26'%3E🔨%3C/text%3E%3C/svg%3E") 8 8, pointer`;

    // Generate random droplets for a splatter
    const generateDroplets = useCallback(() => {
        const count = 8 + Math.floor(Math.random() * 8); // 8-15 droplets
        return Array.from({ length: count }, () => ({
            dx: (Math.random() - 0.5) * 80,
            dy: (Math.random() - 0.5) * 80,
            size: 2 + Math.random() * 8,
            opacity: 0.4 + Math.random() * 0.5,
        }));
    }, []);

    useEffect(() => {
        if (!bugRef.current || !containerRef.current) return;

        const bug = bugRef.current;

        const startWiggle = () => {
            if (wiggleTweenRef.current) wiggleTweenRef.current.kill();
            wiggleTweenRef.current = gsap.to(bug, {
                rotation: "+=8",
                yoyo: true,
                repeat: -1,
                duration: 0.12,
                ease: "sine.inOut",
            });
        };

        const stopWiggle = () => {
            if (wiggleTweenRef.current) {
                wiggleTweenRef.current.kill();
                wiggleTweenRef.current = null;
            }
        };

        const moveBug = () => {
            if (isDead) return;

            startWiggle();

            const cw = containerRef.current?.offsetWidth || window.innerWidth;
            const ch = containerRef.current?.offsetHeight || window.innerHeight;

            const x = 30 + Math.random() * (cw - 80);
            const y = 30 + Math.random() * (ch - 80);

            const curX = (gsap.getProperty(bug, "x") as number) || 0;
            const curY = (gsap.getProperty(bug, "y") as number) || 0;
            const angle = Math.atan2(y - curY, x - curX) * (180 / Math.PI) + 90;

            gsap.to(bug, {
                rotation: angle,
                duration: 0.3,
                overwrite: "auto",
                onComplete: () => {
                    if (isDead) return;
                    moveTweenRef.current = gsap.to(bug, {
                        x,
                        y,
                        duration: 2 + Math.random() * 3,
                        ease: "none",
                        onComplete: moveBug,
                    });
                },
            });
        };

        if (!isDead) {
            moveBug();
        } else {
            if (moveTweenRef.current) moveTweenRef.current.kill();
            stopWiggle();
        }

        return () => {
            if (moveTweenRef.current) moveTweenRef.current.kill();
            stopWiggle();
        };
    }, [isDead]);

    const handleSmash = (e: React.MouseEvent) => {
        if (isDead || !bugRef.current || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotation = (gsap.getProperty(bugRef.current, "rotation") as number) || 0;

        const newSplatter: Splatter = {
            id: Date.now(),
            x,
            y,
            rotation,
            droplets: generateDroplets(),
        };

        setSplatters((prev) => [...prev, newSplatter]);
        setIsDead(true);
        setKillCount((prev) => prev + 1);

        // Brief smash scale animation on the splat
        setTimeout(() => {
            const el = document.getElementById(`splat-${newSplatter.id}`);
            if (el) {
                gsap.fromTo(
                    el,
                    { scale: 0.3, opacity: 0 },
                    { scale: 1, opacity: 1, duration: 0.15, ease: "back.out(2)" }
                );
            }
        }, 10);

        // Respawn
        setTimeout(() => setIsDead(false), 2500);
    };

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none overflow-hidden z-[5]"
        >
            {/* Alert Badge */}
            <div className="absolute top-24 right-4 pointer-events-auto z-20 ">
                <div className="bg-red-500 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg border border-red-400/50 flex items-center gap-2">
                    <span className="text-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 48 48">
                            <title>bug</title>
                            <g id="Layer_2" data-name="Layer 2">
                                <g id="invisible_box" data-name="invisible box">
                                    <rect width="48" height="48" fill="none" />
                                </g>
                                <g id="icons_Q2" data-name="icons Q2">
                                    <path d="M42,32a2,2,0,0,0,0-4H35.9a15.7,15.7,0,0,0-.4-2.3A10,10,0,0,0,43,16a2,2,0,0,0-4,0,6.1,6.1,0,0,1-4.6,5.9,15.5,15.5,0,0,0-3.1-4.6A7.2,7.2,0,0,0,32,14a8.7,8.7,0,0,0-1-3.9h0a4,4,0,0,1,4-4,2,2,0,0,0,0-4,8.1,8.1,0,0,0-7.4,4.9,7.7,7.7,0,0,0-7.2,0A8.1,8.1,0,0,0,13,2a2,2,0,0,0,0,4,4,4,0,0,1,4,4h0A8.7,8.7,0,0,0,16,14a7.5,7.5,0,0,0,.7,3.3,16.1,16.1,0,0,0-3,4.5A5.9,5.9,0,0,1,9,16a2,2,0,0,0-4,0,10.2,10.2,0,0,0,7.5,9.7,15.7,15.7,0,0,0-.4,2.3H6a2,2,0,0,0,0,4h6.1a15.7,15.7,0,0,0,.4,2.3A10.2,10.2,0,0,0,5,44a2,2,0,0,0,4,0,6.1,6.1,0,0,1,4.7-5.9c2,4.7,5.9,7.9,10.3,7.9s8.3-3.2,10.4-7.9A6,6,0,0,1,39,44a2,2,0,0,0,4,0,10.2,10.2,0,0,0-7.5-9.7,15.7,15.7,0,0,0,.4-2.3ZM24,10a4,4,0,0,1,4,4,2.8,2.8,0,0,1-.1.9,8.9,8.9,0,0,0-7.8,0A2.8,2.8,0,0,1,20,14,4,4,0,0,1,24,10ZM16,30c0-5.6,2.6-10.3,6-11.6V41.6C18.6,40.3,16,35.6,16,30ZM26,41.6V18.4c3.4,1.3,6,6,6,11.6S29.4,40.3,26,41.6Z" />
                                </g>
                            </g>
                        </svg>

                    </span>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wider">Bug Alert!</p>
                        <p className="text-[10px] opacity-90">Click the bug to squash it!</p>
                    </div>
                    {killCount > 0 && (
                        <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                            {killCount} killed
                        </span>
                    )}
                </div>
            </div>
            {/* Splatters */}
            {splatters.map((s) => (
                <div
                    key={s.id}
                    id={`splat-${s.id}`}
                    className="absolute"
                    style={{
                        left: `${s.x}px`,
                        top: `${s.y}px`,
                        transform: `translate(-50%, -50%)`,
                    }}
                >
                    {/* Central stain */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <svg width="50" height="50" viewBox="0 0 100 100">
                            <ellipse cx="50" cy="50" rx="30" ry="22" fill="#2d8a2d" opacity="0.85" />
                            <ellipse cx="42" cy="55" rx="18" ry="12" fill="#1e6b1e" opacity="0.7" />
                            <ellipse cx="60" cy="46" rx="14" ry="10" fill="#3aad3a" opacity="0.6" />
                        </svg>
                    </div>

                    {/* Droplets */}
                    {s.droplets.map((d, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                left: `calc(50% + ${d.dx}px)`,
                                top: `calc(50% + ${d.dy}px)`,
                                width: `${d.size}px`,
                                height: `${d.size}px`,
                                backgroundColor: `rgba(${30 + Math.floor(Math.random() * 20)}, ${100 + Math.floor(Math.random() * 60)}, ${20 + Math.floor(Math.random() * 20)}, ${d.opacity})`,
                                transform: "translate(-50%, -50%)",
                            }}
                        />
                    ))}

                    {/* Dead bug body */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ transform: `translate(-50%, -50%) rotate(${s.rotation}deg)` }}
                    >
                        <DeadBug />
                    </div>
                </div>
            ))}

            {/* Live bug */}
            {!isDead && (
                <button
                    ref={bugRef}
                    onClick={handleSmash}
                    className="absolute p-1 pointer-events-auto active:scale-75 transition-transform"
                    style={{ cursor: hammerCursor }}
                    aria-label="Smash the bug"
                >
                    <AliveBug />
                </button>
            )}
        </div>
    );
}
