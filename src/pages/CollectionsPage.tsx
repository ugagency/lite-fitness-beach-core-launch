
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import categoryFitness from '@/assets/category-fitness.jpg';

const CollectionsPage = () => {
  const { data: dbProducts, isLoading } = useQuery({
    queryKey: ['products-collections'],
    queryFn: async () => {
      // "coleções coloque todos os produtos do data base"
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

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
    category: 'fitness', // Enforce fitness classification
    sizes: p.sizes || [],
    colors: p.colors || [],
    description: p.description,
    features: [],
    isNew: false,
  })) || [];

  return (
    <Layout>
      <div className="section-padding">
        <div className="container-custom">
          {/* Hero */}
          <div className="relative aspect-[21/9] mb-16 overflow-hidden">
            <img
              src={categoryFitness}
              alt="Coleções Lite"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
              <h1 className="text-3xl md:text-5xl font-light tracking-tight text-background text-center">
                Coleções
              </h1>
            </div>
          </div>

          {/* All Collections */}
          <div className="mb-16">
            <h2 className="text-2xl font-light tracking-tight mb-8">
              Nossa Coleção Completa
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Explore todas as nossas peças exclusivas.
            </p>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="h-96 bg-secondary/30 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {products.map((product: any, index: number) => (
                  <div
                    key={product.id}
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            )}

            {products.length === 0 && !isLoading && (
              <p className="text-muted-foreground">Nenhum produto encontrado.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CollectionsPage;
