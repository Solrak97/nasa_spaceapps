import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
