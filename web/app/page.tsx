import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
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
            <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
              Get Started
            </button>
            <button className="px-8 py-3 border border-gray-400 hover:border-gray-300 rounded-lg font-semibold transition-colors">
              Learn More
            </button>
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

        {/* Team Section */}
        <section className="py-16">
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


