import Navbar from '@/components/layout/Navbar';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Open_Sans } from 'next/font/google';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';

const sans = Open_Sans({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: {
    default: 'Vickygram',
    template: '%s | Vickygram'
  },
  description: 'Vickygram for developers.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={(sans.className, 'w-full overflow-auto bg-neutral-50')}>
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <div className="max-w-screen-xl mx-auto">
              <Navbar />
            </div>
          </header>
          <main className="w-full flex max-w-screen-xl mx-auto justify-center">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        <div id="portal" />
      </body>
    </html>
  );
}
