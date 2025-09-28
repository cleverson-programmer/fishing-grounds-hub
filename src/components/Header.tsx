import { Button } from "@/components/ui/button";
import { Moon, Sun, Fish } from "lucide-react";
import { useTheme } from "next-themes";
import logo from "@/assets/logo.svg";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img 
            src={logo} 
            alt="Fishing Park Logo" 
            className="h-10 w-10"
          />
          <h1 className="text-xl font-bold text-primary">
            Pine Lake Fishing Park
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a 
            href="#events" 
            className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
          >
            Events
          </a>
          <a 
            href="#store" 
            className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
          >
            Store
          </a>
          <a 
            href="#about" 
            className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
          >
            About
          </a>
          <a 
            href="#account" 
            className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
          >
            Account
          </a>
        </nav>

        {/* Theme Toggle */}
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          className="ml-4"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden ml-2"
        >
          <Fish className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;