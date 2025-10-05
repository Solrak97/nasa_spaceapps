import Image from 'next/image';
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
          <div className="relative h-96 mb-12 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#85c6cf]/30">
            <Image
              src="/coral-reef-colorful.jpg"
              alt="Virtual ocean world"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06141B] via-[#06141B]/70 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${tw.text.primary} drop-shadow-2xl`}>
                  Virtual Ocean World
                </h1>
              </div>
            </div>
          </div>
          
          <PageHeader
            title="Explore Our Virtual World"
            description="Immerse yourself in a meticulously crafted virtual ocean environment built using real NASA data and cutting-edge 3D technology."
            gradient
          />
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card hover>
            <div className="relative w-24 h-24 mb-4 rounded-xl overflow-hidden shadow-lg ring-2 ring-[#85c6cf]/30">
              <Image
                src="/coral-reef-colorful.jpg"
                alt="NASA data integration"
                fill
                className="object-cover"
              />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${tw.text.accent}`}>NASA Data Integration</h2>
            <p className={`${tw.text.secondary} leading-relaxed`}>
              Our virtual world is built on authentic NASA digital elevation models and bathymetric data. Every underwater mountain, trench, and valley is accurately represented, giving you a scientifically precise view of the ocean floor that few have ever witnessed.
            </p>
          </Card>

          <Card hover>
            <div className="relative w-24 h-24 mb-4 rounded-xl overflow-hidden shadow-lg ring-2 ring-[#85c6cf]/30">
              <Image
                src="/vr-diving-underwater.jpg"
                alt="VR diving experience"
                fill
                className="object-cover"
              />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${tw.text.accent}`}>Immersive VR Experience</h2>
            <p className={`${tw.text.secondary} leading-relaxed`}>
              Using Godot Engine and OpenXR technology, we&apos;ve created a fully immersive virtual reality experience. Navigate freely through the depths, interact with the environment, and experience the ocean in ways that were previously impossible.
            </p>
          </Card>

          <Card hover>
            <div className="relative w-24 h-24 mb-4 rounded-xl overflow-hidden shadow-lg ring-2 ring-[#85c6cf]/30">
              <Image
                src="/jellyfish-bioluminescent.jpg"
                alt="Scientific accuracy"
                fill
                className="object-cover"
              />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${tw.text.accent}`}>Scientific Accuracy</h2>
            <p className={`${tw.text.secondary} leading-relaxed`}>
              Every detail in our virtual world is scientifically accurate. From geological formations to lighting effects that simulate different ocean depths, we&apos;ve worked to ensure an educational experience that doesn&apos;t compromise on realism.
            </p>
          </Card>

          <Card hover>
            <div className="relative w-24 h-24 mb-4 rounded-xl overflow-hidden shadow-lg ring-2 ring-[#85c6cf]/30">
              <Image
                src="/sea-turtle-swimming.jpg"
                alt="Dynamic ocean environment"
                fill
                className="object-cover"
              />
            </div>
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

        {/* Video Showcase */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-8 ${tw.text.primary}`}>Watch Our Demo</h2>
          <Card className="p-0 overflow-hidden">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                controls
                poster="/coral-reef-colorful.jpg"
                preload="metadata"
              >
                <source src="/game_screenshots/demo-showcase.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </Card>
        </div>

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

