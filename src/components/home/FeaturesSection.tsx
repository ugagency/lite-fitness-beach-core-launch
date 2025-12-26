import { Droplets, Sparkles, Thermometer } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Droplets,
      title: 'Zero Transparência',
      description: 'Tecido de alta densidade que garante total cobertura',
    },
    {
      icon: Sparkles,
      title: 'Alta Compressão',
      description: 'Modelagem perfeita com suporte durante o treino',
    },
    {
      icon: Thermometer,
      title: 'Toque Frio',
      description: 'Tecnologia de conforto térmico para seu bem-estar',
    },
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="w-8 h-8 mx-auto mb-4 text-primary" strokeWidth={1.5} />
              <h3 className="text-sm font-medium tracking-wide uppercase mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
