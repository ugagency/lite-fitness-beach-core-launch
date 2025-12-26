import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/lib/products';
import categoryFitness from '@/assets/category-fitness.jpg';

const CollectionsPage = () => {
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

          {/* Featured Collection */}
          <div className="mb-16">
            <h2 className="text-2xl font-light tracking-tight mb-8">
              Essentials
            </h2>
            <p className="text-muted-foreground max-w-2xl mb-12">
              Peças atemporais que combinam com tudo. A base perfeita para o seu guarda-roupa fitness.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {products.slice(0, 4).map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CollectionsPage;
