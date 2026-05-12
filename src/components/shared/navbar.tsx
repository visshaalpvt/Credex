"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded-lg flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <span className="font-bold text-xl tracking-tight">CREDEX</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <Link href="/#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link>
          <Link href="/#examples" className="hover:text-foreground transition-colors">Examples</Link>
          <Link href="/#faq" className="hover:text-foreground transition-colors">FAQ</Link>
        </div>

        <div>
          <Button asChild className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
            <Link href="/audit">Audit My Stack</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
