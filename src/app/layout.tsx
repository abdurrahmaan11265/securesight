import './globals.css'
import { Bell, Camera, LayoutDashboard, Users, AlertTriangle, PlusCircle, Search } from 'lucide-react'
import Image from 'next/image'

export const metadata = { title: 'Mandlacx Dashboard' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-black via-gray-900 to-black text-white">
        <nav className="flex flex-wrap items-center justify-between px-4 py-3 md:px-8 backdrop-blur-md bg-black/50">
          <div className="flex items-center space-x-2">
            <Image src='/logo.jpg' alt="Mandlacx" width={32} height={32} />
            <span className="font-extrabold text-xl md:text-2xl tracking-tight">MANDLACX</span>
          </div>

          <ul className="hidden md:flex space-x-6 mt-3 md:mt-0 md:ml-12">
            <li className="cursor-pointer flex items-center space-x-1 text-yellow-400">
              <LayoutDashboard size={18} /> <span>Dashboard</span>
            </li>
            <li className="cursor-pointer hover:text-yellow-400 flex items-center space-x-1 text-gray-300 hover:text-white">
              <Camera size={18} /> <span>Cameras</span>
            </li>
            <li className="cursor-pointer hover:text-yellow-400 flex items-center space-x-1 text-gray-300 hover:text-white">
              <Bell size={18} /> <span>Scenes</span>
            </li>
            <li className="cursor-pointer hover:text-yellow-400 flex items-center space-x-1 text-gray-300 hover:text-white">
              <AlertTriangle size={18} /> <span>Incidents</span>
            </li>
            <li className="cursor-pointer hover:text-yellow-400 flex items-center space-x-1 text-gray-300 hover:text-white">
              <Users size={18} /> <span>Users</span>
            </li>
          </ul>

          <div className="ml-auto flex items-center space-x-2 mt-3 md:mt-0">
            <PlusCircle size={20} className="text-gray-300 hover:text-white cursor-pointer" />
            <Search size={20} className="text-gray-300 hover:text-white cursor-pointer" />
            <div className="hidden sm:flex items-center space-x-2 bg-gray-800/50 px-3 py-1 rounded-full">
              <Image src="/profile.jpg" alt="Ajhas" width={28} height={28} className="rounded-full" />
              <span className="text-sm">ajhas@mandlac.com</span>
            </div>
          </div>
        </nav>

        <main className="min-h-screen overflow-auto">{children}</main>
      </body>
    </html>
  )
}
