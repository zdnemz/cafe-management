import { Twitter, Mail, Instagram, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t">
      {/* Main Content */}
      <div className="relative z-10 grid gap-6 py-12 md:grid-cols-3">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold">CafeX</span>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm">
            Where great coffee meets good vibes. Specialty brews, cozy ambiance,
            and bites worth savoring.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="text-muted-foreground space-y-1 text-sm">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="space-y-3">
          <h4 className="font-semibold">Follow Us</h4>
          <div className="flex gap-3">
            {[
              { icon: <Instagram size={18} />, link: "/" },
              { icon: <Twitter size={18} />, link: "/" },
              { icon: <Facebook size={18} />, link: "/" },
              { icon: <Mail size={18} />, link: "/" },
            ].map((social, i) => (
              <Link key={i} href={social.link} rel="noopener noreferrer">
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-muted-foreground border-t py-4 text-center text-xs">
        <p>
          {new Date().getFullYear()} {"\u00A9"} EduVerse. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
