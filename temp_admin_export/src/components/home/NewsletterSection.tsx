import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email obrigatório",
        description: "Por favor, insira seu email.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Inscrição realizada!",
      description: "Você receberá nossas novidades em primeira mão.",
    });
    
    setEmail('');
    setIsLoading(false);
  };

  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container-custom">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-4">
            Fique por dentro
          </h2>
          <p className="text-muted-foreground mb-8">
            Receba em primeira mão nossas novidades, lançamentos exclusivos e ofertas especiais.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 bg-background border-border/50 focus:border-primary"
            />
            <Button 
              type="submit" 
              className="h-12 px-8 bg-foreground text-background hover:bg-foreground/90"
              disabled={isLoading}
            >
              {isLoading ? 'Inscrevendo...' : 'Inscrever'}
            </Button>
          </form>
          
          <p className="text-xs text-muted-foreground mt-4">
            Ao se inscrever, você concorda com nossa política de privacidade.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
