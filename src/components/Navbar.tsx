import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const { t } = useLanguage();

  const links = [
    { name: t('home'), path: "/" },
    { name: t('articles'), path: "/articles" },
    { name: t('quiz'), path: "/quiz" },
    { name: t('profile'), path: "/profil-sante" },
    { name: t('research'), path: "/nos-recherches" },
    { name: t('lab'), path: "/labo-solutions" },
    { name: t('nutrition'), path: "/nutrition" },
    { name: t('about'), path: "/about" },
    { name: t('contact'), path: "/contact" }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const renderLinks = () => {
    return links.map((link) => (
      <Link
        key={link.path}
        to={link.path}
        className={`relative px-3 py-2 transition-colors hover:text-primary ${
          isActive(link.path)
            ? "text-primary font-medium after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary"
            : "text-gray-700"
        }`}
        onClick={closeMenu}
      >
        {link.name}
      </Link>
    ));
  };

  return (
    <nav className="border-b border-natural-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-natural-700 to-natural-500">
            NaturalPure
          </Link>
          <LanguageSwitcher />
        </div>

        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-natural-600 hover:text-natural-800 hover:bg-natural-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-4 mt-8">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-2 rounded-md transition-colors ${
                      isActive(link.path)
                        ? "bg-natural-50 text-primary font-medium border-l-2 border-primary"
                        : "text-gray-700 hover:bg-natural-50 hover:text-primary"
                    }`}
                    onClick={closeMenu}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="flex gap-2 p-1 bg-natural-50/50 rounded-full border border-natural-100">
            {renderLinks()}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;