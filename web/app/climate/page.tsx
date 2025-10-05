import Image from 'next/image';
import Link from 'next/link';

export default function ClimatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white pt-16">
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-20">
          <div className="h-96 md:h-[500px] bg-gradient-to-br from-red-900 via-orange-900 to-yellow-900 rounded-2xl shadow-2xl flex items-center justify-center mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="text-9xl z-10">🔥</div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
            Climate Change & Ocean Impact
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-4xl">
            Climate change is dramatically altering our oceans, with consequences that ripple through every ecosystem on Earth.
          </p>
        </div>

        {/* Warning Statistics */}
        <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 p-8 rounded-xl border-2 border-orange-600 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center text-orange-400">Critical Changes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-400 mb-2">+1.1°C</div>
              <div className="text-gray-300">Ocean Temperature Rise</div>
              <div className="text-sm text-gray-400 mt-1">Since pre-industrial times</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">3.3mm</div>
              <div className="text-gray-300">Sea Level Rise/Year</div>
              <div className="text-sm text-gray-400 mt-1">Rate is accelerating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">30%</div>
              <div className="text-gray-300">More Acidic</div>
              <div className="text-sm text-gray-400 mt-1">Than in 1750</div>
            </div>
          </div>
        </div>

        {/* Impact Sections */}
        <div className="space-y-12 mb-16">
          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🌡️</div>
              <h2 className="text-3xl font-bold text-red-400">Rising Ocean Temperatures</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              The ocean has absorbed more than 90% of the excess heat trapped by greenhouse gases. This warming is not uniform but affects different regions and depths variably, disrupting marine ecosystems that have evolved over millions of years.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Warmer waters hold less oxygen, creating "dead zones" where marine life struggles to survive. This also increases the frequency and intensity of marine heat waves, causing mass die-offs of fish, corals, and other species.
            </p>
            <div className="bg-red-900/20 p-4 rounded-lg mt-4">
              <p className="text-red-300 font-semibold">Impact: Coral bleaching, species migration, disrupted food chains</p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">📈</div>
              <h2 className="text-3xl font-bold text-orange-400">Sea Level Rise</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Global sea levels have risen about 8-9 inches (21-24 cm) since 1880, with about a third of that occurring in just the last 25 years. This rise comes from two main sources: thermal expansion as water warms and melting ice from glaciers and polar ice sheets.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Coastal communities face increasing risks from flooding, storm surges, and erosion. Low-lying islands and coastal cities are particularly vulnerable, with millions of people at risk of displacement.
            </p>
            <div className="bg-orange-900/20 p-4 rounded-lg mt-4">
              <p className="text-orange-300 font-semibold">Impact: Coastal flooding, habitat loss, infrastructure damage, forced migration</p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🧪</div>
              <h2 className="text-3xl font-bold text-yellow-400">Ocean Acidification</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              As the ocean absorbs excess CO2 from the atmosphere, it undergoes chemical changes that make it more acidic. The ocean's pH has dropped by 0.1 units since pre-industrial times, representing a 30% increase in acidity.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              This "other CO2 problem" makes it harder for marine organisms like corals, shellfish, and some plankton to build their calcium carbonate shells and skeletons. This affects the entire marine food web, from tiny pteropods to large fish species.
            </p>
            <div className="bg-yellow-900/20 p-4 rounded-lg mt-4">
              <p className="text-yellow-300 font-semibold">Impact: Shell dissolution, coral reef degradation, disrupted marine food webs</p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">❄️</div>
              <h2 className="text-3xl font-bold text-blue-400">Melting Polar Ice</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Arctic sea ice is declining at an alarming rate of about 13% per decade. The ice acts as a giant mirror, reflecting sunlight back into space. As it melts, darker ocean water absorbs more heat, accelerating warming in a dangerous feedback loop.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              The loss of sea ice affects polar ecosystems, from algae to polar bears, and contributes to global sea level rise. Changes in polar regions also affect ocean circulation patterns that regulate climate worldwide.
            </p>
            <div className="bg-blue-900/20 p-4 rounded-lg mt-4">
              <p className="text-blue-300 font-semibold">Impact: Ecosystem disruption, accelerated warming, sea level contribution</p>
            </div>
          </div>

          <div className="bg-gray-800/50 p-8 rounded-xl border border-gray-700">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🌀</div>
              <h2 className="text-3xl font-bold text-purple-400">Extreme Weather Events</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Warmer ocean temperatures fuel more intense hurricanes, typhoons, and cyclones. These storms draw energy from warm ocean water, and as that water heats up, storms can intensify more rapidly and cause greater damage.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Changes in ocean temperatures also affect atmospheric circulation patterns, leading to altered precipitation patterns, more severe droughts in some areas, and increased flooding in others.
            </p>
            <div className="bg-purple-900/20 p-4 rounded-lg mt-4">
              <p className="text-purple-300 font-semibold">Impact: Intensified storms, altered weather patterns, increased natural disasters</p>
            </div>
          </div>
        </div>

        {/* Solutions Section */}
        <div className="bg-gradient-to-br from-green-900/40 to-teal-900/40 p-8 rounded-xl border-2 border-green-600 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center text-green-400">What Can We Do?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌱</span>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-green-300">Reduce Carbon Emissions</h3>
                <p className="text-gray-300">Transition to renewable energy sources and reduce fossil fuel dependence</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-green-300">Protect Marine Ecosystems</h3>
                <p className="text-gray-300">Establish marine protected areas and reduce overfishing</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">♻️</span>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-green-300">Reduce Plastic Pollution</h3>
                <p className="text-gray-300">Minimize single-use plastics and improve waste management</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-green-300">Education & Awareness</h3>
                <p className="text-gray-300">Spread knowledge about ocean health and climate action</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Time to Act</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Understanding the challenges is the first step. Experience our virtual world to see the beauty worth protecting.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link 
              href="/world" 
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all transform hover:scale-105"
            >
              Explore Virtual World
            </Link>
            <Link 
              href="/seas" 
              className="px-8 py-3 border border-gray-400 hover:border-gray-300 rounded-lg font-semibold transition-colors"
            >
              Learn About Our Seas
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

