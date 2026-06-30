

interface SelectProps<T extends string> {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  description?: string;
}

export const Select = <T extends string>({
  label,
  value,
  onChange,
  options,
  description,
}: SelectProps<T>) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-terminal-text/80">{label}</label>
      {description && (
        <p className="text-xs text-terminal-dim">{description}</p>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="w-full px-4 py-2.5 rounded-lg appearance-none cursor-pointer
          bg-terminal-bg/30 border border-terminal-green/20
          text-terminal-text
          focus:outline-none focus:border-terminal-green focus:shadow-lg focus:shadow-terminal-green/20
          transition-all duration-300
          hover:border-terminal-green/40
          [&>option]:bg-terminal-bg [&>option]:text-terminal-text"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};