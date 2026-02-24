// noteNode.js

import { useState } from 'react';

export const NoteNode = ({ id, data, selected }) => {
  const [text, setText] = useState(data?.text || 'Add a note...');

  return (
    <div
      className={`
        bg-yellow-50 rounded-lg border-2 border-dashed border-yellow-300
        ${selected ? 'shadow-lg ring-2 ring-yellow-400/30' : 'shadow-sm'}
        transition-shadow duration-150
      `}
      style={{ minWidth: 180 }}
    >
      <div className="px-3 py-2 border-b border-yellow-200 flex items-center gap-2">
        <span className="text-sm">📌</span>
        <span className="text-xs font-semibold text-yellow-700 uppercase tracking-wide">
          Note
        </span>
      </div>
      <div className="px-3 py-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
          className="w-full px-2 py-1 text-xs border border-yellow-200 rounded bg-yellow-50/50 focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 resize-none"
          placeholder="Write a note..."
        />
      </div>
    </div>
  );
};
