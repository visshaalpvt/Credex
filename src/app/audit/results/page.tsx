"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { AuditItem, AuditResult } from "@/types";
import { performAudit } from "@/lib/audit-engine";
import SummaryCards from "@/components/results/summary-cards";
import SavingsChart from "@/components/results/savings-chart";
import RecommendationsList from "@/components/results/recommendations";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Share2, Download, BookOpen, Sparkles, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LeadCaptureModal from "@/components/shared/lead-capture-modal";
import { Card, CardContent } from "@/components/ui/card";

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
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );

  const chartData = items.map(item => ({
    name: item.toolName,
    value: item.monthlySpend
  }));

  const breakdownData = [
    {
      name: "Total",
      current: result.totalSpend,
      optimized: result.totalSpend - result.potentialSavings
    }
  ];

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <Button asChild variant="ghost" className="mb-4 -ml-2 text-muted-foreground hover:text-foreground">
              <Link href="/audit"><ChevronLeft className="mr-1 w-4 h-4" /> Edit Audit</Link>
            </Button>
            <h1 className="text-3xl md:text-4xl font-bold">Your Audit <span className="text-gradient">Results</span></h1>
            <p className="text-muted-foreground mt-2">Generated on {new Date(result.createdAt).toLocaleDateString()}</p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/10 glass">
              <Download className="mr-2 w-4 h-4" /> PDF
            </Button>
            <Button className="bg-primary text-white shadow-premium">
              <Share2 className="mr-2 w-4 h-4" /> Share Report
            </Button>
          </div>
        </div>

        <SummaryCards 
          totalSpend={result.totalSpend} 
          potentialSavings={result.potentialSavings} 
          wasteScore={result.wasteScore} 
        />

        <div className="p-6 glass rounded-2xl border-primary/20 bg-primary/5 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Sparkles className="w-24 h-24" />
          </div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            AI Insights Summary
          </h3>
          <p className="text-lg leading-relaxed text-foreground/90 max-w-4xl">
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-pulse text-primary" />
                Generating personalized insights...
              </span>
            ) : aiSummary || (
              <>
                Based on our analysis, your startup is spending <span className="font-bold text-primary">${result.totalSpend.toFixed(2)}</span> per month on AI tools. 
                We found <span className="font-bold text-secondary">${result.potentialSavings.toFixed(2)}</span> in monthly waste.
              </>
            )}
          </p>
        </div>

        <div className="relative">
          {!userEmail && (
            <div className="absolute inset-0 z-10 backdrop-blur-sm bg-background/20 flex flex-col items-center justify-center rounded-2xl border border-white/5 p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Detailed Breakdown Locked</h3>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Unlock your full recommendations list and visual charts by entering your email.
              </p>
              <Button onClick={() => setIsModalOpen(true)} className="bg-primary shadow-premium">
                Unlock Full Report
              </Button>
            </div>
          )}

          <div className={!userEmail ? "opacity-20 pointer-events-none grayscale" : ""}>
            <SavingsChart data={chartData} breakdown={breakdownData} />
            <RecommendationsList recommendations={result.recommendations} />
          </div>
        </div>

        <LeadCaptureModal 
          isOpen={isModalOpen} 
          onClose={() => userEmail ? setIsModalOpen(false) : router.push("/audit")} 
          onSuccess={handleLeadSuccess} 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass border-white/5 p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Need a Deep Dive?</h3>
            <p className="text-muted-foreground mb-6">Get a professional consultation from Credex to optimize your entire SaaS stack beyond just AI.</p>
            <Button className="w-full bg-white text-black hover:bg-white/90">Book a Consultation</Button>
          </Card>

          <Card className="glass border-white/5 p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mb-6">
              <Share2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Share the Savings</h3>
            <p className="text-muted-foreground mb-6">Help other founders save money. Share your audit results or the tool with your network.</p>
            <Button variant="outline" className="w-full border-white/10 hover:bg-white/5">Generate Share Link</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
