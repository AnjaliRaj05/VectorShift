# VectorShift Pipeline Builder

A visual node-based pipeline editor built with React and ReactFlow, backed by a Python/FastAPI server. Drag-and-drop nodes onto a canvas, connect them with edges, and submit the pipeline for DAG validation.

**Live Demo**: [https://anjaliraj05.github.io/VectorShift/](https://anjaliraj05.github.io/VectorShift/)

## Tech Stack

| Layer    | Technology                              |
|----------|-----------------------------------------|
| Frontend | React 19, @xyflow/react v12, Zustand 5, Tailwind CSS 3, Vite 6 |
| Backend  | Python, FastAPI, Pydantic, Uvicorn      |
| Deploy   | GitHub Pages via GitHub Actions          |

## Getting Started

### Prerequisites

- Node.js 18+
- Python 3.8+

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on [http://localhost:3000](http://localhost:3000).

### Backend

```bash
cd backend
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
```

Runs on [http://localhost:8000](http://localhost:8000).

## Project Structure

```
VectorShift/
├── .github/workflows/
│   └── deploy.yml                # GitHub Actions deploy to Pages
├── backend/
│   └── main.py                   # FastAPI server with DAG validation
├── frontend/
│   ├── index.html                # Vite entry HTML
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.cjs       # Tailwind CSS theme
│   ├── postcss.config.cjs        # PostCSS config
│   ├── package.json
│   └── src/
│       ├── nodes/
│       │   ├── components/
│       │   │   └── NodeField.jsx     # Reusable form field component
│       │   ├── BaseNode.jsx          # Core node abstraction wrapper
│       │   ├── index.jsx             # Node type registry
│       │   ├── inputNode.jsx         # Input node
│       │   ├── outputNode.jsx        # Output node
│       │   ├── llmNode.jsx           # LLM node
│       │   ├── textNode.jsx          # Text node (dynamic handles)
│       │   ├── apiCallNode.jsx       # API Call node
│       │   ├── conditionalNode.jsx   # If/Else node
│       │   ├── dataTransformNode.jsx # Data Transform node
│       │   ├── timerNode.jsx         # Timer node
│       │   └── noteNode.jsx          # Note node (no handles)
│       ├── App.jsx                   # Root layout
│       ├── toolbar.jsx               # Data-driven toolbar
│       ├── draggableNode.jsx         # Draggable toolbar item
│       ├── ui.jsx                    # ReactFlow canvas
│       ├── submit.jsx                # Pipeline submit + API call
│       ├── store.js                  # Zustand state management
│       ├── main.jsx                  # Vite entry point
│       └── index.css                 # Tailwind directives + overrides
└── README.md
```

## Features

### Node Abstraction

All nodes share a common `BaseNode` wrapper that provides:

- Data-driven handles — pass `inputs` and `outputs` arrays; positions are auto-calculated using the formula `(index + 1) / (count + 1) * 100%`
- Accent-colored top border per node type
- Consistent header with icon and title
- Selection styling with shadow elevation

A reusable `NodeField` component provides labeled form fields (text, select, textarea, number) with uniform Tailwind styling.

### Node Types

| Node | Inputs | Outputs | Description |
|------|--------|---------|-------------|
| Input | 0 | 1 | Pipeline entry point with name and type config |
| Output | 1 | 0 | Pipeline exit point with name and type config |
| LLM | 2 (system, prompt) | 1 (response) | Language model processor |
| Text | Dynamic | 1 | Text with `{{variable}}` interpolation |
| API Call | 2 (headers, body) | 1 (response) | HTTP request with method and URL |
| If/Else | 1 | 2 (true, false) | Conditional branching |
| Transform | 1 | 1 | Data transformation (uppercase, split, etc.) |
| Timer | 1 | 1 | Configurable delay |
| Note | 0 | 0 | Freeform annotation (no connections) |

### Text Node — Dynamic Handles

The Text node detects `{{variableName}}` patterns in real time:

- Each unique variable creates an input handle on the left side
- The textarea auto-resizes in both height and width (clamped 200–400px)
- Variable badges are displayed below the text area
- `useUpdateNodeInternals` is called when variables change so ReactFlow recalculates handle positions

### Styling

- **Theme**: VectorShift-inspired — dark toolbar (`#0F1729`), white canvas (`#F8FAFC`), purple/blue accents
- **Font**: Inter via Google Fonts
- **Tailwind CSS 3** with custom color palette (`vs-dark`, `vs-navy`, `vs-purple`, `vs-blue`, `vs-canvas`)
- Purple-styled edges and connection lines
- Responsive flexbox layout — toolbar at top, canvas fills remaining space, submit bar at bottom

### Backend Integration

- **Endpoint**: `POST /pipelines/parse`
- **Request body**: `{ nodes: [...], edges: [...] }`
- **Response**: `{ num_nodes, num_edges, is_dag }`
- **DAG detection**: Kahn's algorithm (topological sort) — handles disconnected components and self-loops
- **CORS**: Configured for `http://localhost:3000`

Clicking "Run Pipeline" sends the current graph to the backend and displays an alert with the analysis result.

## Node Registry

The toolbar is data-driven from `nodes/index.jsx`. To add a new node type:

1. Create `frontend/src/nodes/myNode.jsx` using `BaseNode` and `NodeField`
2. Add the component to `nodeTypes` in `nodes/index.jsx`
3. Add a toolbar entry to `nodeRegistry` — the toolbar picks it up automatically
