import Image from 'next/image';
import Link from 'next/link';
import { Hero } from './components/Hero';
import { FeatureCard } from './components/Card';
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
        actions={[
          { label: 'Download Demo', href: '#download', variant: 'primary' },
          { label: 'Explore Features', href: '#explore', variant: 'outline' },
        ]}
      />
      
      <main className="container mx-auto px-4 py-16">

        {/* Features Section */}
        <section className="py-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 ${tw.text.primary}`}>
            Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <FeatureCard
              icon="🌊"
              title="VR Ocean Exploration"
              description="Immersive virtual reality experience of deep ocean environments"
            />
            <FeatureCard
              icon="🗺️"
              title="NASA Data Integration"
              description="Utilizing real elevation models and ocean data from NASA"
            />
            <FeatureCard
              icon="🤖"
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
              <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">🌊</div>
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



