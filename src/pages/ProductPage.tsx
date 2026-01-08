import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useCart } from '@/context/CartContext';
import { ChevronLeft, Minus, Plus, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toast } = useToast();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">Carregando detalhes do produto...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <p className="text-xl">Produto não encontrado</p>
          <Button variant="link" onClick={() => navigate('/')} className="mt-4">
            Voltar para a página inicial
          </Button>
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
    if (!selectedSize && (product.sizes?.length ?? 0) > 0) {
      toast({
        title: 'Selecione o tamanho',
        description: 'Por favor, escolha um tamanho antes de adicionar ao carrinho.',
        variant: "destructive"
      });
      return;
    }
    if (!selectedColor && (product.colors?.length ?? 0) > 0) {
      toast({
        title: 'Selecione a cor',
        description: 'Por favor, escolha uma cor antes de adicionar ao carrinho.',
        variant: "destructive"
      });
      return;
    }

    // Mapping Supabase product fields to Cart expected fields
    const cartProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] || '',
      category: product.category,
      description: product.description || '',
    };

    for (let i = 0; i < quantity; i++) {
      addItem(cartProduct as any, selectedSize || '', selectedColor || '');
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
            <div className="aspect-[3/4] bg-secondary overflow-hidden rounded-xl shadow-sm border border-border">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  Sem Imagem
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="lg:py-4">
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {product.is_new && (
                  <span className="bg-foreground text-background px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full">
                    Novo
                  </span>
                )}
                {product.stock > 0 && product.stock <= 5 && (
                  <span className="bg-amber-100 text-amber-800 border border-amber-200 px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full">
                    Poucas Unidades
                  </span>
                )}
                {product.stock === 0 && (
                  <span className="bg-red-100 text-red-800 border border-red-200 px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full">
                    Esgotado
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-display font-medium tracking-tight mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-medium mb-6 text-primary">{formatPrice(product.price)}</p>

              <div className="text-muted-foreground mb-8 leading-relaxed whitespace-pre-wrap">
                {product.description || "Inspirado na beleza das praias brasileiras, este modelo une conforto e elegância para seus treinos ou momentos de lazer."}
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-3 flex justify-between">
                    <span>Cor:</span>
                    <span className="text-muted-foreground font-normal">{selectedColor || 'Selecione'}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-xs border rounded-lg transition-all ${selectedColor === color
                            ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                            : 'border-border hover:border-foreground text-muted-foreground'
                          }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <p className="text-sm font-semibold mb-3 flex justify-between">
                    <span>Tamanho:</span>
                    <span className="text-muted-foreground font-normal">{selectedSize || 'Selecione'}</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 text-xs font-bold border rounded-lg transition-all ${selectedSize === size
                            ? 'border-primary bg-primary/5 text-primary ring-1 ring-primary'
                            : 'border-border hover:border-foreground text-muted-foreground'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart Container */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 pt-4">
                <div className="flex items-center border border-border rounded-lg overflow-hidden h-12 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 hover:bg-secondary transition-colors"
                    disabled={product.stock === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 text-sm font-medium w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 hover:bg-secondary transition-colors"
                    disabled={product.stock === 0}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="btn-primary h-12 px-8 flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.stock === 0 ? "Produto Esgotado" : "Adicionar ao carrinho"}
                </button>
              </div>

              {/* Size Guide */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest">
                    Guia de Medidas (cm)
                  </h3>
                  <span className="text-[10px] text-muted-foreground">Medidas aproximadas</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="border-b border-border text-muted-foreground uppercase">
                        <th className="py-2 text-left font-medium">Tamanho</th>
                        <th className="py-2 text-left font-medium">Busto</th>
                        <th className="py-2 text-left font-medium">Cintura</th>
                        <th className="py-2 text-left font-medium">Quadril</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      {sizeGuide.map(row => (
                        <tr key={row.size} className="border-b border-border/50 hover:bg-secondary/20 transition-colors">
                          <td className="py-2 font-bold text-foreground">{row.size}</td>
                          <td className="py-2">{row.bust}</td>
                          <td className="py-2">{row.waist}</td>
                          <td className="py-2">{row.hip}</td>
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
    </Layout>
  );
};

export default ProductPage;
