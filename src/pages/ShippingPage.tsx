import Layout from '@/components/layout/Layout';

const ShippingPage = () => {
  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-8">
            Envio e Prazos
          </h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-medium mb-4">Prazos de Entrega</h2>
              <div className="bg-secondary p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Região Metropolitana de BH</span>
                  <span className="font-medium">2 a 4 dias úteis</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Demais regiões de MG</span>
                  <span className="font-medium">4 a 7 dias úteis</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4">
                  <span className="text-muted-foreground">Outros estados</span>
                  <span className="font-medium">7 a 12 dias úteis</span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Rastreamento</h2>
              <p className="text-muted-foreground leading-relaxed">
                Após o envio, você receberá um e-mail com o código de rastreamento. 
                Acompanhe sua entrega pelo site dos Correios ou transportadora.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Retirada na Loja</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Você pode optar por retirar seu pedido gratuitamente em nossa loja física:
              </p>
              <div className="bg-secondary p-6">
                <p className="font-medium mb-2">Lite Fitness Beach</p>
                <p className="text-muted-foreground text-sm">
                  Rua das Palmeiras, 123 - Betim, MG<br />
                  Segunda a Sexta: 9h às 18h<br />
                  Sábado: 9h às 13h
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Frete Grátis</h2>
              <p className="text-muted-foreground leading-relaxed">
                Consulte nossas promoções de frete grátis para compras acima de determinado valor. 
                Acompanhe nossas redes sociais para não perder as ofertas!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShippingPage;
