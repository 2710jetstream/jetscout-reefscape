import { useState } from "react";

interface AnimatedSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

export function AnimatedSelect({ value, onChange, options, className = "" }: AnimatedSelectProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          ${className}
          appearance-none
          relative
          w-full
          pl-3 pr-10 py-2
          border border-gray-300 dark:border-gray-600
          rounded-md
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-white
          cursor-pointer
          outline-none
          transition-all duration-200 ease-in-out
          ${isFocused ? 'ring-2 ring-purple-500 border-purple-500' : ''}
          hover:border-purple-400 dark:hover:border-purple-400
        `}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={`
        absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none
        transform transition-transform duration-200 ease-in-out
        ${isFocused ? 'rotate-180' : ''}
      `}>
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
}