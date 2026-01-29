const ScoringInformation = () => {
  return (
    <>
      <p>
        The performance score is based on the Field Data from{' '}
        <a
          title="CrUX"
          target="_blank"
          rel="noopener"
          className="underline"
          href="https://developers.google.com/web/tools/chrome-user-experience-report"
        >
          CrUX
        </a>
        .
      </p>
      <p>
        It is a score based on the weighting of the{' '}
        <a
          href="https://web.dev/inp/"
          className="underline"
          title="Interaction to Next Paint (INP)"
          rel="noopener"
        >
          Interaction to Next Paint (INP)
        </a>
        ,{' '}
        <a
          href="https://web.dev/lcp/"
          className="underline"
          title="Largest Contentful Paint (LCP)"
          rel="noopener"
        >
          Largest Contentful Paint (LCP)
        </a>
        , and{' '}
        <a
          href="https://web.dev/cls/"
          className="underline"
          title="Cumulative Layout Shift (CLS)"
          rel="noopener"
        >
          Cumulative Layout Shift (CLS)
        </a>
        .
      </p>
    </>
  );
};

export default ScoringInformation;
