'use client';

import { useRef } from 'react';
import { getColourFromRange } from '../app/helpers';
import useIntersectionObserver from '../hooks/use-intersection-observer';
import styles from './Gauge.module.css';

const Gauge = ({ value }: { value: number }) => {
  const elementRef = useRef(null);
  const [isVisible] = useIntersectionObserver({ elementRef, threshold: 1.0 });

  const strokeLength = 350 * (value / 100);

  return (
    <div className={styles.outer} ref={elementRef}>
      <div className={styles.inner}>{value}</div>
      <svg className={styles.circle} viewBox="0 0 120 120">
        <circle
          style={{ opacity: '0.1', stroke: getColourFromRange(value) }}
          r="56"
          cx="60"
          cy="60"
          strokeWidth="8"
        ></circle>
        <circle
          style={{
            fill: 'none',
            stroke: getColourFromRange(value),
            transformOrigin: '50% 50%',
            transform: 'rotate(-85.9537deg)',
            strokeDasharray: `${isVisible ? strokeLength : 0}, 351.858`,
            animation: isVisible ? 'load-gauge 1s ease forwards' : 'none'
          }}
          r="56"
          cx="60"
          cy="60"
          strokeWidth="8"
        ></circle>
      </svg>
    </div>
  );
};

export default Gauge;
