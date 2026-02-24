// inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeField } from './components/NodeField';

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      accentColor="border-green-500"
      inputs={[]}
      outputs={[{ id: `${id}-value` }]}
      selected={selected}
    >
      <NodeField
        label="Name"
        value={currName}
        onChange={setCurrName}
      />
      <NodeField
        label="Type"
        type="select"
        value={inputType}
        onChange={setInputType}
        options={['Text', 'File']}
      />
    </BaseNode>
  );
};
