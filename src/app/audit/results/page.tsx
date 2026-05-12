"use client";

import { useEffect, useState } from "react";
import { performAudit } from "@/lib/audit-engine";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { AuditItem, AuditResult } from "@/types";
import { ChevronLeft, Share2, BookOpen, Sparkles, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LeadCaptureModal from "@/components/shared/lead-capture-modal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SummaryCards from "@/components/results/summary-cards";
import SavingsChart from "@/components/results/savings-chart";
import RecommendationsList from "@/components/results/recommendations";

export default function ResultsPage() {
  const router = useRouter();
  const [items] = useLocalStorage<AuditItem[]>("credex-audit-items", []);
  const [userEmail, setUserEmail] = useLocalStorage<string>("credex-user-email", "");
  const [result, setResult] = useState<AuditResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiSummary, setAiSummary] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    if (items.length === 0) {
      router.push("/audit");
      return;
    }
    const auditResult = performAudit(items);
    setResult(auditResult);

    if (!userEmail) {
      setIsModalOpen(true);
    } else {
      generateAiSummary(auditResult);
    }
  }, [items, router, userEmail, mounted]);

  const generateAiSummary = async (auditResult: AuditResult) => {
    if (aiSummary || isGenerating) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch("/api/summary", {
        method: "POST",
        body: JSON.stringify({ auditData: auditResult }),
      });
      const data = await response.json();
      setAiSummary(data.summary);
    } catch (error) {
      console.error("Failed to generate AI summary", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLeadSuccess = (email: string) => {
    setUserEmail(email);
    setIsModalOpen(false);
  };

  if (!mounted || !result) return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <Link 
          href="/audit" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors group"
        >
          <ChevronLeft className="mr-1 w-4 h-4 transition-transform group-hover:-translate-x-1" />
          [ BACK_TO_AUDIT_SYSTEM ]
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tighter">
              AUDIT <span className="text-primary text-glow">REPORT</span>
            </h1>
            <p className="text-muted-foreground font-sans">
              System Scan Complete. Found ${result.potentialSavings.toFixed(2)} in monthly optimization potential.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-sm border-white/10 hover:bg-white/5">
              <Share2 className="mr-2 w-4 h-4" /> Export JSON
            </Button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          <SummaryCards result={result} />
        </motion.div>

        <div className="p-6 glass rounded-lg border-primary/20 bg-primary/5 mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="w-24 h-24" />
          </div>
          <h3 className="text-sm font-display font-bold mb-4 flex items-center gap-2 uppercase tracking-widest text-primary">
            <Sparkles className="w-4 h-4" />
            AI_INTEL_SUMMARY
          </h3>
          <div className="text-lg leading-relaxed text-foreground/90 max-w-4xl font-sans">
            {isGenerating ? (
              <span className="flex items-center gap-2 animate-pulse">
                <Sparkles className="w-4 h-4 text-primary" />
                CALCULATING_OPTIMAL_PATH...
              </span>
            ) : aiSummary || (
              <p>Based on our cinematic audit, we've identified significant consolidation opportunities in your AI stack. Unlock the full report for the complete breakdown.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 glass rounded-lg border-white/5 p-8"
          >
            <h3 className="text-sm font-display font-bold mb-6 flex items-center gap-2 uppercase tracking-widest text-secondary">
              <Sparkles className="w-4 h-4" />
              EFFICIENCY_VISUALIZATION
            </h3>
            <div className={!userEmail ? "blur-md select-none pointer-events-none grayscale opacity-50" : ""}>
              <SavingsChart items={items} result={result} />
            </div>
            {!userEmail && (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <div className="bg-[#141218]/80 backdrop-blur-xl border border-primary/30 p-6 rounded-sm shadow-2xl">
                  <Lock className="w-8 h-8 text-primary mx-auto mb-4" />
                  <p className="text-sm font-display font-bold mb-4 uppercase tracking-wider">VISUAL_DATA_LOCKED</p>
                  <Button onClick={() => setIsModalOpen(true)} className="bg-primary text-black hover:bg-primary/90 font-bold uppercase tracking-widest text-[10px] px-6">
                    Initialize Lead Reveal
                  </Button>
                </div>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-lg border-white/5 p-8 overflow-hidden relative"
          >
            <h3 className="text-sm font-display font-bold mb-6 uppercase tracking-widest text-tertiary">SPEND_BREAKDOWN</h3>
            <div className={`space-y-4 ${!userEmail ? "blur-md select-none pointer-events-none" : ""}`}>
              {items.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + (idx * 0.1) }}
                  className="flex justify-between items-center p-3 rounded-sm bg-white/5 border border-white/5 font-sans"
                >
                  <span className="font-medium text-sm">{item.toolName}</span>
                  <span className="text-primary font-bold">${item.monthlySpend}</span>
                </motion.div>
              ))}
            </div>
            {!userEmail && (
              <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                <div className="bg-[#141218]/80 backdrop-blur-xl border border-white/10 p-4 rounded-sm">
                  <p className="text-[10px] font-display font-bold uppercase tracking-widest text-muted-foreground">REDACTED_DATA</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <RecommendationsList 
            recommendations={result.recommendations} 
            isLocked={!userEmail} 
          />
        </motion.div>

        <LeadCaptureModal 
          isOpen={isModalOpen} 
          onClose={() => userEmail ? setIsModalOpen(false) : router.push("/audit")} 
          onSuccess={handleLeadSuccess} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <Card className="glass border-white/5 p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2 uppercase tracking-tight">MISSION DEBRIEF</h3>
            <p className="text-muted-foreground mb-6 text-sm font-sans">Professional stack optimization beyond AI. Book a manual intelligence consultation.</p>
            <Button className="w-full bg-[#06b6d4] text-black hover:bg-[#06b6d4]/90 rounded-sm font-bold uppercase tracking-widest text-[10px]">Initialize Deep Dive</Button>
          </Card>

          <Card className="glass border-white/5 p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6">
              <Share2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-display font-bold mb-2 uppercase tracking-tight">DATA BROADCAST</h3>
            <p className="text-muted-foreground mb-6 text-sm font-sans">Broadcast these savings to your network. Share the mission intelligence.</p>
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 rounded-sm font-bold uppercase tracking-widest text-[10px]">Generate Share Link</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
