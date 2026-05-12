export type ToolCategory = 
  | "AI Assistant" 
  | "Code Completion" 
  | "Image Generation" 
  | "Video Generation" 
  | "Audio Generation" 
  | "Copywriting" 
  | "Research" 
  | "Design";

export type UsageFrequency = "daily" | "weekly" | "monthly" | "rarely" | "never";

export interface PricingPlan {
  name: string;
  price: number;
  perUser: boolean;
  features: string[];
}

export interface AITool {
  id: string;
  name: string;
  category: ToolCategory;
  plans: PricingPlan[];
  description: string;
  capabilities: string[];
  alternatives: string[];
}

export interface AuditItem {
  id: string;
  toolName: string;
  planName: string;
  monthlySpend: number;
  teamSize: number;
  usageFrequency: UsageFrequency;
}

export interface Recommendation {
  id: string;
  type: "duplicate" | "unused" | "downgrade" | "consolidation";
  severity: "low" | "medium" | "high";
  toolName: string;
  description: string;
  potentialSavings: number;
  action: string;
}

export interface AuditResult {
  id: string;
  totalSpend: number;
  potentialSavings: number;
  wasteScore: number;
  recommendations: Recommendation[];
  breakdown: {
    duplicateSpend: number;
    unusedSeatSpend: number;
    overTierSpend: number;
    consolidationSavings: number;
  };
  createdAt: string;
}
