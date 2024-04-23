import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeRegistry from '../components/ThemeRegistry/ThemeRegistry';
import NextAuthSessionProvider from '../providers/NextAuthSessionProvider';
import Header from '../components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Url Shortner',
  description: 'Convert your long urls to short ones',
};

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <ThemeRegistry>
          <NextAuthSessionProvider>
            <Header />
            <main className="flex flex-1 flex-col p-5">{children}</main>
          </NextAuthSessionProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}

export default RootLayout;
