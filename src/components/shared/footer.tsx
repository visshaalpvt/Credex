import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-gradient-to-br from-[#4F46E5] to-[#06B6D4] rounded flex items-center justify-center text-white font-bold text-sm">
                C
              </div>
              <span className="font-bold text-lg tracking-tight">CREDEX</span>
            </div>
            <p className="text-muted-foreground max-w-xs mb-4">
              Helping startups optimize their AI spend and reduce subscription waste.
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Credex. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/audit" className="hover:text-foreground transition-colors">Audit Tool</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
              <li><Link href="/#examples" className="hover:text-foreground transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
