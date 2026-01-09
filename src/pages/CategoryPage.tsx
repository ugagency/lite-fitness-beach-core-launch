
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [sortBy, setSortBy] = useState('newest');
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const sizes = ['PP', 'P', 'M', 'G', 'GG'];

  const { data: dbProducts, isLoading } = useQuery({
    queryKey: ['products-category', category],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      if (category === 'novidades') {
        // "novidades os ultimos 15 produtos adicionados no data base"
        query = query.order('created_at', { ascending: false }).limit(15);
      } else {
        // "as peças que forem fitness o que tiver outra classificação faça outra classificação, coloque em fitness"
        // Interpreted as: show all products under fitness or general category view
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const products = dbProducts?.map((p: any) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    image: p.images?.[0] || '',
    hoverImage: p.images?.[1],
    category: 'fitness', // Enforcing logic: treat everything as fitness
    sizes: p.sizes || [],
    colors: p.colors || [],
    description: p.description,
    features: [],
    isNew: false, // Could calculate based on date
  })) || [];

  const categoryTitle = category === 'novidades' ? 'Novidades' : 'Fitness';

  // Filter locally for size/sort since DB query handles the main set
  let displayProducts = products;

  // Filter by size
  if (selectedSize) {
    displayProducts = displayProducts.filter((p: any) => p.sizes.includes(selectedSize));
  }

  // Sort products
  if (sortBy === 'price-low') {
    displayProducts = [...displayProducts].sort((a: any, b: any) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    displayProducts = [...displayProducts].sort((a: any, b: any) => b.price - a.price);
  } else if (sortBy === 'bestseller') {
    // We don't have sales data yet
    displayProducts = [...displayProducts];
  }

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-4 capitalize">
              {categoryTitle}
            </h1>
            <p className="text-muted-foreground">
              {displayProducts.length} {displayProducts.length === 1 ? 'produto' : 'produtos'}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-border">
            {/* Size Filter */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Tamanho:</span>
              <div className="flex gap-1">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                    className={`px-3 py-1.5 text-sm border transition-colors ${selectedSize === size
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border hover:border-foreground'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-muted-foreground">Ordenar:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-transparent pr-8 text-sm focus:outline-none cursor-pointer"
                >
                  <option value="newest">Novidades</option>
                  <option value="bestseller">Mais vendidos</option>
                  <option value="price-low">Menor preço</option>
                  <option value="price-high">Maior preço</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="h-96 bg-secondary/30 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {displayProducts.map((product: any, index: number) => (
                <div
                  key={product.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Nenhum produto encontrado</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
