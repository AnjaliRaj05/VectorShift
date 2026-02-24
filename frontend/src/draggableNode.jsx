// draggableNode.js

export const DraggableNode = ({ type, label, icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="cursor-grab min-w-[80px] px-3 py-2 flex items-center gap-2 rounded-lg bg-vs-navy text-white text-xs font-medium border border-transparent hover:border-vs-purple/50 hover:bg-vs-navy/80 transition-colors select-none"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
};
