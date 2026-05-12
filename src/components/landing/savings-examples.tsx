"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, TrendingDown } from "lucide-react";

const examples = [
  {
    title: "The Consolidation Win",
    scenario: "Startup using ChatGPT Team + Jasper + Perplexity Pro",
    result: "Saved $420/month by consolidating into a single unified workspace.",
    waste: "34% Waste Score",
  },
  {
    title: "The Unused Seat Fix",
    scenario: "Midjourney Pro account with 5 unused team seats",
    result: "Saved $150/month by downgrading to a single Pro license.",
    waste: "60% Waste Score",
  },
  {
    title: "The Enterprise Downgrade",
    scenario: "Claude Enterprise plan for a 12-person team",
    result: "Saved $360/month by moving to the Team plan with same features.",
    waste: "22% Waste Score",
  },
];

export default function SavingsExamples() {
  return (
    <section id="examples" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Real Savings Examples</h2>
          <p className="text-muted-foreground">See how other startups identified and eliminated AI waste.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full glass hover:border-primary/50 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-2 text-primary mb-4">
                    <TrendingDown className="w-5 h-5" />
                    <span className="font-semibold">{example.waste}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{example.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 italic">&quot;{example.scenario}&quot;</p>
                  <div className="flex items-start gap-2 text-foreground font-medium">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>{example.result}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
