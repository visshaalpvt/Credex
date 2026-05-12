"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this really free?",
    answer: "Yes, the AI Spend Audit is 100% free for startups. We built this as a tool to help founders and demonstrate our expertise in AI cost optimization.",
  },
  {
    question: "How accurate is the data?",
    answer: "Our pricing database is updated weekly with the latest plans from ChatGPT, Claude, Midjourney, and other major AI providers. For custom enterprise plans, we provide estimates based on current market benchmarks.",
  },
  {
    question: "Is my data private?",
    answer: "We don't connect to your banking data. You manually enter your tools and plans. We never sell your data, and we only use it to generate your report.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account is needed to generate an audit. You can reveal your full report by providing an email address where we'll send your results.",
  },
  {
    question: "Can I share my report with my team?",
    answer: "Absolutely. Every audit generates a unique shareable link that you can send to your co-founders or finance team.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Everything you need to know about the Credex AI Spend Audit.</p>
        </div>

        <Accordion type="single" className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-white/5">
              <AccordionTrigger className="text-left hover:text-primary transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
