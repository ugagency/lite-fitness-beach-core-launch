import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-beach.jpg';

const HeroSection = () => {
  return (
    <section className="relative h-[100svh] min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Lite Fitness Beach - Luz & Movimento"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-end pb-16 md:pb-24">
        <div className="container-custom">
          <div className="max-w-xl animate-fade-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight mb-4">
              Luz &<br />Movimento
            </h1>
            <p className="text-base md:text-lg text-foreground/80 mb-8 max-w-md">
              Performance e sofisticação para seu treino e beach lifestyle
            </p>
            <Link to="/categoria/fitness" className="btn-primary inline-block">
              Comprar agora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
