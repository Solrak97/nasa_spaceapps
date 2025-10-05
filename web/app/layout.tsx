import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Deep Ocean - Chifrijo Cósmico',
  description: 'Exploring the depths of our oceans using cutting-edge VR technology and NASA data',
  icons: {
    icon: [
      { url: '/deepocean.ico', sizes: 'any' },
      { url: '/deep-ocean.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/deepocean.ico',
    apple: '/deep-ocean.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Deep Ocean - Chifrijo Cósmico',
    description: 'Exploring the depths of our oceans using cutting-edge VR technology and NASA data',
    images: ['/deep-ocean.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deep Ocean - Chifrijo Cósmico',
    description: 'Exploring the depths of our oceans using cutting-edge VR technology and NASA data',
    images: ['/deep-ocean.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
