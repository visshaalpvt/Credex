"use client";

import { AuditItem, AITool, UsageFrequency } from "@/types";
import { AI_TOOLS } from "@/lib/pricing-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, GripVertical } from "lucide-react";
import { motion } from "framer-motion";

interface ToolRowProps {
  item: AuditItem;
  onUpdate: (id: string, updates: Partial<AuditItem>) => void;
  onRemove: (id: string) => void;
}

export default function ToolRow({ item, onUpdate, onRemove }: ToolRowProps) {
  const selectedTool = AI_TOOLS.find(t => t.name === item.toolName);

  const handleToolChange = (toolName: string) => {
    const tool = AI_TOOLS.find(t => t.name === toolName);
    if (tool) {
      const defaultPlan = tool.plans[0];
      onUpdate(item.id, { 
        toolName, 
        planName: defaultPlan.name,
        monthlySpend: defaultPlan.price * (defaultPlan.perUser ? item.teamSize : 1)
      });
    }
  };

  const handlePlanChange = (planName: string) => {
    const plan = selectedTool?.plans.find(p => p.name === planName);
    if (plan) {
      onUpdate(item.id, { 
        planName, 
        monthlySpend: plan.price * (plan.perUser ? item.teamSize : 1)
      });
    }
  };

  const handleTeamSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = Math.max(1, parseInt(e.target.value) || 1);
    const plan = selectedTool?.plans.find(p => p.name === item.planName);
    onUpdate(item.id, { 
      teamSize: size,
      monthlySpend: plan ? plan.price * (plan.perUser ? size : 1) : item.monthlySpend
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col md:flex-row items-end gap-4 p-4 glass rounded-xl border-white/5 mb-4 group relative"
    >
      <div className="flex-1 w-full space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground ml-1">AI Tool</label>
        <Select value={item.toolName} onValueChange={handleToolChange}>
          <SelectTrigger className="bg-background/50 border-white/10 h-11">
            <SelectValue placeholder="Select Tool" />
          </SelectTrigger>
          <SelectContent>
            {AI_TOOLS.map(tool => (
              <SelectItem key={tool.id} value={tool.name}>{tool.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 w-full space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground ml-1">Plan</label>
        <Select value={item.planName} onValueChange={handlePlanChange} disabled={!item.toolName}>
          <SelectTrigger className="bg-background/50 border-white/10 h-11">
            <SelectValue placeholder="Select Plan" />
          </SelectTrigger>
          <SelectContent>
            {selectedTool?.plans.map(plan => (
              <SelectItem key={plan.name} value={plan.name}>{plan.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-24 space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground ml-1">Team Size</label>
        <Input 
          type="number" 
          value={item.teamSize} 
          onChange={handleTeamSizeChange}
          className="bg-background/50 border-white/10 h-11"
          min="1"
        />
      </div>

      <div className="w-full md:w-32 space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground ml-1">Frequency</label>
        <Select 
          value={item.usageFrequency} 
          onValueChange={(v) => onUpdate(item.id, { usageFrequency: v as UsageFrequency })}
        >
          <SelectTrigger className="bg-background/50 border-white/10 h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="rarely">Rarely</SelectItem>
            <SelectItem value="never">Never</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full md:w-28 space-y-1.5">
        <label className="text-xs font-medium text-muted-foreground ml-1">Spend ($)</label>
        <Input 
          type="number" 
          value={item.monthlySpend} 
          onChange={(e) => onUpdate(item.id, { monthlySpend: parseFloat(e.target.value) || 0 })}
          className="bg-background/50 border-white/10 h-11"
        />
      </div>

      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onRemove(item.id)}
        className="h-11 w-11 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </motion.div>
  );
}
