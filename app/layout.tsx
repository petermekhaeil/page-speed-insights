import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Page Speed Insights',
  description: 'Compare website performance using real user data from the Chrome User Experience Report (CrUX).',
  openGraph: {
    title: 'Page Speed Insights',
    description: 'Compare website performance using real user data from the Chrome User Experience Report (CrUX).',
    siteName: 'Page Speed Insights',
  },
  twitter: {
    card: 'summary',
    creator: '@PMekhaeil',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
