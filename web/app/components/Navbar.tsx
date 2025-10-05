'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#001117]/95 backdrop-blur-sm border-b border-[#85c6cf]/30 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image 
              src="/deep-ocean.png" 
              alt="Deep Ocean Logo" 
              width={40} 
              height={40}
              className="rounded-lg"
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#85c6cf] to-[#e8f3f2]">
              Deep Ocean
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-[#c5d0cd] hover:text-[#e8f3f2] transition-colors">
              Home
            </Link>
            <Link href="/world" className="text-[#c5d0cd] hover:text-[#e8f3f2] transition-colors">
              World
            </Link>
            <Link href="/seas" className="text-[#c5d0cd] hover:text-[#e8f3f2] transition-colors">
              Seas
            </Link>
            <Link href="/climate" className="text-[#c5d0cd] hover:text-[#e8f3f2] transition-colors">
              Climate
            </Link>
            <Link href="/team" className="text-[#c5d0cd] hover:text-[#e8f3f2] transition-colors">
              Team
            </Link>
            <Link href="/gallery" className="text-[#c5d0cd] hover:text-[#e8f3f2] transition-colors">
              Gallery
            </Link>
            <Link 
              href="/#download" 
              className="px-4 py-2 bg-[#85c6cf] hover:bg-[#6ab3be] text-[#001117] rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Download
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#c5d0cd] hover:text-[#e8f3f2] transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#85c6cf]/30">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-[#c5d0cd] hover:text-[#e8f3f2] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/world" 
                className="text-[#c5d0cd] hover:text-[#e8f3f2] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                World
              </Link>
              <Link 
                href="/seas" 
                className="text-[#c5d0cd] hover:text-[#e8f3f2] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Seas
              </Link>
              <Link 
                href="/climate" 
                className="text-[#c5d0cd] hover:text-[#e8f3f2] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Climate
              </Link>
              <Link 
                href="/team" 
                className="text-[#c5d0cd] hover:text-[#e8f3f2] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>
              <Link 
                href="/gallery" 
                className="text-[#c5d0cd] hover:text-[#e8f3f2] transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                href="/#download" 
                className="text-center px-4 py-2 bg-[#85c6cf] hover:bg-[#6ab3be] text-[#001117] rounded-lg font-semibold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Download
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

