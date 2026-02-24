// timerNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeField } from './components/NodeField';

export const TimerNode = ({ id, data, selected }) => {
  const [delay, setDelay] = useState(data?.delay || '1');
  const [unit, setUnit] = useState(data?.unit || 'seconds');

  return (
    <BaseNode
      id={id}
      title="Timer"
      icon="⏱️"
      accentColor="border-orange-500"
      inputs={[{ id: `${id}-trigger` }]}
      outputs={[{ id: `${id}-done` }]}
      selected={selected}
    >
      <NodeField
        label="Delay"
        type="number"
        value={delay}
        onChange={setDelay}
        placeholder="1"
      />
      <NodeField
        label="Unit"
        type="select"
        value={unit}
        onChange={setUnit}
        options={[
          { value: 'milliseconds', label: 'Milliseconds' },
          { value: 'seconds', label: 'Seconds' },
          { value: 'minutes', label: 'Minutes' },
        ]}
      />
    </BaseNode>
  );
};
