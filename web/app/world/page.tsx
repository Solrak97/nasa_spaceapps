import Image from 'next/image';
import Link from 'next/link';

export default function WorldPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-16">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-20">
          <div className="h-96 md:h-[500px] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-2xl shadow-2xl flex items-center justify-center mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="text-9xl z-10">🌍</div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Explore Our Virtual World
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-4xl">
            Immerse yourself in a meticulously crafted virtual ocean environment built using real NASA data and cutting-edge 3D technology.
          </p>
        </div>

        {/* Content Sections */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="text-5xl mb-4">🗺️</div>
            <h2 className="text-2xl font-bold mb-4 text-blue-400">NASA Data Integration</h2>
            <p className="text-gray-300 leading-relaxed">
              Our virtual world is built on authentic NASA digital elevation models and bathymetric data. Every underwater mountain, trench, and valley is accurately represented, giving you a scientifically precise view of the ocean floor that few have ever witnessed.
            </p>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="text-5xl mb-4">🎮</div>
            <h2 className="text-2xl font-bold mb-4 text-purple-400">Immersive VR Experience</h2>
            <p className="text-gray-300 leading-relaxed">
              Using Godot Engine and OpenXR technology, we&apos;ve created a fully immersive virtual reality experience. Navigate freely through the depths, interact with the environment, and experience the ocean in ways that were previously impossible.
            </p>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="text-5xl mb-4">🔬</div>
            <h2 className="text-2xl font-bold mb-4 text-teal-400">Scientific Accuracy</h2>
            <p className="text-gray-300 leading-relaxed">
              Every detail in our virtual world is scientifically accurate. From geological formations to lighting effects that simulate different ocean depths, we&apos;ve worked to ensure an educational experience that doesn&apos;t compromise on realism.
            </p>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="text-5xl mb-4">🌊</div>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Dynamic Environments</h2>
            <p className="text-gray-300 leading-relaxed">
              Experience dynamic underwater environments with realistic physics, water effects, and atmospheric conditions. Our world responds to your presence, creating an engaging and lifelike simulation of ocean exploration.
            </p>
          </div>
        </div>

        {/* Features List */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl border border-gray-700 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold text-lg mb-1">Real-time 3D Rendering</h3>
                <p className="text-gray-400">High-performance graphics optimized for VR headsets</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold text-lg mb-1">Interactive Exploration</h3>
                <p className="text-gray-400">Free movement and interaction with the environment</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold text-lg mb-1">Educational Content</h3>
                <p className="text-gray-400">Learn about ocean geography and marine ecosystems</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <h3 className="font-semibold text-lg mb-1">AI-Powered Guides</h3>
                <p className="text-gray-400">Voice-activated AI assistants to enhance your journey</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Dive In?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the underwater world like never before with cutting-edge VR technology and real scientific data.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/seas" 
              className="px-8 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Discover Our Seas
            </Link>
            <Link 
              href="/#team" 
              className="px-8 py-3 border border-gray-400 hover:border-gray-300 rounded-lg font-semibold transition-colors"
            >
              Meet the Team
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

