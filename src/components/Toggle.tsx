interface ToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function Toggle({ label, value, onChange }: ToggleProps) {
  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          value ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
    </div>
  );
}
