import Image from 'next/image';
import { PageHeader, HeroImageBox } from '../components/Hero';
import { StatsGrid } from '../components/StatCard';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { tw } from '../theme';

export default function SeasPage() {
  return (
    <div className={`min-h-screen ${tw.gradient.background} ${tw.text.primary} pt-16`}>
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="mb-20">
          <div className="relative h-96 mb-12 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#85c6cf]/30">
            <Image
              src="/game_screenshots/marine-biodiversity.jpg"
              alt="Ocean biodiversity"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06141B] via-[#06141B]/70 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${tw.text.primary} drop-shadow-2xl`}>
                  Our Living Seas
                </h1>
              </div>
            </div>
          </div>
          
          <PageHeader
            title="The Vital Importance of Our Seas"
            description="Our oceans cover more than 70% of Earth's surface and are the foundation of life on our planet."
            gradient
          />
        </div>

        {/* Statistics Section */}
        <StatsGrid
          stats={[
            { value: '71%', label: "Of Earth's Surface" },
            { value: '97%', label: "Of Earth's Water" },
            { value: '50%', label: 'Of Oxygen Produced' },
            { value: '3B+', label: 'People Depend On It' },
          ]}
          columns={4}
          className="mb-16"
        />

        {/* Content Sections */}
        <div className="space-y-8 mb-16">
          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-lg ring-2 ring-[#85c6cf]/30">
                <Image
                  src="/sea-turtle-swimming.jpg"
                  alt="Marine biodiversity"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className={`text-3xl font-bold ${tw.text.accent}`}>Biodiversity Hotspot</h2>
            </div>
            <p className={`${tw.text.primary} text-lg leading-relaxed mb-4`}>
              Oceans are home to an estimated 700,000 to 1 million species, with scientists believing that up to two-thirds of marine species are still waiting to be discovered. From microscopic plankton to massive blue whales, the ocean supports the most diverse ecosystems on Earth.
            </p>
            <p className={`${tw.text.secondary} text-lg leading-relaxed`}>
              Coral reefs alone, covering less than 0.1% of the ocean floor, support approximately 25% of all marine species. These underwater cities are crucial for maintaining the delicate balance of marine life.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🌡️</div>
              <h2 className={`text-3xl font-bold ${tw.text.accent}`}>Climate Regulation</h2>
            </div>
            <p className={`${tw.text.primary} text-lg leading-relaxed mb-4`}>
              Oceans act as the planet&apos;s thermostat, absorbing about 30% of carbon dioxide produced by humans and storing heat that would otherwise remain in the atmosphere. This absorption helps buffer the rate of climate change, though it comes at a cost.
            </p>
            <p className={`${tw.text.secondary} text-lg leading-relaxed`}>
              Ocean currents distribute heat around the globe, influencing weather patterns and climate zones. The Gulf Stream, for example, carries warm water from the tropics to the North Atlantic, moderating the climate of Western Europe.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">💨</div>
              <h2 className={`text-3xl font-bold ${tw.text.accent}`}>Oxygen Production</h2>
            </div>
            <p className={`${tw.text.primary} text-lg leading-relaxed mb-4`}>
              Marine plants, particularly phytoplankton, produce approximately 50-80% of the oxygen in Earth&apos;s atmosphere. These microscopic organisms are the ocean&apos;s invisible forests, conducting photosynthesis on a massive scale.
            </p>
            <p className={`${tw.text.secondary} text-lg leading-relaxed`}>
              Every second breath you take comes from the ocean. This vital process has been occurring for billions of years, making life on land possible and sustaining it to this day.
            </p>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🍽️</div>
              <h2 className={`text-3xl font-bold ${tw.text.accent}`}>Food Security</h2>
            </div>
            <p className={`${tw.text.primary} text-lg leading-relaxed mb-4`}>
              Over 3 billion people rely on marine and coastal biodiversity for their livelihoods. Fish provides about 16% of all animal protein consumed by humans, and in some coastal and island nations, this can be as high as 50-70%.
            </p>
            <p className={`${tw.text.secondary} text-lg leading-relaxed`}>
              Sustainable fishing practices are essential to maintaining these vital food sources for future generations, supporting both nutrition and economic stability in coastal communities worldwide.
            </p>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="text-center p-10">
          <h2 className={`text-3xl font-bold mb-6 ${tw.text.primary}`}>Understanding Leads to Action</h2>
          <p className={`text-xl ${tw.text.secondary} mb-8 max-w-2xl mx-auto`}>
            Learn more about how climate change is affecting these vital ocean systems and what we can do to protect them.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="secondary" href="/climate">
              Climate Impact
            </Button>
            <Button variant="outline" href="/world">
              Explore Virtual World
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
}

