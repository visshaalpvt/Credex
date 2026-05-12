import { AuditItem, AuditResult, Recommendation, AITool } from "@/types";
import { AI_TOOLS } from "./pricing-data";
import { v4 as uuidv4 } from "uuid";

export function performAudit(items: AuditItem[]): AuditResult {
  const recommendations: Recommendation[] = [];
  let totalSpend = 0;
  let duplicateSpend = 0;
  let unusedSeatSpend = 0;
  let overTierSpend = 0;
  let consolidationSavings = 0;

  // 1. Calculate Total Spend
  items.forEach(item => {
    totalSpend += item.monthlySpend;
  });

  // 2. Duplicate Capability Detection
  const categoriesPresent = new Map<string, AuditItem[]>();
  items.forEach(item => {
    const tool = AI_TOOLS.find(t => t.name === item.toolName);
    if (tool) {
      const category = tool.category;
      if (!categoriesPresent.has(category)) {
        categoriesPresent.set(category, []);
      }
      categoriesPresent.get(category)?.push(item);
    }
  });

  categoriesPresent.forEach((categoryItems, category) => {
    if (categoryItems.length > 1) {
      // Sort by spend, recommend keeping the one with most features/best fit or just flag overlap
      const sortedBySpend = [...categoryItems].sort((a, b) => b.monthlySpend - a.monthlySpend);
      const primaryTool = sortedBySpend[0];
      const duplicates = sortedBySpend.slice(1);

      duplicates.forEach(dup => {
        duplicateSpend += dup.monthlySpend;
        recommendations.push({
          id: uuidv4(),
          type: "duplicate",
          severity: "high",
          toolName: dup.toolName,
          description: `${dup.toolName} overlaps significantly with ${primaryTool.toolName} in the ${category} category.`,
          potentialSavings: dup.monthlySpend,
          action: `Consolidate ${category} tools into ${primaryTool.toolName}.`
        });
      });
    }
  });

  // 3. Unused Seat / Low Usage Detection
  items.forEach(item => {
    if (item.usageFrequency === "rarely" || item.usageFrequency === "never") {
      const tool = AI_TOOLS.find(t => t.name === item.toolName);
      if (tool) {
        // If it's a team plan, recommend reducing seats
        const currentPlan = tool.plans.find(p => p.name === item.planName);
        if (currentPlan?.perUser && item.teamSize > 1) {
          const savings = (item.teamSize - 1) * currentPlan.price;
          unusedSeatSpend += savings;
          recommendations.push({
            id: uuidv4(),
            type: "unused",
            severity: "medium",
            toolName: item.toolName,
            description: `High seat count (${item.teamSize}) for a tool with ${item.usageFrequency} usage.`,
            potentialSavings: savings,
            action: `Reduce ${item.toolName} to 1 seat.`
          });
        } else if (item.monthlySpend > 0) {
          // If it's a solo plan but not used, recommend canceling
          unusedSeatSpend += item.monthlySpend;
          recommendations.push({
            id: uuidv4(),
            type: "unused",
            severity: "high",
            toolName: item.toolName,
            description: `You are paying for ${item.toolName} but ${item.usageFrequency} use it.`,
            potentialSavings: item.monthlySpend,
            action: `Cancel ${item.toolName} subscription.`
          });
        }
      }
    }
  });

  // 4. Plan Downgrade Detection
  items.forEach(item => {
    const tool = AI_TOOLS.find(t => t.name === item.toolName);
    if (tool && (item.usageFrequency === "weekly" || item.usageFrequency === "monthly")) {
      const currentPlanIndex = tool.plans.findIndex(p => p.name === item.planName);
      if (currentPlanIndex > 1) { // If on Team/Enterprise
        const lowerPlan = tool.plans[currentPlanIndex - 1];
        const currentPlan = tool.plans[currentPlanIndex];
        
        const currentCost = currentPlan.price * (currentPlan.perUser ? item.teamSize : 1);
        const lowerCost = lowerPlan.price * (lowerPlan.perUser ? item.teamSize : 1);
        
        if (currentCost > lowerCost) {
          const savings = currentCost - lowerCost;
          overTierSpend += savings;
          recommendations.push({
            id: uuidv4(),
            type: "downgrade",
            severity: "low",
            toolName: item.toolName,
            description: `Current usage suggests the ${lowerPlan.name} plan may be sufficient for ${item.toolName}.`,
            potentialSavings: savings,
            action: `Downgrade to ${lowerPlan.name} plan.`
          });
        }
      }
    }
  });

  // 5. Tool Consolidation (Advanced)
  // Check if any tool's capabilities are a subset of another's
  items.forEach(itemA => {
    const toolA = AI_TOOLS.find(t => t.name === itemA.toolName);
    if (!toolA) return;

    items.forEach(itemB => {
      if (itemA.id === itemB.id) return;
      const toolB = AI_TOOLS.find(t => t.name === itemB.toolName);
      if (!toolB) return;

      // If Tool A is Jasper (Copywriting) and Tool B is ChatGPT (AI Assistant)
      // ChatGPT has image-gen, coding, chat, writing. Jasper has writing.
      // If toolB's capabilities covers all of toolA's and toolB is "AI Assistant" (Generalist)
      const coversAll = toolA.capabilities.every(cap => toolB.capabilities.includes(cap));
      
      if (coversAll && toolB.category === "AI Assistant" && toolA.category !== "AI Assistant") {
        // Only add if not already flagged as duplicate
        if (!recommendations.some(r => r.toolName === itemA.toolName && r.type === "duplicate")) {
          consolidationSavings += itemA.monthlySpend;
          recommendations.push({
            id: uuidv4(),
            type: "consolidation",
            severity: "medium",
            toolName: itemA.toolName,
            description: `${itemB.toolName} covers all features of ${itemA.toolName}.`,
            potentialSavings: itemA.monthlySpend,
            action: `Consolidate ${itemA.toolName} into ${itemB.toolName}.`
          });
        }
      }
    });
  });

  const potentialSavings = duplicateSpend + unusedSeatSpend + overTierSpend + consolidationSavings;
  const wasteScore = totalSpend > 0 ? Math.min(100, Math.round((potentialSavings / totalSpend) * 100)) : 0;

  return {
    id: uuidv4(),
    totalSpend,
    potentialSavings,
    wasteScore,
    recommendations,
    breakdown: {
      duplicateSpend,
      unusedSeatSpend,
      overTierSpend,
      consolidationSavings
    },
    createdAt: new Date().toISOString()
  };
}
