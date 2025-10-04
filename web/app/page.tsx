export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            NASA Space Apps Challenge
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl">
            Building the future of space exploration through innovation and collaboration
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
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-400">
                Cutting-edge solutions for space exploration challenges
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Global Impact</h3>
              <p className="text-gray-400">
                Making a difference for Earth and beyond
              </p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Collaboration</h3>
              <p className="text-gray-400">
                Working together to solve complex problems
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2025 NASA Space Apps Challenge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}


