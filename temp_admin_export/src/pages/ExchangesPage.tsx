import Layout from '@/components/layout/Layout';

const ExchangesPage = () => {
  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-8">
            Trocas e Devoluções
          </h1>

          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-medium mb-4">Política de Trocas</h2>
              <p className="text-muted-foreground leading-relaxed">
                Aceitamos trocas em até 30 dias após o recebimento do produto, desde que 
                a peça esteja em perfeitas condições, com etiqueta original e sem sinais de uso.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Como Solicitar</h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Entre em contato pelo nosso WhatsApp</li>
                <li>Informe o número do pedido e o motivo da troca</li>
                <li>Envie fotos do produto atual</li>
                <li>Aguarde a confirmação da nossa equipe</li>
                <li>Envie o produto de volta</li>
              </ol>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Reembolso</h2>
              <p className="text-muted-foreground leading-relaxed">
                O reembolso será processado em até 7 dias úteis após recebermos o produto de volta. 
                O valor será devolvido na mesma forma de pagamento utilizada na compra.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Importante</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Produtos em promoção podem ter condições específicas de troca</li>
                <li>O frete de devolução é por conta do cliente, exceto em casos de defeito</li>
                <li>Peças íntimas (biquínis e bodies) só podem ser trocadas por defeito de fabricação</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExchangesPage;
