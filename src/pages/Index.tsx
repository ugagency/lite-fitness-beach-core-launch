import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ProductsSection from '@/components/home/ProductsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import InstagramSection from '@/components/home/InstagramSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategoriesSection />
      <FeaturesSection />
      <ProductsSection />
      <NewsletterSection />
      <InstagramSection />
    </Layout>
  );
};

export default Index;
