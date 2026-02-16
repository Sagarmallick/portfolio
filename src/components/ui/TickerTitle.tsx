"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TickerTitleProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function TickerTitle({ title, children, className }: TickerTitleProps) {
    return (
        <div className={cn("relative overflow-hidden group cursor-default inline-block", className)}>
            {/* Default Static Content */}
            <div className="group-hover:opacity-0 transition-opacity duration-300">
                {children}
            </div>

            {/* Scrolling Ticker Content - Visible on Hover */}
            <div className="absolute inset-0 hidden group-hover:flex items-center overflow-hidden">
                <div className="flex animate-ticker whitespace-nowrap text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    <span className="mr-8">{title}</span>
                    <span className="mr-8">{title}</span>
                    <span className="mr-8">{title}</span>
                    {/* Duplicate to ensure seamless loop fill */}
                    <span className="mr-8">{title}</span>
                </div>
            </div>
            <style jsx>{`
                @keyframes ticker {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); } 
                }
                .animate-ticker {
                    animation: ticker 5s linear infinite;
                }
            `}</style>
        </div>
    );
}
