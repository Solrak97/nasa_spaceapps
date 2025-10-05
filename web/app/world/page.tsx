import { PageHeader, HeroImageBox } from '../components/Hero';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { tw } from '../theme';

export default function WorldPage() {
  return (
    <div className={`min-h-screen ${tw.gradient.background} ${tw.text.primary} pt-16`}>
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-20">
          <HeroImageBox icon="🌍" size="lg" gradient className="mb-12" />
          
          <PageHeader
            title="Explore Our Virtual World"
            description="Immerse yourself in a meticulously crafted virtual ocean environment built using real NASA data and cutting-edge 3D technology."
            gradient
          />
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card hover>
            <div className="text-5xl mb-4">🗺️</div>
            <h2 className={`text-2xl font-bold mb-4 ${tw.text.accent}`}>NASA Data Integration</h2>
            <p className={`${tw.text.secondary} leading-relaxed`}>
              Our virtual world is built on authentic NASA digital elevation models and bathymetric data. Every underwater mountain, trench, and valley is accurately represented, giving you a scientifically precise view of the ocean floor that few have ever witnessed.
            </p>
          </Card>

          <Card hover>
            <div className="text-5xl mb-4">🎮</div>
            <h2 className={`text-2xl font-bold mb-4 ${tw.text.accent}`}>Immersive VR Experience</h2>
            <p className={`${tw.text.secondary} leading-relaxed`}>
              Using Godot Engine and OpenXR technology, we&apos;ve created a fully immersive virtual reality experience. Navigate freely through the depths, interact with the environment, and experience the ocean in ways that were previously impossible.
            </p>
          </Card>

          <Card hover>
            <div className="text-5xl mb-4">🔬</div>
            <h2 className={`text-2xl font-bold mb-4 ${tw.text.accent}`}>Scientific Accuracy</h2>
            <p className={`${tw.text.secondary} leading-relaxed`}>
              Every detail in our virtual world is scientifically accurate. From geological formations to lighting effects that simulate different ocean depths, we&apos;ve worked to ensure an educational experience that doesn&apos;t compromise on realism.
            </p>
          </Card>

          <Card hover>
            <div className="text-5xl mb-4">🌊</div>
            <h2 className={`text-2xl font-bold mb-4 ${tw.text.accent}`}>Dynamic Environments</h2>
            <p className={`${tw.text.secondary} leading-relaxed`}>
              Experience dynamic underwater environments with realistic physics, water effects, and atmospheric conditions. Our world responds to your presence, creating an engaging and lifelike simulation of ocean exploration.
            </p>
          </Card>
        </div>

        {/* Features List */}
        <Card className="p-10 mb-16">
          <h2 className={`text-3xl font-bold mb-8 text-center ${tw.text.primary}`}>Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className={`text-2xl ${tw.text.accent}`}>✓</span>
              <div>
                <h3 className={`font-semibold text-lg mb-1 ${tw.text.primary}`}>Real-time 3D Rendering</h3>
                <p className={tw.text.secondary}>High-performance graphics optimized for VR headsets</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className={`text-2xl ${tw.text.accent}`}>✓</span>
              <div>
                <h3 className={`font-semibold text-lg mb-1 ${tw.text.primary}`}>Interactive Exploration</h3>
                <p className={tw.text.secondary}>Free movement and interaction with the environment</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className={`text-2xl ${tw.text.accent}`}>✓</span>
              <div>
                <h3 className={`font-semibold text-lg mb-1 ${tw.text.primary}`}>Educational Content</h3>
                <p className={tw.text.secondary}>Learn about ocean geography and marine ecosystems</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className={`text-2xl ${tw.text.accent}`}>✓</span>
              <div>
                <h3 className={`font-semibold text-lg mb-1 ${tw.text.primary}`}>AI-Powered Guides</h3>
                <p className={tw.text.secondary}>Voice-activated AI assistants to enhance your journey</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className={`text-3xl font-bold mb-6 ${tw.text.primary}`}>Ready to Dive In?</h2>
          <p className={`text-xl ${tw.text.secondary} mb-8 max-w-2xl mx-auto`}>
            Experience the underwater world like never before with cutting-edge VR technology and real scientific data.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" href="/#download">
              Download Demo
            </Button>
            <Button variant="outline" href="/seas">
              Discover Our Seas
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

