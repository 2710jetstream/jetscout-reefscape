import { useState, useEffect } from "react";

interface TimerProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function Timer({ label, value, onChange }: TimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && startTime) {
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        onChange(elapsed);
      }, 16);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, startTime, onChange]);

  const handleStart = () => {
    if (!isRunning) {
      setStartTime(Date.now() - (value * 1000));
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setStartTime(null);
    onChange(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}`;
  };

  return (
    <div className="text-center">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
        <div className="text-2xl font-mono font-bold text-gray-900 dark:text-white mb-2">
          {formatTime(value)}
        </div>
        <div className="flex space-x-2 justify-center">
          <button
            onClick={handleStart}
            disabled={isRunning}
            className="px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm font-medium rounded transition-colors disabled:cursor-not-allowed"
          >
            Start
          </button>
          <button
            onClick={handleStop}
            disabled={!isRunning}
            className="px-3 py-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white text-sm font-medium rounded transition-colors disabled:cursor-not-allowed"
          >
            Stop
          </button>
          <button
            onClick={handleReset}
            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium rounded transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
