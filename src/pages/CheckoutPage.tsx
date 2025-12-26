import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, QrCode, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const shippingCost = deliveryMethod === 'pickup' ? 0 : 15;
  const total = totalPrice + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate order completion
    toast({
      title: 'Pedido realizado com sucesso!',
      description: 'Você receberá um e-mail com os detalhes do pedido.',
    });
    
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <p className="mb-4">Seu carrinho está vazio</p>
          <button onClick={() => navigate('/')} className="btn-secondary">
            Continuar comprando
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom max-w-6xl">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </button>

          <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-12">
            Finalizar Compra
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Personal Info */}
                <div>
                  <h2 className="text-lg font-medium mb-6">Dados Pessoais</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-sm text-muted-foreground block mb-2">
                        Nome completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-border p-3 bg-transparent focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-border p-3 bg-transparent focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground block mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full border border-border p-3 bg-transparent focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Method */}
                <div>
                  <h2 className="text-lg font-medium mb-6">Entrega</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('delivery')}
                      className={`p-4 border text-left transition-colors ${
                        deliveryMethod === 'delivery'
                          ? 'border-foreground bg-secondary'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      <span className="font-medium block mb-1">Entrega</span>
                      <span className="text-sm text-muted-foreground">
                        Receba em casa · {formatPrice(15)}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`p-4 border text-left transition-colors ${
                        deliveryMethod === 'pickup'
                          ? 'border-foreground bg-secondary'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      <span className="font-medium block mb-1">Retirar na loja</span>
                      <span className="text-sm text-muted-foreground">
                        Grátis · Betim, MG
                      </span>
                    </button>
                  </div>

                  {deliveryMethod === 'delivery' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">
                          CEP *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cep}
                          onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                          className="w-full border border-border p-3 bg-transparent focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-sm text-muted-foreground block mb-2">
                          Endereço *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="w-full border border-border p-3 bg-transparent focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">
                          Número *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.number}
                          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                          className="w-full border border-border p-3 bg-transparent focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">
                          Complemento
                        </label>
                        <input
                          type="text"
                          value={formData.complement}
                          onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                          className="w-full border border-border p-3 bg-transparent focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">
                          Bairro *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.neighborhood}
                          onChange={(e) => setFormData({ ...formData, neighborhood: e.target.value })}
                          className="w-full border border-border p-3 bg-transparent focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground block mb-2">
                          Cidade *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full border border-border p-3 bg-transparent focus:outline-none focus:border-foreground transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  {deliveryMethod === 'pickup' && (
                    <div className="bg-secondary p-4 flex items-start gap-3">
                      <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium mb-1">Loja Lite Fitness Beach</p>
                        <p className="text-sm text-muted-foreground">
                          Rua das Palmeiras, 123 - Betim, MG
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          Seg - Sex: 9h às 18h<br />
                          Sáb: 9h às 13h
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Payment */}
                <div>
                  <h2 className="text-lg font-medium mb-6">Pagamento</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('pix')}
                      className={`p-4 border text-left transition-colors flex items-center gap-4 ${
                        paymentMethod === 'pix'
                          ? 'border-foreground bg-secondary'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      <QrCode className="w-6 h-6" />
                      <div>
                        <span className="font-medium block">Pix</span>
                        <span className="text-sm text-muted-foreground">
                          Aprovação instantânea
                        </span>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border text-left transition-colors flex items-center gap-4 ${
                        paymentMethod === 'card'
                          ? 'border-foreground bg-secondary'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      <CreditCard className="w-6 h-6" />
                      <div>
                        <span className="font-medium block">Cartão de Crédito</span>
                        <span className="text-sm text-muted-foreground">
                          Até 3x sem juros
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary p-6 sticky top-24">
                  <h2 className="text-lg font-medium mb-6">Resumo do Pedido</h2>
                  
                  <div className="space-y-4 mb-6">
                    {items.map((item, index) => (
                      <div key={`${item.product.id}-${item.size}-${index}`} className="flex gap-4">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-20 object-cover bg-background"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.size} / {item.color} × {item.quantity}
                          </p>
                          <p className="text-sm mt-1">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Frete</span>
                      <span>{shippingCost === 0 ? 'Grátis' : formatPrice(shippingCost)}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-border">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full mt-6">
                    Finalizar Pedido
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
