import React from 'react';

interface StopwatchProps {
    time: number;
    isRunning: boolean;
    onStart: () => void;
    onStop: () => void;
    onReset: () => void;
  }

const Stopwatch: React.FC<StopwatchProps> = ({ time, isRunning, onStart, onStop, onReset }) => {



  return (
    <div className="flex flex-col items-center mt-4">
      <div className="text-4xl font-mono">{new Date(time * 1000).toISOString().slice(11, 19)}</div>
      <div className="mt-4">
        <button onClick={onStart} className="bg-green-500 text-white px-4 py-2 rounded mr-2" disabled={isRunning}>
          Start
        </button>
        <button onClick={onStop} className="bg-red-500 text-white px-4 py-2 rounded mr-2" disabled={!isRunning}>
          Stop
        </button>
        <button onClick={onReset} className="bg-gray-500 text-white px-4 py-2 rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
