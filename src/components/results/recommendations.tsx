"use client";

import { Recommendation } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

interface RecommendationsProps {
  recommendations: Recommendation[];
}

export default function RecommendationsList({ recommendations }: RecommendationsProps) {
  if (recommendations.length === 0) {
    return (
      <Card className="glass border-secondary/30 bg-secondary/5 mb-8">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Zero Waste Detected!</h3>
          <p className="text-muted-foreground">Your AI stack is perfectly optimized. Great job!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 mb-12">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-primary" />
        Key Recommendations
      </h3>
      
      {recommendations.map((rec, index) => (
        <motion.div
          key={rec.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + index * 0.1 }}
        >
          <Card className="glass border-white/5 hover:border-white/10 transition-colors">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg shrink-0 ${
                    rec.severity === 'high' ? 'bg-destructive/10 text-destructive' : 
                    rec.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-secondary/10 text-secondary'
                  }`}>
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold">{rec.toolName}</h4>
                      <Badge variant="outline" className={`${
                        rec.severity === 'high' ? 'border-destructive/30 text-destructive' : 
                        rec.severity === 'medium' ? 'border-yellow-500/30 text-yellow-500' : 'border-secondary/30 text-secondary'
                      }`}>
                        {rec.severity.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 justify-between md:justify-end">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground uppercase">Potential Savings</div>
                    <div className="text-lg font-bold text-secondary">${rec.potentialSavings.toFixed(2)}/mo</div>
                  </div>
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="text-sm font-medium flex items-center gap-2">
                  <span className="text-muted-foreground">Action:</span>
                  <span>{rec.action}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
