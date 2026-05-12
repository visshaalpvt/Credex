"use client";

import { motion } from "framer-motion";
import { Plus, BarChart3, Wallet } from "lucide-react";

const steps = [
  {
    icon: <Plus className="w-6 h-6" />,
    title: "1. Add Your Tools",
    description: "Search and add your current AI subscriptions and plans.",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "2. Generate Audit",
    description: "Our engine analyzes duplicates and unused capabilities.",
  },
  {
    icon: <Wallet className="w-6 h-6" />,
    title: "3. Save Money",
    description: "Get a clear breakdown of where to cut and how to optimize.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white/5 relative overflow-hidden">
       {/* Background Grid */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground">Three simple steps to AI cost optimization.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-8" />
          
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-premium">
                <div className="text-primary">{step.icon}</div>
              </div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
