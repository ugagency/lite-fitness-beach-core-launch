import { Product } from './types';

import productLegging1 from '@/assets/product-legging-1.jpg';
import productTop1 from '@/assets/product-top-1.jpg';
import productBikini1 from '@/assets/product-bikini-1.jpg';
import productShorts1 from '@/assets/product-shorts-1.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Legging Sculpt Pro',
    price: 289,
    image: productLegging1,
    category: 'fitness',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Nude', 'Verde Oliva'],
    description: 'Legging de alta compressão, zero transparência e toque frio. Ideal para treinos intensos e uso diário.',
    features: ['Zero transparência', 'Alta compressão', 'Poliamida premium', 'Costura reforçada', 'Conforto térmico'],
    isNew: true,
  },
  {
    id: '2',
    name: 'Top Essential',
    price: 189,
    image: productTop1,
    category: 'fitness',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: ['Nude', 'Preto', 'Branco'],
    description: 'Top esportivo com suporte médio, perfeito para yoga, pilates e treinos de baixo impacto.',
    features: ['Suporte médio', 'Tecido respirável', 'Alças ajustáveis', 'Sem costura lateral'],
    isBestSeller: true,
  },
  {
    id: '3',
    name: 'Biquíni Minimal',
    price: 349,
    image: productBikini1,
    category: 'beachwear',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: ['Preto', 'Nude', 'Terracota'],
    description: 'Biquíni sofisticado com design minimalista. Tecido de alta qualidade com proteção UV.',
    features: ['Proteção UV 50+', 'Secagem rápida', 'Forro duplo', 'Design atemporal'],
    isNew: true,
  },
  {
    id: '4',
    name: 'Short Runner',
    price: 199,
    image: productShorts1,
    category: 'fitness',
    sizes: ['PP', 'P', 'M', 'G', 'GG'],
    colors: ['Verde Oliva', 'Preto', 'Nude'],
    description: 'Short de corrida com cintura alta e bolso lateral discreto. Perfeito para beach tennis e corridas.',
    features: ['Cintura alta', 'Bolso lateral', 'Tecido leve', 'Anti-odor'],
    isBestSeller: true,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductsByCategory = (category: 'fitness' | 'beachwear'): Product[] => {
  return products.filter(p => p.category === category);
};
