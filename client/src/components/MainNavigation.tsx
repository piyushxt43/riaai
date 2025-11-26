export default function MainNavigation() {
  return (
    <nav className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <a href="/" data-testid="link-logo">
          <img 
            src="https://cdn.prod.website-files.com/65e9754c9626aa0169367958/65e976858d073e88fa982a02_logotype.svg" 
            alt="Fabulous" 
            className="h-8 md:h-10"
          />
        </a>
        <div className="flex items-center gap-6 md:gap-8">
          <a 
            href="https://www.thefabulous.co/science-behind-fabulous/" 
            className="text-foreground hover:text-primary transition-colors text-sm md:text-base font-medium"
            data-testid="link-science"
          >
            Science
          </a>
          <a 
            href="https://app.thefabulous.co/login?fab_source=homepage" 
            className="text-foreground hover:text-primary transition-colors text-sm md:text-base font-medium"
            data-testid="link-signin"
          >
            Sign in
          </a>
        </div>
      </div>
    </nav>
  );
}
