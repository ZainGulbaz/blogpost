import { Inter } from 'next/font/google'
import Applayout from '@/components/AppLayout/Applayout'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <body className={inter.className}>
        <Toaster/>
        <Applayout children={children}/>
        </body>
  )
}
