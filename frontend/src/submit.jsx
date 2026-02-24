// submit.js

import { useStore } from './store';
import { useShallow } from 'zustand/react/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(useShallow(selector));

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      alert(
        `Pipeline Analysis:\n\n` +
        `Nodes: ${data.num_nodes}\n` +
        `Edges: ${data.num_edges}\n` +
        `Is DAG: ${data.is_dag ? 'Yes' : 'No'}`
      );
    } catch (error) {
      alert(`Error submitting pipeline: ${error.message}`);
    }
  };

  return (
    <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="text-xs text-gray-500">
        {nodes.length} node{nodes.length !== 1 ? 's' : ''} &middot;{' '}
        {edges.length} edge{edges.length !== 1 ? 's' : ''}
      </div>
      <button
        onClick={handleSubmit}
        disabled={nodes.length === 0}
        className="px-6 py-2 bg-vs-purple text-white text-sm font-medium rounded-lg hover:bg-vs-purple/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Run Pipeline
      </button>
    </div>
  );
};
