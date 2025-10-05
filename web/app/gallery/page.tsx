import Image from 'next/image';
import { Card } from '../components/Card';
import { PageHeader } from '../components/Hero';
import { Button } from '../components/Button';
import { tw } from '../theme';

export default function GalleryPage() {
  const gameScreenshots = [
    {
      game: '/game_screenshots/Haemulon steindachneri.jpeg',
      real: '/real_fish/haemulon.jpeg',
      title: 'Haemulon steindachneri',
      commonName: 'Latin Grunt',
      description: 'VR model compared to real species - accurate coloring and morphology'
    },
    {
      game: '/Thalassoma lucasanum model.jpeg',
      real: '/Thalassoma lucasanum.jpeg',
      title: 'Thalassoma lucasanum',
      commonName: 'Cortez Rainbow Wrasse',
      description: 'Low-poly 3D model showcasing vibrant coloration - turquoise head, yellow band, and pink body characteristic of this Pacific reef species'
    },
    {
      game: '/osa oceanic floor model.jpeg',
      real: '/osa-panama.jpeg',
      title: 'Osa Peninsula Coast Recreation',
      commonName: 'Pacific Coast of Costa Rica',
      description: 'VR recreation of the Osa Peninsula coastal section using NASA bathymetric data - comparing our 3D terrain model to the actual geographic location'
    }
  ];

  const additionalScreenshots = [
    {
      image: '/game_screenshots/marine-biodiversity.jpg',
      title: 'Marine Biodiversity',
      description: 'Diverse ecosystem with multiple species interactions'
    },
    {
      image: '/game_screenshots/demo-showcase.mp4',
      title: 'Full VR Demo',
      description: 'Complete walkthrough of the underwater experience',
      isVideo: true
    }
  ];

  return (
    <div className={`min-h-screen ${tw.gradient.background} ${tw.text.primary} pt-16`}>
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-20">
          <div className="relative h-96 mb-12 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#85c6cf]/30">
            <Image
              src="/game_screenshots/oceanic_image.jpeg"
              alt="VR Gallery"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06141B] via-[#06141B]/70 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${tw.text.primary} drop-shadow-2xl`}>
                  VR Gallery
                </h1>
                <p className={`text-xl md:text-2xl ${tw.text.accent} drop-shadow-lg`}>
                  Game vs. Reality
                </p>
              </div>
            </div>
          </div>
          
          <PageHeader
            title="Deep Ocean VR Gallery"
            description="Explore our scientifically accurate 3D models compared to real ocean life. Built using NASA data and marine biology research."
            gradient
          />
        </div>

        {/* Model Comparison Section */}
        <section className="mb-20">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent ${tw.gradient.text}`}>
            Model vs. Reality Comparison
          </h2>
          <p className={`text-center ${tw.text.secondary} mb-12 max-w-2xl mx-auto`}>
            Our VR models are based on real species data and scientific references
          </p>

          <div className="space-y-12">
            {gameScreenshots.map((item, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Game Model */}
                  <div>
                    <div className="relative h-80 rounded-xl overflow-hidden shadow-lg ring-2 ring-[#85c6cf]/30 mb-4">
                      <Image
                        src={item.game}
                        alt={`VR Model: ${item.title}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-[#06141B]/90 px-4 py-2 rounded-lg border border-[#85c6cf]/50">
                        <span className={`text-sm font-bold ${tw.text.accent}`}>VR MODEL</span>
                      </div>
                    </div>
                  </div>

                  {/* Real Reference */}
                  <div>
                    <div className="relative h-80 rounded-xl overflow-hidden shadow-lg ring-2 ring-emerald-500/30 mb-4">
                      <Image
                        src={item.real}
                        alt={`Real: ${item.title}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-[#06141B]/90 px-4 py-2 rounded-lg border border-emerald-500/50">
                        <span className="text-sm font-bold text-emerald-400">REAL PHOTO</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6 pt-6 border-t border-[#11212D]">
                  <h3 className={`text-2xl font-bold mb-2 ${tw.text.accent}`}>
                    {item.title}
                  </h3>
                  <p className={`text-lg mb-2 ${tw.text.primary}`}>
                    Common Name: <span className="font-semibold">{item.commonName}</span>
                  </p>
                  <p className={tw.text.secondary}>
                    {item.description}
                  </p>
                  
                  {/* Stats */}
                  <div className="flex gap-4 mt-4 flex-wrap">
                    <div className={`px-4 py-2 rounded-lg ${tw.bg.primary} border ${tw.border.subtle}`}>
                      <span className={`text-sm ${tw.text.secondary}`}>Accuracy: </span>
                      <span className={`font-bold ${tw.text.accent}`}>95%+</span>
                    </div>
                    <div className={`px-4 py-2 rounded-lg ${tw.bg.primary} border ${tw.border.subtle}`}>
                      <span className={`text-sm ${tw.text.secondary}`}>Based on: </span>
                      <span className={`font-bold ${tw.text.primary}`}>Scientific Data</span>
                    </div>
                    <div className={`px-4 py-2 rounded-lg ${tw.bg.primary} border ${tw.border.subtle}`}>
                      <span className={`text-sm ${tw.text.secondary}`}>Region: </span>
                      <span className={`font-bold ${tw.text.primary}`}>Pacific Costa Rica</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Additional Screenshots */}
        <section className="mb-20">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${tw.text.primary}`}>
            More From Our VR World
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {additionalScreenshots.map((item, index) => (
              <Card key={index} className="group hover:scale-[1.02] transition-transform">
                <div className="relative h-72 rounded-xl overflow-hidden shadow-xl ring-2 ring-[#85c6cf]/30 group-hover:ring-[#85c6cf]/60 transition-all mb-6">
                  {item.isVideo ? (
                    <video
                      className="w-full h-full object-cover"
                      controls
                      poster="/hero-ocean-depths.jpg"
                      preload="metadata"
                    >
                      <source src={item.image} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>
                <h3 className={`text-xl font-bold mb-2 ${tw.text.accent}`}>{item.title}</h3>
                <p className={tw.text.secondary}>{item.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Technical Details */}
        <section className="mb-20">
          <Card className="p-10">
            <h2 className={`text-3xl font-bold mb-8 text-center ${tw.text.primary}`}>
              Technical Excellence
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl mb-4">🎮</div>
                <h3 className={`text-xl font-bold mb-2 ${tw.text.accent}`}>Real-Time Rendering</h3>
                <p className={tw.text.secondary}>
                  Optimized for VR with 90+ FPS on Quest 2/3
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🔬</div>
                <h3 className={`text-xl font-bold mb-2 ${tw.text.accent}`}>Scientific Accuracy</h3>
                <p className={tw.text.secondary}>
                  Models based on marine biology research and NASA data
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl mb-4">🌊</div>
                <h3 className={`text-xl font-bold mb-2 ${tw.text.accent}`}>Dynamic Physics</h3>
                <p className={tw.text.secondary}>
                  Realistic water currents and fish behavior AI
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className={`text-3xl font-bold mb-6 ${tw.text.primary}`}>Experience It Yourself</h2>
          <p className={`text-xl ${tw.text.secondary} mb-8 max-w-2xl mx-auto`}>
            Download the demo and explore our scientifically accurate underwater world in VR
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" href="/#download">
              Download Demo
            </Button>
            <Button variant="outline" href="/world">
              Learn More
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

