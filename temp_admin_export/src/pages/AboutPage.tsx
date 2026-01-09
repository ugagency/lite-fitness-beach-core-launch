import Layout from '@/components/layout/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-8">
            Quem Somos
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-6">
              A <strong className="text-foreground">Lite Fitness Beach</strong> nasceu da paixão por unir 
              performance, conforto e sofisticação em uma única peça. Acreditamos que a mulher moderna 
              merece se sentir confiante e elegante em qualquer momento do seu dia — seja no treino, 
              na praia ou no dia a dia.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-6">
              Nosso nome carrega nossa essência: <strong className="text-foreground">Luz & Movimento</strong>. 
              Luz porque cada peça é pensada para realçar a beleza natural de quem veste. Movimento 
              porque nossos tecidos acompanham cada gesto com leveza e liberdade.
            </p>

            <h2 className="text-xl font-medium mt-12 mb-4">Nossa Qualidade</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Trabalhamos com os melhores tecidos do mercado: poliamida premium com toque frio, 
              alta compressão e zero transparência. Cada peça passa por um rigoroso controle de 
              qualidade para garantir durabilidade e caimento perfeito.
            </p>

            <h2 className="text-xl font-medium mt-12 mb-4">Nossa Loja</h2>
            <p className="text-muted-foreground leading-relaxed">
              Estamos localizados em Betim, Minas Gerais, onde você pode conhecer de perto nossa 
              coleção e experimentar o conforto das nossas peças. Venha nos visitar!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
