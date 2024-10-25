import React, { useMemo } from 'react';

const getStats = (numbers) => {
  if (numbers.length === 0) return { mean: 0, median: 0, mode: null };

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const mean = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
  const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

  const frequency = numbers.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});
  
  const maxFreq = Math.max(...Object.values(frequency));
  const mode = Object.keys(frequency).filter(key => frequency[key] === maxFreq);

  return {
    mean,
    median,
    mode: mode.length === numbers.length ? null : mode.map(Number),
  };
};

const NumberStats = ({ numbers }) => {
  const stats = useMemo(() => getStats(numbers), [numbers]);

  return (
    <div>
      <p>Mean: {stats.mean.toFixed(2)}</p>
      <p>Median: {stats.median}</p>
      <p>Mode: {stats.mode ? stats.mode.join(', ') : 'No mode'}</p>
    </div>
  );
};

export default NumberStats;
