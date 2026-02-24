// BaseNode.js — Core presentational wrapper for all nodes

import { Handle, Position } from '@xyflow/react';

export const BaseNode = ({
  id,
  title,
  icon,
  accentColor = 'border-vs-purple',
  inputs = [],
  outputs = [],
  selected = false,
  style = {},
  className = '',
  children,
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200
        border-t-2 ${accentColor}
        ${selected ? 'shadow-lg ring-2 ring-vs-purple/30' : 'shadow-sm'}
        transition-shadow duration-150
        ${className}
      `}
      style={{ minWidth: 200, ...style }}
    >
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-100 flex items-center gap-2">
        {icon && <span className="text-sm">{icon}</span>}
        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          {title}
        </span>
      </div>

      {/* Body */}
      <div className="px-3 py-2 text-xs text-gray-600">
        {children}
      </div>

      {/* Input handles (left side) */}
      {inputs.map((input, index) => {
        const topPosition = input.position ?? `${((index + 1) / (inputs.length + 1)) * 100}%`;
        return (
          <Handle
            key={input.id}
            type="target"
            position={Position.Left}
            id={input.id}
            style={{
              top: topPosition,
              background: '#3B82F6',
              width: 10,
              height: 10,
              border: '2px solid white',
            }}
          />
        );
      })}

      {/* Output handles (right side) */}
      {outputs.map((output, index) => {
        const topPosition = output.position ?? `${((index + 1) / (outputs.length + 1)) * 100}%`;
        return (
          <Handle
            key={output.id}
            type="source"
            position={Position.Right}
            id={output.id}
            style={{
              top: topPosition,
              background: '#7C3AED',
              width: 10,
              height: 10,
              border: '2px solid white',
            }}
          />
        );
      })}
    </div>
  );
};
