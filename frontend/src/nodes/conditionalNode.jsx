// conditionalNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeField } from './components/NodeField';

export const ConditionalNode = ({ id, data, selected }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [compareValue, setCompareValue] = useState(data?.compareValue || '');

  return (
    <BaseNode
      id={id}
      title="If/Else"
      icon="🔀"
      accentColor="border-yellow-500"
      inputs={[{ id: `${id}-input` }]}
      outputs={[
        { id: `${id}-true`, position: '33%' },
        { id: `${id}-false`, position: '66%' },
      ]}
      selected={selected}
    >
      <NodeField
        label="Condition"
        type="select"
        value={condition}
        onChange={setCondition}
        options={[
          { value: 'equals', label: 'Equals' },
          { value: 'not_equals', label: 'Not Equals' },
          { value: 'contains', label: 'Contains' },
          { value: 'greater_than', label: 'Greater Than' },
          { value: 'less_than', label: 'Less Than' },
        ]}
      />
      <NodeField
        label="Compare Value"
        value={compareValue}
        onChange={setCompareValue}
        placeholder="Enter value..."
      />
      <div className="flex justify-between text-[10px] text-gray-400 mt-1">
        <span>True ↗</span>
        <span>False ↘</span>
      </div>
    </BaseNode>
  );
};
