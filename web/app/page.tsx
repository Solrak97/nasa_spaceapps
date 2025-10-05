import Image from 'next/image';
import Link from 'next/link';
import { Hero } from './components/Hero';
import { Card, FeatureCard } from './components/Card';
import { Section, SectionContainer } from './components/Section';
import { Resources } from './components/Resources';
import { DownloadSection } from './components/Download';
import { TeamGrid } from './components/TeamCard';
import { Button } from './components/Button';
import { tw } from './theme';
import type { TeamMember } from './components/TeamCard';

const teamMembers: TeamMember[] = [
  {
    name: 'Oscar Quesada Webb',
    role: 'Team Lead',
    icon: '👨‍💻',
    responsibilities: ['Direction of the project', 'VR Godot development'],
  },
  {
    name: 'Luis Carlos Quesada',
    role: 'AI Engineer & Web Developer',
    icon: '🤖',
    responsibilities: ['AI Engineering', 'Web page development'],
  },
  {
    name: 'Archibald Emmanuel Carrion Claeys',
    role: '3D Mesh Engineer',
    icon: '🗺️',
    responsibilities: ['Generating Godot compatible meshes', 'Digital elevation model data processing', 'NASA data integration'],
  },
  {
    name: 'Camila Fariñas',
    role: 'Data Visualization Specialist',
    icon: '🌊',
    responsibilities: ['Using NASA data to produce ocean renders', 'Coast of Costa Rica visualizations'],
  },
  {
    name: 'Javier Solano Saltachín',
    role: 'Jr Developer',
    icon: '🎙️',
    responsibilities: ['Speech recognition integration', 'LLM integration for VR immersion', 'UX enhancement'],
  },
];

