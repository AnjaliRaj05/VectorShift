// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data, selected }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      accentColor="border-vs-purple"
      inputs={[
        { id: `${id}-system`, label: 'System' },
        { id: `${id}-prompt`, label: 'Prompt' },
      ]}
      outputs={[{ id: `${id}-response` }]}
      selected={selected}
    >
      <p className="text-gray-500 italic">This is a LLM.</p>
    </BaseNode>
  );
};
