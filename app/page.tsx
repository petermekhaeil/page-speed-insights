import getCruxReports from '../api/getCruxReports';
import { getTopic } from './helpers';
import Home from '../components/Home';

export const dynamic = 'force-static';

export default async function Page() {
  const reports = await getCruxReports();
  const topic = getTopic();

  return (
    <Home
      topic={topic}
      scoresByUrl={reports.scoresByUrl}
      scoresByOrigin={reports.scoresByOrigin}
      resultByUrl={reports.resultByUrl}
      resultByOrigin={reports.resultByOrigin}
    />
  );
}
