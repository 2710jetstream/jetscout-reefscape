interface CounterProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function Counter({ label, value, onChange, min = 0, max = 99 }: CounterProps) {
  const increment = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const decrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  return (
    <div className="text-center">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={decrement}
          disabled={value <= min}
          className="w-8 h-8 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold rounded-full transition-colors disabled:cursor-not-allowed"
        >
          -
        </button>
        <span className="w-12 text-center text-lg font-semibold text-gray-900 dark:text-white">
          {value}
        </span>
        <button
          onClick={increment}
          disabled={value >= max}
          className="w-8 h-8 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold rounded-full transition-colors disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  );
}
