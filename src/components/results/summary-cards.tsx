"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, Wallet, Zap, Calendar } from "lucide-react";

interface SummaryCardsProps {
  totalSpend: number;
  potentialSavings: number;
  wasteScore: number;
}

export default function SummaryCards({ totalSpend, potentialSavings, wasteScore }: SummaryCardsProps) {
  const cards = [
    {
      title: "Total Monthly Spend",
      value: `$${totalSpend.toFixed(2)}`,
      icon: <Wallet className="w-5 h-5 text-primary" />,
      delay: 0,
    },
    {
      title: "Potential Savings",
      value: `$${potentialSavings.toFixed(2)}`,
      icon: <TrendingDown className="w-5 h-5 text-secondary" />,
      delay: 0.1,
      highlight: true,
    },
    {
      title: "Waste Score",
      value: `${wasteScore}%`,
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
      delay: 0.2,
      color: wasteScore > 30 ? "text-destructive" : wasteScore > 10 ? "text-yellow-500" : "text-secondary",
    },
    {
      title: "Annual Potential Savings",
      value: `$${(potentialSavings * 12).toFixed(2)}`,
      icon: <Calendar className="w-5 h-5 text-purple-500" />,
      delay: 0.3,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: card.delay }}
        >
          <Card className={`glass border-white/5 ${card.highlight ? 'border-secondary/30 bg-secondary/5' : ''}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">{card.title}</span>
                <div className="p-2 rounded-lg bg-white/5">
                  {card.icon}
                </div>
              </div>
              <div className={`text-2xl font-bold ${card.color || 'text-foreground'}`}>
                {card.value}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
