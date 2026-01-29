import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { topics, getAllTopicSlugs } from '../../config';
import getCruxReports from '../../api/getCruxReports';
import Home from '../../components/Home';

type Props = {
  params: Promise<{ topic: string }>;
};

export async function generateStaticParams() {
  return getAllTopicSlugs().map((slug) => ({
    topic: slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic: slug } = await params;
  const topic = topics[slug];

  if (!topic) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: topic.title,
    description: topic.description,
    icons: {
      icon: topic.favicon,
    },
    openGraph: {
      title: topic.title,
      description: topic.description,
      siteName: topic.title,
    },
  };
}

export default async function TopicPage({ params }: Props) {
  const { topic: slug } = await params;
  const topic = topics[slug];

  if (!topic) {
    notFound();
  }

  const { resultByUrl, resultByOrigin, scoresByUrl, scoresByOrigin } =
    await getCruxReports(topic);

  return (
    <Home
      topic={topic}
      resultByUrl={resultByUrl}
      resultByOrigin={resultByOrigin}
      scoresByUrl={scoresByUrl}
      scoresByOrigin={scoresByOrigin}
    />
  );
}
