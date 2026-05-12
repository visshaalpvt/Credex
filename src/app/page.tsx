import Hero from "@/components/landing/hero";
import SocialProof from "@/components/landing/social-proof";
import SavingsExamples from "@/components/landing/savings-examples";
import HowItWorks from "@/components/landing/how-it-works";
import FAQ from "@/components/landing/faq";

export default function LandingPage() {
  return (
    <div className="bg-background">
      <Hero />
      <SocialProof />
      <SavingsExamples />
      <HowItWorks />
      <FAQ />
    </div>
  );
}
