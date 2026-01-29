import Link from 'next/link';
import { topics } from '../config';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#15151d] text-white">
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-center">
          Page Speed Insights
        </h1>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Compare website performance using real user data from the Chrome User Experience Report (CrUX).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {Object.entries(topics).map(([key, topic]) => (
            <Link
              key={key}
              href={`/${topic.slug}`}
              className="block p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-4xl">{key === 'f1' ? '🏎️' : '🇸🇬'}</span>
                <h2 className="text-2xl font-semibold">{topic.title}</h2>
              </div>
              <p className="text-gray-400">{topic.description}</p>
              <p className="text-sm text-gray-500 mt-3">
                {Object.keys(topic.sites).length} {topic.siteNames.toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
