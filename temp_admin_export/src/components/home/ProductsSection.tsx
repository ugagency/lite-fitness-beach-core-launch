import { Link } from 'react-router-dom';
import ProductCard from '@/components/ui/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const ProductsSection = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .limit(4)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-2xl md:text-3xl font-light tracking-tight">
            Coleção em Destaque
          </h2>
          <Link
            to="/categoria/fitness"
            className="text-sm tracking-wide uppercase link-underline hidden md:inline-block"
          >
            Ver tudo
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-64 bg-secondary/30 animate-pulse rounded-xl" />
            ))
          ) : products?.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={{
                ...product,
                image: product.images?.[0] || "" // Map images array to single image for frontend
              } as any} />
            </div>
          ))}
        </div>

        {products?.length === 0 && !isLoading && (
          <p className="text-center text-muted-foreground py-12">Nenhum produto cadastrado no momento.</p>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link to="/categoria/fitness" className="btn-secondary inline-block">
            Ver tudo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
