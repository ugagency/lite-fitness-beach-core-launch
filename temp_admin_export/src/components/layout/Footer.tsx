import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary py-16 mt-auto">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="text-xl font-medium tracking-luxury uppercase mb-4">Lite</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Luz & Movimento. Performance e sofisticação para seu treino e beach lifestyle.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-medium tracking-wide uppercase mb-4">Shop</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/categoria/fitness" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Fitness
              </Link>
              <Link to="/categoria/beachwear" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Beachwear
              </Link>
              <Link to="/categoria/novidades" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Novidades
              </Link>
              <Link to="/colecoes" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Coleções
              </Link>
            </nav>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-medium tracking-wide uppercase mb-4">Informações</h3>
            <nav className="flex flex-col gap-3">
              <Link to="/sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Quem Somos
              </Link>
              <Link to="/trocas" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Trocas e Devoluções
              </Link>
              <Link to="/envio" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Envio e Prazos
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-medium tracking-wide uppercase mb-4">Contato</h3>
            <div className="flex flex-col gap-4">
              <a
                href="https://wa.me/5531999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </a>
              <a
                href="https://instagram.com/litefitnessbeach"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="w-4 h-4" />
                @litefitnessbeach
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Rua das Palmeiras, 123<br />Betim, MG</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 Lite Fitness Beach. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/litefitnessbeach"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
