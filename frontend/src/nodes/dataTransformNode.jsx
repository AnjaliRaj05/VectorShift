// dataTransformNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeField } from './components/NodeField';

export const DataTransformNode = ({ id, data, selected }) => {
  const [operation, setOperation] = useState(data?.operation || 'uppercase');
  const [param, setParam] = useState(data?.param || '');

  const needsParam = ['split', 'replace', 'slice'].includes(operation);

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="🔄"
      accentColor="border-cyan-500"
      inputs={[{ id: `${id}-input` }]}
      outputs={[{ id: `${id}-output` }]}
      selected={selected}
    >
      <NodeField
        label="Operation"
        type="select"
        value={operation}
        onChange={setOperation}
        options={[
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'trim', label: 'Trim' },
          { value: 'split', label: 'Split' },
          { value: 'replace', label: 'Replace' },
          { value: 'slice', label: 'Slice' },
          { value: 'reverse', label: 'Reverse' },
          { value: 'json_parse', label: 'JSON Parse' },
        ]}
      />
      {needsParam && (
        <NodeField
          label="Parameter"
          value={param}
          onChange={setParam}
          placeholder="e.g., delimiter or pattern"
        />
      )}
    </BaseNode>
  );
};
