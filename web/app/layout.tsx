import './globals.css'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Deep Ocean - Chifrijo Cósmico',
  description: 'Exploring the depths of our oceans using cutting-edge VR technology and NASA data',
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
