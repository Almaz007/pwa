export const selector = (store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  addEdge: store.addEdge,
  addNode: store.addNode,
  setNodes: store.setNodes,
  processorType: store.processorType,
  changeProcessorType: store.changeProcessorType,
  saveType: store.saveType,
  changeSaveType: store.changeSaveType,
});

export const setPointMenuSelector = (store) => ({
  nodes: store.nodes,
  addNode: store.addNode,
  setNodes: store.setNodes,
});

export const setNodeTypeSelector = (store) => ({
  setNodeType: store.setNodeType,
});
