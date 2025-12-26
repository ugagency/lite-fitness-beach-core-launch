import { Link } from 'react-router-dom';
import ProductCard from '@/components/ui/ProductCard';
import { products } from '@/lib/products';

const ProductsSection = () => {
  // Show first 4 products
  const featuredProducts = products.slice(0, 4);

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
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

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
