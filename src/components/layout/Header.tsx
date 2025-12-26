import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setIsOpen, totalItems } = useCart();

  const navLinks = [
    { label: 'Novidades', href: '/categoria/novidades' },
    { label: 'Fitness', href: '/categoria/fitness' },
    { label: 'Beachwear', href: '/categoria/beachwear' },
    { label: 'Coleções', href: '/colecoes' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 -ml-2"
            aria-label="Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Navigation - Left */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(0, 2).map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm tracking-wide uppercase link-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Logo - Center */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-lg md:text-xl font-medium tracking-luxury uppercase">
              Lite
            </h1>
          </Link>

          {/* Desktop Navigation - Right */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.slice(2).map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm tracking-wide uppercase link-underline"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 relative"
              aria-label="Carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-border animate-fade-in">
            <input
              type="text"
              placeholder="O que você procura?"
              className="w-full bg-transparent text-sm focus:outline-none placeholder:text-muted-foreground"
              autoFocus
            />
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-background z-40 animate-fade-in">
          <nav className="container-custom py-8 flex flex-col gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className="text-2xl font-light tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
