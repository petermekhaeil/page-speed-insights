import { roundDown } from '../app/helpers';

type Density = {
  density: number;
};

type Props = {
  cls: Density[];
  fid: Density[];
  lcp: Density[];
};

const CoreWebVital = ({ cls, fid, lcp }: Props) => {
  const isPass =
    roundDown(fid[0].density) >= 50 &&
    roundDown(lcp[0].density) >= 50 &&
    roundDown(cls[0].density) >= 50;

  return (
    <div className="mt-8">
      {isPass ? (
        <p>
          This page{' '}
          <span className="font-bold" style={{ color: '#0cce6b' }}>
            passes
          </span>{' '}
          the <a href="">Core Web Vitals assessment</a>.
        </p>
      ) : (
        <p>
          This page{' '}
          <span className="font-bold" style={{ color: '#ff4e42' }}>
            does not pass
          </span>{' '}
          the{' '}
          <a
            href="https://web.dev/vitals/"
            className="underline"
            title="Core Web Vitals"
            rel="noopener"
            target="_blank"
          >
            Core Web Vitals
          </a>{' '}
          assessment.
        </p>
      )}
    </div>
  );
};

export default CoreWebVital;
