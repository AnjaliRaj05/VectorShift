// apiCallNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';
import { NodeField } from './components/NodeField';

export const ApiCallNode = ({ id, data, selected }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  return (
    <BaseNode
      id={id}
      title="API Call"
      icon="🌐"
      accentColor="border-blue-500"
      inputs={[
        { id: `${id}-headers` },
        { id: `${id}-body` },
      ]}
      outputs={[{ id: `${id}-response` }]}
      selected={selected}
    >
      <NodeField
        label="Method"
        type="select"
        value={method}
        onChange={setMethod}
        options={['GET', 'POST', 'PUT', 'PATCH', 'DELETE']}
      />
      <NodeField
        label="URL"
        value={url}
        onChange={setUrl}
        placeholder="https://api.example.com"
      />
    </BaseNode>
  );
};
