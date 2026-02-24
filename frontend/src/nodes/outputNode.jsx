// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeField } from './components/NodeField';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      accentColor="border-red-500"
      inputs={[{ id: `${id}-value` }]}
      outputs={[]}
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
        value={outputType}
        onChange={setOutputType}
        options={['Text', 'Image']}
      />
    </BaseNode>
  );
};
