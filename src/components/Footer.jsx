import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-8 text-center">
      <div className="flex flex-col items-center justify-center gap-2">
        
        {/* Animated Line */}
        <div className="flex items-center gap-2 text-onSurface/60 text-sm font-medium">
          <span>Designed & Built with</span>
          <Heart size={16} className="text-red-500 fill-red-500 animate-pulse" />
          <span>by <span className="text-primary font-bold">Mudassir Nadeem</span></span>
        </div>

        {/* Copyright */}
        <p className="text-onSurface/40 text-xs">
          &copy; {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </footer>
  );
}