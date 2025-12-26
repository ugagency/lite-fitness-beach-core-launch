import { Instagram } from 'lucide-react';

const InstagramSection = () => {
  // Placeholder images for Instagram feed
  const instagramPosts = [
    { id: 1, image: '/placeholder.svg' },
    { id: 2, image: '/placeholder.svg' },
    { id: 3, image: '/placeholder.svg' },
    { id: 4, image: '/placeholder.svg' },
    { id: 5, image: '/placeholder.svg' },
    { id: 6, image: '/placeholder.svg' },
  ];

  return (
    <section className="section-padding bg-secondary">
      <div className="container-custom">
        <div className="text-center mb-12">
          <a
            href="https://instagram.com/litefitnessbeach"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm tracking-wide uppercase link-underline"
          >
            <Instagram className="w-5 h-5" />
            @litefitnessbeach
          </a>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href="https://instagram.com/litefitnessbeach"
              target="_blank"
              rel="noopener noreferrer"
              className="aspect-square bg-muted overflow-hidden group"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:opacity-80 transition-opacity">
                <Instagram className="w-6 h-6 text-muted-foreground" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
