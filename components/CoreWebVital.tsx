type Props = {
  cls: string | number;
  inp: string | number;
  lcp: string | number;
};

const CoreWebVital = ({ cls, inp, lcp }: Props) => {
  // INP threshold: Good <= 200ms (vs FID's 100ms)
  const isPass =
    Number(cls) <= 0.1 && Number(inp) <= 200 && Number(lcp) <= 2500;

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
