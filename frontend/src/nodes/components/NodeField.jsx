// NodeField.js — Reusable labeled form field for nodes

export const NodeField = ({
  label,
  type = 'text',
  value,
  onChange,
  options = [],
  placeholder = '',
  rows = 2,
  className = '',
}) => {
  const baseInputClasses =
    'w-full px-2 py-1 text-xs border border-gray-200 rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-vs-purple focus:border-vs-purple';

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={baseInputClasses}
          >
            {options.map((opt) => (
              <option key={opt.value ?? opt} value={opt.value ?? opt}>
                {opt.label ?? opt}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className={`${baseInputClasses} resize-none`}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={baseInputClasses}
          />
        );
      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={baseInputClasses}
          />
        );
    }
  };

  return (
    <div className={`mb-2 last:mb-0 ${className}`}>
      {label && (
        <label className="block text-[10px] font-medium text-gray-500 mb-1 uppercase tracking-wider">
          {label}
        </label>
      )}
      {renderInput()}
    </div>
  );
};
