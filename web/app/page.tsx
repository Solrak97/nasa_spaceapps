import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-16">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {/* App Logo */}
          <div className="mb-8">
            <Image 
              src="/deep-ocean.png" 
              alt="Deep Ocean Logo" 
              width={250} 
              height={250}
              className="rounded-lg shadow-2xl"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Deep Ocean
          </h1>
          <p className="text-2xl md:text-3xl text-orange-400 mb-6 font-semibold">
            by Chifrijo Cósmico
          </p>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl">
            Exploring the depths of our oceans using cutting-edge VR technology and NASA data
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link href="/world" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
              Get Started
            </Link>
            <Link href="#virtual-spaces" className="px-8 py-3 border border-gray-400 hover:border-gray-300 rounded-lg font-semibold transition-colors">
              Learn More
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="text-xl font-semibold mb-2">VR Ocean Exploration</h3>
              <p className="text-gray-400">
                Immersive virtual reality experience of deep ocean environments
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold mb-2">NASA Data Integration</h3>
              <p className="text-gray-400">
                Utilizing real elevation models and ocean data from NASA
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Experience</h3>
              <p className="text-gray-400">
                Speech recognition and LLM integration for enhanced immersion
              </p>
            </div>
          </div>
        </section>

        {/* Virtual Spaces Section */}
        <section id="virtual-spaces" className="py-20">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Virtual Spaces
          </h2>
          
          {/* World Description Section */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="h-96 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-8xl">🌍</div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">
                  Explore Our Virtual World
                </h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Immerse yourself in a meticulously crafted virtual ocean environment built using real NASA data and cutting-edge 3D technology. Our virtual world recreates the mysterious depths of the ocean floor with unprecedented accuracy and detail.
                </p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Navigate through realistic underwater landscapes, discover hidden geological formations, and witness the beauty of marine ecosystems as you&apos;ve never seen them before. Every detail is scientifically accurate, providing an educational and awe-inspiring experience.
                </p>
                <Link href="/world" className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all transform hover:scale-105">
                  Explore World
                </Link>
              </div>
            </div>
          </div>

          {/* Sea Importance Section */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">
                  The Vital Importance of Our Seas
                </h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Our oceans cover more than 70% of Earth&apos;s surface and are home to countless species that form the foundation of our planet&apos;s biodiversity. They regulate climate, produce oxygen, and support millions of livelihoods worldwide.
                </p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Through our virtual experience, understand the critical role oceans play in maintaining ecological balance, supporting marine life, and providing essential resources that sustain life on Earth. Discover the interconnected web of life beneath the waves.
                </p>
                <Link href="/seas" className="inline-block px-6 py-3 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 rounded-lg font-semibold transition-all transform hover:scale-105">
                  Learn About Seas
                </Link>
              </div>
              <div>
                <div className="h-96 bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-8xl">🌊</div>
                </div>
              </div>
            </div>
          </div>

          {/* Climate Change Impact Section */}
          <div className="mb-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="h-96 bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 rounded-2xl shadow-2xl flex items-center justify-center">
                  <div className="text-8xl">🔥</div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-orange-400">
                  Climate Change & Ocean Impact
                </h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Climate change is dramatically affecting our oceans through rising sea levels, ocean acidification, and increased water temperatures. These changes threaten marine ecosystems and have cascading effects on global weather patterns.
                </p>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Our virtual experience allows you to witness the effects of climate change on ocean environments, helping you understand the urgency of environmental action. See how rising temperatures and changing conditions impact marine life and coastal communities.
                </p>
                <Link href="/climate" className="inline-block px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-lg font-semibold transition-all transform hover:scale-105">
                  See Climate Impact
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-16">
          {/* Team Logo */}
          <div className="flex justify-center mb-8">
            <Image 
              src="/team-logo.jpeg" 
              alt="Chifrijo Cósmico Logo" 
              width={150} 
              height={150}
              className="rounded-full shadow-lg"
            />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            A passionate group of developers, engineers, and innovators working together to bring ocean exploration to virtual reality
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Team Member 1 */}
            <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">👨‍💻</div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">Oscar Quesada Webb</h3>
              <p className="text-sm text-orange-400 mb-3 font-semibold">Team Lead</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Direction of the project</li>
                <li>• VR Godot development</li>
              </ul>
            </div>

            {/* Team Member 2 */}
            <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">Luis Carlos Quesada</h3>
              <p className="text-sm text-orange-400 mb-3 font-semibold">AI Engineer & Web Developer</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• AI Engineering</li>
                <li>• Web page development</li>
              </ul>
            </div>

            {/* Team Member 3 */}
            <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">Archibald Emmanuel Carrion Claeys</h3>
              <p className="text-sm text-orange-400 mb-3 font-semibold">3D Mesh Engineer</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Generating Godot compatible meshes</li>
                <li>• Digital elevation model data processing</li>
                <li>• NASA data integration</li>
              </ul>
            </div>

            {/* Team Member 4 */}
            <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">Camila Fariñas</h3>
              <p className="text-sm text-orange-400 mb-3 font-semibold">Data Visualization Specialist</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Using NASA data to produce ocean renders</li>
                <li>• Coast of Costa Rica visualizations</li>
              </ul>
            </div>

            {/* Team Member 5 */}
            <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-all">
              <div className="text-4xl mb-4">🎙️</div>
              <h3 className="text-xl font-bold mb-2 text-blue-400">Javier Solano Saltachín</h3>
              <p className="text-sm text-orange-400 mb-3 font-semibold">Jr Developer</p>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Speech recognition integration</li>
                <li>• LLM integration for VR immersion</li>
                <li>• UX enhancement</li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 Chifrijo Cósmico - NASA Space Apps Challenge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}



