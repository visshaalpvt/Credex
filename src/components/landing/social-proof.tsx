"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Startups Audited", value: "2,400+" },
  { label: "Avg. Savings Found", value: "24%" },
  { label: "Total Waste Identified", value: "$1.2M+" },
  { label: "Audit Time", value: "< 2 min" },
];

export default function SocialProof() {
  return (
    <section className="py-20 bg-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