export default function Home() {
  return (
    <div className={`min-h-screen ${tw.gradient.background} ${tw.text.primary} pt-16`}>
      {/* Hero Banner */}
      <Hero
        title="Deep Ocean"
        subtitle="by Chifrijo Cósmico"
        description="Exploring the depths of our oceans using cutting-edge VR technology and NASA data"
        variant="centered"
        size="lg"
        backgroundImage="/hero-ocean-depths.jpg"
        actions={[
          { label: 'Download Demo', href: '#download', variant: 'primary' },
          { label: 'Explore Features', href: '#explore', variant: 'outline' },
        ]}
      />
      
      <main className="container mx-auto px-4 py-16">

        {/* Demo Video Showcase */}
        <section className="py-16 mb-16">
          <div className="text-center mb-12">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent ${tw.gradient.text}`}>
              See It In Action
            </h2>
            <p className={`text-lg ${tw.text.secondary} max-w-2xl mx-auto`}>
              Watch our VR ocean exploration demo in action
            </p>
          </div>
          
          <Card className="p-0 overflow-hidden max-w-5xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                controls
                poster="/hero-ocean-depths.jpg"
                preload="metadata"
              >
                <source src="/game_screenshots/demo-showcase.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className={`p-6 ${tw.bg.card}`}>
              <h3 className={`text-xl font-bold mb-2 ${tw.text.accent}`}>Deep Ocean VR Demo</h3>
              <p className={tw.text.secondary}>
                Experience the immersive underwater world we&apos;ve created using NASA data and cutting-edge VR technology. 
                Navigate through realistic ocean environments and interact with marine life.
              </p>
            </div>
          </Card>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${tw.text.primary}`}>
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <FeatureCard
              image="/vr-diving-underwater.jpg"
              imageAlt="VR underwater diving experience"
              title="VR Ocean Exploration"
              description="Immersive virtual reality experience of deep ocean environments"
            />
            <FeatureCard
              image="/coral-reef-colorful.jpg"
              imageAlt="Colorful coral reef with NASA data"
              title="NASA Data Integration"
              description="Utilizing real elevation models and ocean data from NASA"
            />
            <FeatureCard
              image="/ai-ocean-guide.jpg"
              imageAlt="AI-powered ocean guide"
              title="AI-Powered Experience"
              description="Speech recognition and LLM integration for enhanced immersion"
            />
          </div>
        </section>

        {/* Explore Sections - Quick Overview */}
        <section id="explore" className="py-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-4 bg-clip-text text-transparent ${tw.gradient.text}`}>
            Explore Virtual Spaces
          </h2>
          <p className={`text-center ${tw.text.secondary} mb-12 max-w-2xl mx-auto`}>
            Discover our scientifically accurate virtual ocean environments
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className={`${tw.bg.card} ${tw.border.medium} hover:${tw.border.strong} p-8 rounded-xl text-center transition-all shadow-lg group`}>
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🌍</div>
              <h3 className={`text-xl font-bold mb-3 ${tw.text.accent}`}>Virtual World</h3>
              <p className={`${tw.text.secondary} mb-4 text-sm`}>
                Explore realistic underwater landscapes built with NASA digital elevation models
              </p>
              <Button variant="outline" href="/world" size="sm">
                Explore →
              </Button>
            </div>

            <div className={`${tw.bg.card} ${tw.border.medium} hover:${tw.border.strong} p-8 rounded-xl text-center transition-all shadow-lg group`}>
              <div className="relative w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden shadow-lg group-hover:scale-110 transition-transform ring-2 ring-[#85c6cf]/30">
                <Image
                  src="/game_screenshots/marine-biodiversity.jpg"
                  alt="Marine biodiversity"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${tw.text.accent}`}>Our Seas</h3>
              <p className={`${tw.text.secondary} mb-4 text-sm`}>
                Learn about ocean biodiversity, climate regulation, and vital ecosystem services
              </p>
              <Button variant="outline" href="/seas" size="sm">
                Learn More →
              </Button>
            </div>

            <div className={`${tw.bg.card} ${tw.border.medium} hover:${tw.border.strong} p-8 rounded-xl text-center transition-all shadow-lg group`}>
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🔥</div>
              <h3 className={`text-xl font-bold mb-3 ${tw.text.accent}`}>Climate Impact</h3>
              <p className={`${tw.text.secondary} mb-4 text-sm`}>
                Understand how climate change is affecting our oceans and marine ecosystems
              </p>
              <Button variant="outline" href="/climate" size="sm">
                See Impact →
              </Button>
            </div>
          </div>

          {/* Gallery Preview */}
          <div className="mt-12">
            <Card className="p-8 text-center bg-gradient-to-br from-[#0a1c24] to-[#06141B] border-2 border-[#85c6cf]/40">
              <div className="text-5xl mb-4">🎨</div>
              <h3 className={`text-2xl font-bold mb-3 ${tw.text.accent}`}>VR Gallery</h3>
              <p className={`${tw.text.secondary} mb-6 max-w-xl mx-auto`}>
                Compare our VR models to real ocean life. See the scientific accuracy behind our 3D recreations.
              </p>
              <Button variant="primary" href="/gallery">
                View Gallery →
              </Button>
            </Card>
          </div>
        </section>

        {/* Download Section - Primary CTA */}
        <DownloadSection
          title="Download Deep Ocean VR"
          subtitle="Immersive Ocean Exploration"
          description="Experience the depths of the ocean in virtual reality using real NASA data. Compatible with Meta Quest, PC VR headsets, and desktop platforms."
          comingSoon
          releaseDate="Demo Coming Soon"
          downloads={[
            {
              platform: 'Meta Quest 2/3',
              icon: '🥽',
              comingSoon: true,
            },
            {
              platform: 'PC VR (SteamVR)',
              icon: '💻',
              comingSoon: true,
            },
            {
              platform: 'Windows Desktop',
              icon: '🪟',
              comingSoon: true,
            },
            {
              platform: 'macOS',
              icon: '🍎',
              comingSoon: true,
            },
          ]}
        />

        {/* Team Preview Section */}
        <section id="team" className="py-16">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#85c6cf] to-[#e8f3f2] rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <Image 
              src="/team-logo.jpeg" 
              alt="Chifrijo Cósmico Logo" 
                  width={120} 
                  height={120}
                  className="rounded-full shadow-2xl border-4 border-[#85c6cf]/50 relative z-10"
                />
              </div>
          </div>
          
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${tw.text.primary}`}>
            Meet Our Team
          </h2>
            <p className={`text-lg ${tw.text.secondary} mb-8 max-w-2xl mx-auto`}>
              A passionate group of developers, engineers, and innovators from Chifrijo Cósmico
            </p>
            
            <TeamGrid members={teamMembers.slice(0, 3)} columns={3} className="max-w-5xl mx-auto mb-8" />
            
            <Button variant="outline" href="/team" size="md">
              View Full Team →
            </Button>
          </div>
        </section>

        {/* Resources Section */}
        <Resources
          title="Project Resources"
          description="Access our code, documentation, and links"
          resources={[
            {
              title: 'GitHub Repository',
              description: 'View our source code and contribute to development',
              url: 'https://github.com/yourusername/deep-ocean',
              type: 'github',
              icon: '💻',
            },
            {
              title: 'NASA Space Apps Challenge',
              description: 'Our official challenge submission page',
              url: 'https://www.spaceappschallenge.org/',
              type: 'external',
              icon: '🚀',
            },
            {
              title: 'NASA Ocean Data',
              description: 'Datasets and elevation models we used',
              url: 'https://earthdata.nasa.gov/',
              type: 'external',
              icon: '🌊',
            },
          ]}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#85c6cf]/30 py-8 bg-[#001117]">
        <div className="container mx-auto px-4 text-center text-[#c5d0cd]">
          <p>&copy; 2025 Chifrijo Cósmico - NASA Space Apps Challenge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}



