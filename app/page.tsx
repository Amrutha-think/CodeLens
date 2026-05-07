import HeroSection from '@/components/hero-section';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <HeroSection />
      
      <footer className="mt-20 border-t border-border/40 py-10 text-center text-sm text-muted-foreground bg-background relative z-10">
        <div className="container mx-auto px-6">
          <p>© {new Date().getFullYear()} CodeLens. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
