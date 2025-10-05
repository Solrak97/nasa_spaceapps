import Image from 'next/image';
import Link from 'next/link';

export default function SeasPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-16">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-20">
          <div className="h-96 md:h-[500px] bg-gradient-to-br from-teal-900 via-cyan-900 to-blue-900 rounded-2xl shadow-2xl flex items-center justify-center mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="text-9xl z-10">🌊</div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600">
            The Vital Importance of Our Seas
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-4xl">
            Our oceans cover more than 70% of Earth's surface and are the foundation of life on our planet.
          </p>
        </div>

        {/* Statistics Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-gradient-to-br from-blue-900 to-cyan-900 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold mb-2">71%</div>
            <div className="text-gray-300">Of Earth's Surface</div>
          </div>
          <div className="bg-gradient-to-br from-teal-900 to-blue-900 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold mb-2">97%</div>
            <div className="text-gray-300">Of Earth's Water</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-900 to-blue-900 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold mb-2">50%</div>
            <div className="text-gray-300">Of Oxygen Produced</div>
          </div>
          <div className="bg-gradient-to-br from-blue-900 to-teal-900 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold mb-2">3B+</div>
            <div className="text-gray-300">People Depend On It</div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-12 mb-16">
          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🐠</div>
              <h2 className="text-3xl font-bold text-blue-400">Biodiversity Hotspot</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Oceans are home to an estimated 700,000 to 1 million species, with scientists believing that up to two-thirds of marine species are still waiting to be discovered. From microscopic plankton to massive blue whales, the ocean supports the most diverse ecosystems on Earth.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Coral reefs alone, covering less than 0.1% of the ocean floor, support approximately 25% of all marine species. These underwater cities are crucial for maintaining the delicate balance of marine life.
            </p>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🌡️</div>
              <h2 className="text-3xl font-bold text-teal-400">Climate Regulation</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Oceans act as the planet's thermostat, absorbing about 30% of carbon dioxide produced by humans and storing heat that would otherwise remain in the atmosphere. This absorption helps buffer the rate of climate change, though it comes at a cost.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Ocean currents distribute heat around the globe, influencing weather patterns and climate zones. The Gulf Stream, for example, carries warm water from the tropics to the North Atlantic, moderating the climate of Western Europe.
            </p>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">💨</div>
              <h2 className="text-3xl font-bold text-cyan-400">Oxygen Production</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Marine plants, particularly phytoplankton, produce approximately 50-80% of the oxygen in Earth's atmosphere. These microscopic organisms are the ocean's invisible forests, conducting photosynthesis on a massive scale.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Every second breath you take comes from the ocean. This vital process has been occurring for billions of years, making life on land possible and sustaining it to this day.
            </p>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🍽️</div>
              <h2 className="text-3xl font-bold text-blue-400">Food Security</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Over 3 billion people rely on marine and coastal biodiversity for their livelihoods. Fish provides about 16% of all animal protein consumed by humans, and in some coastal and island nations, this can be as high as 50-70%.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Sustainable fishing practices are essential to maintaining these vital food sources for future generations, supporting both nutrition and economic stability in coastal communities worldwide.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl border border-gray-700">
          <h2 className="text-3xl font-bold mb-6">Understanding Leads to Action</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Learn more about how climate change is affecting these vital ocean systems and what we can do to protect them.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/climate" 
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Climate Impact
            </Link>
            <Link 
              href="/world" 
              className="px-8 py-3 border border-gray-400 hover:border-gray-300 rounded-lg font-semibold transition-colors"
            >
              Explore Virtual World
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

