import { Link } from 'react-router-dom';
import categoryFitness from '@/assets/category-fitness.jpg';
import categoryNovidades from '@/assets/product-top-1.jpg'; // Using product image for Novidades
import categoryColecoes from '@/assets/product-legging-1.jpg'; // Using product image for Coleções

const CategoriesSection = () => {
  const categories = [
    {
      title: 'Novidades',
      image: categoryNovidades,
      href: '/categoria/novidades',
    },
    {
      title: 'Fitness',
      image: categoryFitness,
      href: '/categoria/fitness',
    },
    {
      title: 'Coleções',
      image: categoryColecoes,
      href: '/colecoes',
    },
  ];

  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.title}
              to={category.href}
              className="group relative aspect-[4/5] overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/20 transition-colors duration-300" />

              <div className="absolute inset-0 flex items-end p-8">
                <div className="flex items-center justify-between w-full">
                  <h2 className="text-2xl md:text-3xl font-light tracking-wide text-background uppercase">
                    {category.title}
                  </h2>
                  <span className="text-background text-sm tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Ver coleção →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
