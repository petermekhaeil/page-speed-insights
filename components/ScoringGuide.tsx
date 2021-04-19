const ScoringGuide = ({ type }: { type: 'PERFORMANCE' | 'FIELD_DATA' }) => {
  return (
    <div className="text-center">
      <div
        className="inline-block rounded-md w-3"
        style={{ backgroundColor: '#ff4e42', color: '#ff4e42' }}
      >
        .
      </div>{' '}
      {type === 'PERFORMANCE' ? '0-49' : 'Poor'}
      <div
        className="inline-block rounded-md w-3 ml-4"
        style={{ backgroundColor: '#ffa400', color: '#ffa400' }}
      >
        .
      </div>{' '}
      {type === 'PERFORMANCE' ? '50-89' : 'Needs Improvement'}
      <div
        className="inline-block rounded-md w-3 ml-4"
        style={{ backgroundColor: '#0cce6b', color: '#0cce6b' }}
      >
        .
      </div>{' '}
      {type === 'PERFORMANCE' ? '90-100' : 'Good'}
    </div>
  );
};

export default ScoringGuide;
