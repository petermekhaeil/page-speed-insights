import type { Metadata } from 'next';
import { getTopic } from './helpers';
import './globals.css';

const topic = getTopic();

export const metadata: Metadata = {
  title: topic.title,
  description: topic.description,
  icons: {
    icon: topic.favicon,
  },
  openGraph: {
    title: topic.title,
    description: topic.description,
    url: topic.url,
    siteName: topic.title,
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
