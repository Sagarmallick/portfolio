"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Ghost, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <style jsx global>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 2s linear infinite;
        }
      `}</style>
      <div className="container flex h-14 items-center px-4 md:px-6">
        {/* Desktop Logo & Nav */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Ghost className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Sagar Mallick
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative overflow-hidden group w-20 h-5 flex items-center", // Fixed width for effect
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {/* Static state */}
                <span className="group-hover:hidden dark:text-gray-300">{item.name}</span>

                {/* Hover state - Marquee */}
                <div className="hidden group-hover:flex absolute left-0 animate-ticker whitespace-nowrap">
                  <span className="mr-4">{item.name}</span>
                  <span className="mr-4">{item.name}</span>
                  <span className="mr-4">{item.name}</span>
                  <span className="mr-4">{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Header (Logo + Toggle) */}
        <div className="flex flex-1 items-center justify-between md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <Ghost className="h-6 w-6" />
            <span className="font-bold">Sagar Mallick</span>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center">
            <Button variant="ghost" size="icon" asChild>
              <Link href="https://github.com/sagarmallick" target="_blank" rel="noreferrer">
                <span className="font-semibold">Github</span>
              </Link>
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden border-t p-4 bg-background fixed inset-x-0 top-14 bottom-0 z-50 overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-lg font-medium transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t">
              <Link
                href="https://github.com/sagarmallick"
                target="_blank"
                rel="noreferrer"
                className="text-lg font-medium transition-colors hover:text-foreground/80"
              >
                GitHub
              </Link>
            </div>
          </nav>
        </div>
      )}
    </nav>
  );
}
