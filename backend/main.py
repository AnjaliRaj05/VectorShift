from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from collections import defaultdict, deque

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Pipeline(BaseModel):
    nodes: List[Dict]
    edges: List[Dict]


def is_dag(nodes: List[Dict], edges: List[Dict]) -> bool:
    """Check if the graph is a DAG using Kahn's algorithm (topological sort)."""
    if not nodes:
        return True

    node_ids = {node["id"] for node in nodes}
    adj = defaultdict(list)
    in_degree = defaultdict(int)

    # Initialize in-degree for all nodes
    for nid in node_ids:
        in_degree[nid] = 0

    for edge in edges:
        src = edge.get("source")
        tgt = edge.get("target")
        # Check for self-loops
        if src == tgt:
            return False
        if src in node_ids and tgt in node_ids:
            adj[src].append(tgt)
            in_degree[tgt] += 1

    # Start with all nodes that have no incoming edges
    queue = deque([nid for nid in node_ids if in_degree[nid] == 0])
    visited_count = 0

    while queue:
        node = queue.popleft()
        visited_count += 1
        for neighbor in adj[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited_count == len(node_ids)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    return {
        "num_nodes": len(pipeline.nodes),
        "num_edges": len(pipeline.edges),
        "is_dag": is_dag(pipeline.nodes, pipeline.edges),
    }
