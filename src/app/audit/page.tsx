"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { AuditItem } from "@/types";
import { v4 as uuidv4 } from "uuid";
import ToolRow from "@/components/audit/tool-row";
import { Button } from "@/components/ui/button";
import { Plus, BarChart2, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AuditPage() {
  const router = useRouter();
  const [items, setItems] = useLocalStorage<AuditItem[]>("credex-audit-items", [
    {
      id: uuidv4(),
      toolName: "ChatGPT",
      planName: "Plus",
      monthlySpend: 20,
      teamSize: 1,
      usageFrequency: "daily",
    }
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: uuidv4(),
        toolName: "",
        planName: "",
        monthlySpend: 0,
        teamSize: 1,
        usageFrequency: "daily",
      }
    ]);
  };

  const updateItem = (id: string, updates: Partial<AuditItem>) => {
    setItems(items.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const removeItem = (id: string) => {
    if (items.length === 1) {
      toast.error("You need at least one tool to perform an audit.");
      return;
    }
    setItems(items.filter(item => item.id !== id));
  };

  const calculateAudit = () => {
    const invalidItems = items.filter(item => !item.toolName || !item.planName);
    if (invalidItems.length > 0) {
      toast.error("Please fill in all tool and plan fields.");
      return;
    }

    toast.success("Analyzing your AI stack...");
    
    // In a real app, we'd save to DB here. 
    // For now, we'll just redirect to results.
    setTimeout(() => {
      router.push("/audit/results");
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-[30%] h-[30%] bg-primary/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Audit Your <span className="text-gradient">AI Stack</span>
          </motion.h1>
          <p className="text-muted-foreground text-lg">
            Add your current subscriptions below. We&apos;ll handle the rest.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Active Subscriptions
            </h2>
            <div className="text-sm text-muted-foreground">
              Total Monthly Spend: <span className="text-foreground font-bold">${items.reduce((acc, curr) => acc + curr.monthlySpend, 0).toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <ToolRow 
                  key={item.id} 
                  item={item} 
                  onUpdate={updateItem} 
                  onRemove={removeItem} 
                />
              ))}
            </AnimatePresence>
          </div>

          <motion.div 
            layout
            className="mt-6 flex flex-col sm:flex-row gap-4"
          >
            <Button 
              variant="outline" 
              onClick={addItem}
              className="flex-1 border-dashed border-white/20 hover:border-primary/50 hover:bg-primary/5 h-14"
            >
              <Plus className="mr-2 w-5 h-5" /> Add Another Tool
            </Button>
            
            <Button 
              onClick={calculateAudit}
              className="flex-1 bg-gradient-to-r from-[#4F46E5] to-[#06B6D4] text-white font-bold h-14 text-lg shadow-premium"
            >
              <BarChart2 className="mr-2 w-5 h-5" /> Generate Audit Report
            </Button>
          </motion.div>
        </div>

        <div className="mt-12 p-6 glass rounded-2xl flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">Your data is secure</h4>
            <p className="text-sm text-muted-foreground">
              We don&apos;t store your subscription data on our servers until you choose to save and share your report. All calculations are performed instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
