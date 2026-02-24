// textNode.js

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { useUpdateNodeInternals } from '@xyflow/react';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const prevVarCountRef = useRef(0);
  const updateNodeInternals = useUpdateNodeInternals();

  // Extract {{variables}} from text
  const variables = useMemo(() => {
    const matches = [...currText.matchAll(/\{\{(\w+)\}\}/g)];
    return [...new Set(matches.map((m) => m[1]))];
  }, [currText]);

  // Build input handles from variables
  const inputs = useMemo(
    () => variables.map((v) => ({ id: `${id}-${v}` })),
    [variables, id]
  );

  // Update ReactFlow handle positions only when variable count changes
  useEffect(() => {
    if (prevVarCountRef.current !== variables.length) {
      prevVarCountRef.current = variables.length;
      requestAnimationFrame(() => updateNodeInternals(id));
    }
  }, [variables.length, id, updateNodeInternals]);

  // Auto-resize textarea height
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  }, [currText]);

  // Dynamic width based on longest line
  const dynamicWidth = useMemo(() => {
    const lines = currText.split('\n');
    const longestLine = Math.max(...lines.map((l) => l.length), 0);
    return Math.min(Math.max(longestLine * 7 + 40, 200), 400);
  }, [currText]);

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="📝"
      accentColor="border-amber-500"
      inputs={inputs}
      outputs={[{ id: `${id}-output` }]}
      selected={selected}
      style={{ width: dynamicWidth }}
    >
      <textarea
        ref={textareaRef}
        value={currText}
        onChange={(e) => setCurrText(e.target.value)}
        rows={1}
        className="w-full px-2 py-1 text-xs font-mono border border-gray-200 rounded bg-gray-50 focus:outline-none focus:ring-1 focus:ring-vs-purple focus:border-vs-purple resize-none overflow-hidden"
        placeholder="Type text with {{variables}}..."
      />
      {variables.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {variables.map((v) => (
            <span
              key={v}
              className="px-1.5 py-0.5 text-[10px] font-medium bg-amber-100 text-amber-700 rounded"
            >
              {`{{${v}}}`}
            </span>
          ))}
        </div>
      )}
    </BaseNode>
  );
};
