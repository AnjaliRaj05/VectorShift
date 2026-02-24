// toolbar.js

import { DraggableNode } from './draggableNode';
import { nodeRegistry } from './nodes';

export const PipelineToolbar = () => {
  return (
    <div className="bg-vs-dark px-4 py-3 border-b border-gray-800">
      <div className="flex flex-wrap gap-2">
        {nodeRegistry.map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            icon={node.icon}
          />
        ))}
      </div>
    </div>
  );
};
