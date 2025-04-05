import './globals.css'
import { Inter } from 'next/font/google'
import { StateContext } from './context/StateContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'Library Herald - Journal of Library and Information Science',
    template: '%s | Library Herald'
  },
  description: 'Library Herald is a premier journal for Library and Information Science professionals published by Delhi Library Association',
  keywords: ['library science', 'journal', 'research', 'information science', 'academic journal'],
  authors: [{ name: 'Delhi Library Association' }],
  openGraph: {
    title: 'Library Herald - Journal of Library and Information Science',
    description: 'Library Herald is a premier journal for Library and Information Science professionals published by Delhi Library Association',
    url: 'https://library-herald.org/',
    siteName: 'Library Herald',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <StateContext>
        <body className={inter.className}>
          <Navbar />
          <main style={{ paddingTop: '90px' }}>{children}</main>
          <Footer />
        </body>
      </StateContext>
    </html>
  )
}
