"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/15 rounded-full blur-[140px]" 
        />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-sm bg-primary/10 border border-primary/20 text-primary text-[10px] uppercase tracking-[0.2em] font-display mb-6 backdrop-blur-md"
          >
            [ MISSION-CRITICAL AUDIT ENGINE ]
          </motion.span>
          
          <h1 className="text-5xl md:text-8xl font-display font-bold mb-6 tracking-tight leading-[0.9]">
            AI FINANCIAL <br />
            <span className="text-primary text-glow">INTELLIGENCE</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            Precision-engineered stack optimization. Discover hidden subscription waste in the vacuum of your SaaS stack.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="bg-[#06b6d4] hover:bg-[#06b6d4]/90 text-black rounded-sm px-10 h-14 text-sm font-display font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105 active:scale-95">
              <Link href="/audit">
                Initialize Audit <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-sm px-10 h-14 text-sm font-display font-bold uppercase tracking-wider border-white/10 hover:bg-white/5 backdrop-blur-md transition-all hover:scale-105 active:scale-95">
              <Link href="#how-it-works">System Overview</Link>
            </Button>
          </div>
        </motion.div>

        {/* Dashboard Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-lg border border-white/10 bg-black/40 backdrop-blur-2xl p-4 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img 
              src="https://images.unsplash.com/photo-1551288049-bbbda5366fd9?auto=format&fit=crop&q=80&w=2070" 
              alt="Dashboard Preview" 
              className="rounded-md border border-white/5 w-full h-auto opacity-80"
            />
          </div>
          
          {/* Floating HUD Stats */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 md:right-10 bg-[#1d1b20]/80 backdrop-blur-xl border border-primary/20 p-4 rounded-sm shadow-xl hidden sm:block"
          >
            <div className="text-primary text-[10px] uppercase tracking-widest font-display mb-1">DATA_OVERLAP</div>
            <div className="text-xl font-display font-bold">$430.00</div>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-6 md:left-10 bg-[#1d1b20]/80 backdrop-blur-xl border border-secondary/20 p-4 rounded-sm shadow-xl hidden sm:block"
          >
            <div className="text-secondary text-[10px] uppercase tracking-widest font-display mb-1">WASTE_SCORE</div>
            <div className="text-xl font-display font-bold">28.4%</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
