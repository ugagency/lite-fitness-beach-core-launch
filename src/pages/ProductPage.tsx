import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getProductById } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, Minus, Plus, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const product = getProductById(id || '');
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <p>Produto não encontrado</p>
        </div>
      </Layout>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: 'Selecione o tamanho',
        description: 'Por favor, escolha um tamanho antes de adicionar ao carrinho.',
      });
      return;
    }
    if (!selectedColor) {
      toast({
        title: 'Selecione a cor',
        description: 'Por favor, escolha uma cor antes de adicionar ao carrinho.',
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize, selectedColor);
    }

    toast({
      title: 'Adicionado ao carrinho',
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };

  const sizeGuide = [
    { size: 'PP', bust: '76-80', waist: '60-64', hip: '86-90' },
    { size: 'P', bust: '80-84', waist: '64-68', hip: '90-94' },
    { size: 'M', bust: '84-88', waist: '68-72', hip: '94-98' },
    { size: 'G', bust: '88-92', waist: '72-76', hip: '98-102' },
    { size: 'GG', bust: '92-96', waist: '76-80', hip: '102-106' },
  ];

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Gallery */}
            <div className="aspect-[3/4] bg-secondary overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="lg:py-8">
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.isNew && (
                  <span className="bg-foreground text-background px-3 py-1 text-xs tracking-wide uppercase">
                    Novo
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="bg-primary text-primary-foreground px-3 py-1 text-xs tracking-wide uppercase">
                    Mais Vendido
                  </span>
                )}
              </div>

              <h1 className="text-2xl md:text-3xl font-light tracking-tight mb-2">
                {product.name}
              </h1>
              <p className="text-xl font-medium mb-6">{formatPrice(product.price)}</p>
              
              <p className="text-muted-foreground mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">
                  Cor: {selectedColor || 'Selecione'}
                </p>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 text-sm border transition-colors ${
                        selectedColor === color
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-3">
                  Tamanho: {selectedSize || 'Selecione'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 text-sm border transition-colors ${
                        selectedSize === size
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:border-foreground'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <p className="text-sm font-medium mb-3">Quantidade</p>
                <div className="flex items-center border border-border w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart - Desktop */}
              <button
                onClick={handleAddToCart}
                className="btn-primary w-full hidden lg:block"
              >
                Adicionar ao carrinho
              </button>

              {/* Features */}
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-sm font-medium uppercase tracking-wide mb-4">
                  Características
                </h3>
                <ul className="space-y-2">
                  {product.features.map(feature => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="w-4 h-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Size Guide */}
              <div className="mt-8 pt-8 border-t border-border">
                <h3 className="text-sm font-medium uppercase tracking-wide mb-4">
                  Guia de Tamanhos (cm)
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-2 text-left font-medium">Tamanho</th>
                        <th className="py-2 text-left font-medium">Busto</th>
                        <th className="py-2 text-left font-medium">Cintura</th>
                        <th className="py-2 text-left font-medium">Quadril</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuide.map(row => (
                        <tr key={row.size} className="border-b border-border">
                          <td className="py-2 text-muted-foreground">{row.size}</td>
                          <td className="py-2 text-muted-foreground">{row.bust}</td>
                          <td className="py-2 text-muted-foreground">{row.waist}</td>
                          <td className="py-2 text-muted-foreground">{row.hip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 lg:hidden z-40">
        <button
          onClick={handleAddToCart}
          className="btn-primary w-full"
        >
          Adicionar ao carrinho · {formatPrice(product.price * quantity)}
        </button>
      </div>
    </Layout>
  );
};

export default ProductPage;
