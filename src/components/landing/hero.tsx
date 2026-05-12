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
            className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium mb-6 backdrop-blur-md"
          >
            ✨ The Smart Way to Audit AI Spend
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Discover Hidden <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">AI Subscription Waste</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Startups overspend by 24% on duplicate AI tools. Get a forensic audit of your SaaS stack in under 2 minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 text-lg shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all hover:scale-105 active:scale-95">
              <Link href="/audit">
                Audit My Stack <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-10 h-14 text-lg border-white/10 hover:bg-white/5 backdrop-blur-md transition-all hover:scale-105 active:scale-95">
              <Link href="#how-it-works">See How It Works</Link>
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
          <div className="relative rounded-2xl border border-white/10 bg-black/40 backdrop-blur-2xl p-4 shadow-2xl overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img 
              src="https://images.unsplash.com/photo-1551288049-bbbda5366fd9?auto=format&fit=crop&q=80&w=2070" 
              alt="Dashboard Preview" 
              className="rounded-xl border border-white/5 w-full h-auto"
            />
          </div>
          
          {/* Floating Stats Cards for visual interest */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 md:right-10 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-xl hidden sm:block"
          >
            <div className="text-secondary text-sm font-bold mb-1">Found Overlap</div>
            <div className="text-xl font-bold">$430/mo</div>
          </motion.div>
          
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-6 md:left-10 bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-xl hidden sm:block"
          >
            <div className="text-primary text-sm font-bold mb-1">Waste Score</div>
            <div className="text-xl font-bold">28%</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
