import React, { useEffect, useState } from "react";
import Logo from "../../assets/images/blacklistdb-logo.png";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import ReportScammerDialog from "../ReportScammerDialog";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/aboutus" },
    { label: "Contact us", href: "/contactus" },
    { label: "Donate", href: "/donate" },
    { label: "Blog", href: "/blog" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b shadow-md transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm py-2" : "bg-white py-3"
      }`}
    >
      <div className="flex h-16 items-center px-4 container mx-auto relative">
        {/* Logo */}
        <Link to="/" className="absolute left-4 flex items-center space-x-2">
          <img src={Logo} alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold">BlacklistDB</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Report Scammer Button */}
        <div className="absolute right-4 flex items-center space-x-4">
          <Button
            variant="default"
            className="hidden md:inline-flex p-6"
            onClick={() => setIsReportDialogOpen(true)}
          >
            Report Scammer
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="flex items-center space-x-2">
                  <img src={Logo} alt="Logo" className="w-10 h-10" />
                  <span className="text-xl font-bold">BlacklistDB</span>
                </SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-4 px-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="block py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <Button
                  className="w-full mt-4 p-6"
                  onClick={() => setIsReportDialogOpen(true)}
                >
                  Report Scammer
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Report Scammer dialog */}
      <ReportScammerDialog
        isOpen={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
      />
    </nav>
  );
};

export default Navbar;
