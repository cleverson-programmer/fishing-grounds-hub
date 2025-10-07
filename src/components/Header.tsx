import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Sun,
  Moon,
  Calendar,
  User,
  Fish,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "next-themes";
import logo from "@/assets/logo.svg";

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Fishing Park Logo" className="h-10 w-10" />
          <h1 className="text-xl font-bold text-white">Duzepesqueiro</h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <RouterLink
            to="/events"
            className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
          >
            Eventos
          </RouterLink>
          <RouterLink
            to="/store"
            className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
          >
            Loja
          </RouterLink>
          <a
            href="#about"
            className="text-white/90 hover:text-white transition-colors duration-200 font-medium"
          >
            Sobre
          </a>
        </nav>

        {/* Right Side Controls */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 w-64 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            />
          </div>

          {/* User account */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-56" align="end">
              <div className="flex flex-col gap-2">
                <Button variant="ghost" className="justify-start gap-2 w-full">
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
                <Button variant="ghost" className="justify-start gap-2 w-full">
                  <UserPlus className="h-4 w-4" />
                  Register
                </Button>
                <Separator />
                <Button
                  variant="ghost"
                  className="justify-start gap-2 w-full text-destructive hover:text-destructive"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="border-white/20 text-white hover:bg-white/10"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="outline" size="icon" className="md:hidden ml-2">
          <Fish className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
