import Image from 'next/image';
import { PageHeader } from '../components/Hero';
import { TeamGrid } from '../components/TeamCard';
import { tw } from '../theme';
import type { TeamMember } from '../components/TeamCard';

const teamMembers: TeamMember[] = [
  {
    name: 'Oscar Quesada Webb',
    role: 'Team Lead',
    icon: '👨‍💻',
    responsibilities: [
      'Direction of the project',
      'VR Godot development',
    ],
  },
  {
    name: 'Luis Carlos Quesada',
    role: 'AI Engineer & Web Developer',
    icon: '🤖',
    responsibilities: [
      'AI Engineering',
      'Web page development',
    ],
  },
  {
    name: 'Archibald Emmanuel Carrion Claeys',
    role: '3D Mesh Engineer',
    icon: '🗺️',
    responsibilities: [
      'Generating Godot compatible meshes',
      'Digital elevation model data processing',
      'NASA data integration',
    ],
  },
  {
    name: 'Camila Fariñas',
    role: 'Data Visualization Specialist',
    icon: '🌊',
    responsibilities: [
      'Using NASA data to produce ocean renders',
      'Coast of Costa Rica visualizations',
    ],
  },
  {
    name: 'Javier Solano Saltachín',
    role: 'Jr Developer',
    icon: '🎙️',
    responsibilities: [
      'Speech recognition integration',
      'LLM integration for VR immersion',
      'UX enhancement',
    ],
  },
];

export default function TeamPage() {
  return (
    <div className={`min-h-screen ${tw.gradient.background} ${tw.text.primary} pt-16`}>
      <main className="container mx-auto px-4 py-16">
        {/* Team Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#85c6cf] to-[#e8f3f2] rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <Image 
              src="/team-logo.jpeg" 
              alt="Chifrijo Cósmico Logo" 
              width={180} 
              height={180}
              className="rounded-full shadow-2xl border-4 border-[#85c6cf]/50 relative z-10 group-hover:border-[#85c6cf] transition-all"
            />
          </div>
        </div>

        <PageHeader
          title="Meet Our Team"
          description="A passionate group of developers, engineers, and innovators working together to bring ocean exploration to virtual reality"
        />

        <TeamGrid members={teamMembers} columns={3} className="max-w-6xl mx-auto" />

        {/* Team Description */}
        <div className={`mt-16 ${tw.bg.card} ${tw.border.medium} rounded-2xl p-8 max-w-4xl mx-auto text-center`}>
          <h3 className={`text-2xl font-bold mb-4 ${tw.text.accent}`}>
            Chifrijo Cósmico
          </h3>
          <p className={`${tw.text.secondary} leading-relaxed mb-4`}>
            We are a multidisciplinary team united by our passion for ocean exploration and cutting-edge technology. 
            Our project combines expertise in VR development, AI engineering, 3D visualization, and data science to create 
            an immersive educational experience about our planet's oceans.
          </p>
          <p className={`${tw.text.secondary} leading-relaxed`}>
            Participating in the NASA Space Apps Challenge 2025, we're committed to using real scientific data 
            to raise awareness about ocean conservation and the impacts of climate change.
          </p>
        </div>
      </main>
    </div>
  );
}

