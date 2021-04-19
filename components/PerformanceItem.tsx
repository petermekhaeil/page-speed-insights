import React from 'react';
import { getColourFromRange } from '../app/helpers';
import styles from './PerformanceItem.module.css';

type PerformanceItemProps = {
  index: number;
  points: number;
  isVisible: boolean;
  label: string;
  badge: string;
};

const PerformanceItem = ({
  index,
  points,
  isVisible,
  label,
  badge
}: PerformanceItemProps) => {
  const handleClick = (id: string) => {
    if (typeof document !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="grid grid-cols-12 gap-0 sm:gap-2">
      <div className="col-span-4 lg:col-span-2">
        <div className={styles.index}>{index + 1}</div>
        <div className={styles.badge} style={{ backgroundColor: badge }}>
          <>&nbsp;</>
        </div>
        <div className={styles.label}>
          <a onClick={() => handleClick(label)}>{label}</a>
        </div>
      </div>
      <div className={styles.bar}>
        <div
          className="h-full"
          style={{
            width: `${points}%`
          }}
        >
          <div
            className="rounded-md"
            style={{
              width: isVisible ? 'auto' : 0,
              backgroundColor: getColourFromRange(points),
              animation: isVisible ? 'progress-bar 4s' : 'none',
              height: '100%'
            }}
          ></div>
        </div>
      </div>
      <div className={styles.points}>{points}</div>
    </div>
  );
};

export default PerformanceItem;
