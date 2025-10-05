import { PageHeader, HeroImageBox } from '../components/Hero';
import { StatsGrid } from '../components/StatCard';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { tw } from '../theme';

export default function ClimatePage() {
  return (
    <div className={`min-h-screen ${tw.gradient.background} ${tw.text.primary} pt-16`}>
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-20">
          <HeroImageBox icon="🔥" size="lg" className="mb-12" />
          
          <PageHeader
            title="Climate Change & Ocean Impact"
            description="Climate change is dramatically altering our oceans, with consequences that ripple through every ecosystem on Earth."
            gradient
          />
        </div>

        {/* Warning Statistics */}
        <Card className="p-8 mb-16 border-2">
          <h2 className={`text-2xl font-bold mb-6 text-center ${tw.text.accent}`}>Critical Changes</h2>
          <StatsGrid
            stats={[
              { value: '+1.1°C', label: 'Ocean Temperature Rise', sublabel: 'Since pre-industrial times' },
              { value: '3.3mm', label: 'Sea Level Rise/Year', sublabel: 'Rate is accelerating' },
              { value: '30%', label: 'More Acidic', sublabel: 'Than in 1750' },
            ]}
            columns={3}
            gradient={false}
          />
        </Card>

        {/* Impact Sections */}
        <div className="space-y-8 mb-16">
          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🌡️</div>
              <h2 className={`text-3xl font-bold ${tw.text.accent}`}>Rising Ocean Temperatures</h2>
            </div>
            <p className={`${tw.text.primary} text-lg leading-relaxed mb-4`}>
              The ocean has absorbed more than 90% of the excess heat trapped by greenhouse gases. This warming is not uniform but affects different regions and depths variably, disrupting marine ecosystems that have evolved over millions of years.
            </p>
            <p className={`${tw.text.secondary} text-lg leading-relaxed mb-4`}>
              Warmer waters hold less oxygen, creating &ldquo;dead zones&rdquo; where marine life struggles to survive. This also increases the frequency and intensity of marine heat waves, causing mass die-offs of fish, corals, and other species.
            </p>
            <div className={`${tw.bg.primary} p-4 rounded-lg mt-4 ${tw.border.subtle}`}>
              <p className={`${tw.text.secondary} font-semibold`}>Impact: Coral bleaching, species migration, disrupted food chains</p>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">📈</div>
              <h2 className={`text-3xl font-bold ${tw.text.accent}`}>Sea Level Rise</h2>
            </div>
            <p className={`${tw.text.primary} text-lg leading-relaxed mb-4`}>
              Global sea levels have risen about 8-9 inches (21-24 cm) since 1880, with about a third of that occurring in just the last 25 years. This rise comes from two main sources: thermal expansion as water warms and melting ice from glaciers and polar ice sheets.
            </p>
            <p className={`${tw.text.secondary} text-lg leading-relaxed mb-4`}>
              Coastal communities face increasing risks from flooding, storm surges, and erosion. Low-lying islands and coastal cities are particularly vulnerable, with millions of people at risk of displacement.
            </p>
            <div className={`${tw.bg.primary} p-4 rounded-lg mt-4 ${tw.border.subtle}`}>
              <p className={`${tw.text.secondary} font-semibold`}>Impact: Coastal flooding, habitat loss, infrastructure damage, forced migration</p>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🧪</div>
              <h2 className={`text-3xl font-bold ${tw.text.accent}`}>Ocean Acidification</h2>
            </div>
            <p className={`${tw.text.primary} text-lg leading-relaxed mb-4`}>
              As the ocean absorbs excess CO2 from the atmosphere, it undergoes chemical changes that make it more acidic. The ocean&apos;s pH has dropped by 0.1 units since pre-industrial times, representing a 30% increase in acidity.
            </p>
            <p className={`${tw.text.secondary} text-lg leading-relaxed mb-4`}>
              This &ldquo;other CO2 problem&rdquo; makes it harder for marine organisms like corals, shellfish, and some plankton to build their calcium carbonate shells and skeletons. This affects the entire marine food web, from tiny pteropods to large fish species.
            </p>
            <div className={`${tw.bg.primary} p-4 rounded-lg mt-4 ${tw.border.medium}`}>
              <p className={`${tw.text.accent} font-semibold`}>Impact: Shell dissolution, coral reef degradation, disrupted marine food webs</p>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">❄️</div>
              <h2 className={`text-3xl font-bold ${tw.text.accent}`}>Melting Polar Ice</h2>
            </div>
            <p className={`${tw.text.primary} text-lg leading-relaxed mb-4`}>
              Arctic sea ice is declining at an alarming rate of about 13% per decade. The ice acts as a giant mirror, reflecting sunlight back into space. As it melts, darker ocean water absorbs more heat, accelerating warming in a dangerous feedback loop.
            </p>
            <p className={`${tw.text.secondary} text-lg leading-relaxed mb-4`}>
              The loss of sea ice affects polar ecosystems, from algae to polar bears, and contributes to global sea level rise. Changes in polar regions also affect ocean circulation patterns that regulate climate worldwide.
            </p>
            <div className={`${tw.bg.primary} p-4 rounded-lg mt-4 ${tw.border.medium}`}>
              <p className={`${tw.text.accent} font-semibold`}>Impact: Ecosystem disruption, accelerated warming, sea level contribution</p>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🌀</div>
              <h2 className={`text-3xl font-bold ${tw.text.accent}`}>Extreme Weather Events</h2>
            </div>
            <p className={`${tw.text.primary} text-lg leading-relaxed mb-4`}>
              Warmer ocean temperatures fuel more intense hurricanes, typhoons, and cyclones. These storms draw energy from warm ocean water, and as that water heats up, storms can intensify more rapidly and cause greater damage.
            </p>
            <p className={`${tw.text.secondary} text-lg leading-relaxed mb-4`}>
              Changes in ocean temperatures also affect atmospheric circulation patterns, leading to altered precipitation patterns, more severe droughts in some areas, and increased flooding in others.
            </p>
            <div className={`${tw.bg.primary} p-4 rounded-lg mt-4 ${tw.border.subtle}`}>
              <p className={`${tw.text.secondary} font-semibold`}>Impact: Intensified storms, altered weather patterns, increased natural disasters</p>
            </div>
          </Card>
        </div>

        {/* Solutions Section */}
        <Card className="p-8 mb-16 border-2">
          <h2 className={`text-3xl font-bold mb-6 text-center ${tw.text.accent}`}>What Can We Do?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🌱</span>
              <div>
                <h3 className={`font-semibold text-lg mb-2 ${tw.text.primary}`}>Reduce Carbon Emissions</h3>
                <p className={tw.text.secondary}>Transition to renewable energy sources and reduce fossil fuel dependence</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🛡️</span>
              <div>
                <h3 className={`font-semibold text-lg mb-2 ${tw.text.primary}`}>Protect Marine Ecosystems</h3>
                <p className={tw.text.secondary}>Establish marine protected areas and reduce overfishing</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">♻️</span>
              <div>
                <h3 className={`font-semibold text-lg mb-2 ${tw.text.primary}`}>Reduce Plastic Pollution</h3>
                <p className={tw.text.secondary}>Minimize single-use plastics and improve waste management</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">📚</span>
              <div>
                <h3 className={`font-semibold text-lg mb-2 ${tw.text.primary}`}>Education & Awareness</h3>
                <p className={tw.text.secondary}>Spread knowledge about ocean health and climate action</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className={`text-3xl font-bold mb-6 ${tw.text.primary}`}>Time to Act</h2>
          <p className={`text-xl ${tw.text.secondary} mb-8 max-w-2xl mx-auto`}>
            Understanding the challenges is the first step. Experience our virtual world to see the beauty worth protecting.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" href="/#download">
              Download Demo
            </Button>
            <Button variant="outline" href="/seas">
              Learn About Our Seas
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
