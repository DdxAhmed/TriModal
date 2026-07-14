export function Footer() {
  return (
    <footer className="bg-black border-t border-border/30 py-12 text-center text-muted-foreground font-mono text-xs">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span>SYSTEM.ACTIVE // SYS.ONLINE</span>
        </div>
        
        <p className="opacity-60 font-sans text-sm">
          Research Prototype // Multi-Physics Device Diagnostics // Academic Demonstration Only
        </p>
        
        <div className="opacity-60" dir="ltr">
          ESP32-S3 WROOM
        </div>
      </div>
    </footer>
  );
}