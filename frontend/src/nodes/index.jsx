// nodes/index.js — Node type registry

import { InputNode } from './inputNode';
import { OutputNode } from './outputNode';
import { LLMNode } from './llmNode';
import { TextNode } from './textNode';
import { ApiCallNode } from './apiCallNode';
import { ConditionalNode } from './conditionalNode';
import { DataTransformNode } from './dataTransformNode';
import { TimerNode } from './timerNode';
import { NoteNode } from './noteNode';

// ReactFlow node type mapping
export const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  apiCall: ApiCallNode,
  conditional: ConditionalNode,
  dataTransform: DataTransformNode,
  timer: TimerNode,
  note: NoteNode,
};

// Toolbar metadata registry
export const nodeRegistry = [
  { type: 'customInput', label: 'Input', icon: '📥', category: 'IO' },
  { type: 'customOutput', label: 'Output', icon: '📤', category: 'IO' },
  { type: 'llm', label: 'LLM', icon: '🤖', category: 'AI' },
  { type: 'text', label: 'Text', icon: '📝', category: 'Transform' },
  { type: 'apiCall', label: 'API Call', icon: '🌐', category: 'Integration' },
  { type: 'conditional', label: 'If/Else', icon: '🔀', category: 'Logic' },
  { type: 'dataTransform', label: 'Transform', icon: '🔄', category: 'Transform' },
  { type: 'timer', label: 'Timer', icon: '⏱️', category: 'Utility' },
  { type: 'note', label: 'Note', icon: '📌', category: 'Utility' },
];
