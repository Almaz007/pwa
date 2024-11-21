import { useNodes, useReactFlow, useStoreApi } from '@xyflow/react';
import CustomNodeToolbar from '../CustomNodeToolbar/CustomNodeToolbar';
import { generateNode } from '../../helpers/helpers';

const padding = 25;

const SelectedNodesToolbar = () => {
	const nodes = useNodes();
	const { setNodes, getNodesBounds } = useReactFlow();
	const store = useStoreApi();
	const selectedNodes = nodes.filter(node => node.selected && !node.parentId);
	const selectedNodeIds = selectedNodes.map(node => node.id);
	const isVisible = selectedNodeIds.length > 1;

	const onGroup = () => {
		const rectOfNodes = getNodesBounds(selectedNodes);
		const type = 'groupNode';
		const parentPosition = {
			x: rectOfNodes.x,
			y: rectOfNodes.y
		};
		const style = {
			width: rectOfNodes.width + padding * 2,
			height: rectOfNodes.height + padding * 2
		};
		const groupNode = generateNode(type, parentPosition, style);

		const nextNodes = nodes.map(node => {
			if (selectedNodeIds.includes(node.id)) {
				return {
					...node,
					position: {
						x: node.position.x - parentPosition.x + padding,
						y: node.position.y - parentPosition.y + padding
					},
					extent: 'parent',
					parentId: groupNode.id
				};
			}
			return node;
		});

		store.getState().resetSelectedElements();
		store.setState({ nodesSelectionActive: false });

		setNodes([groupNode, ...nextNodes]);
	};

	return (
		<CustomNodeToolbar nodeId={selectedNodeIds} isVisible={isVisible}>
			<button onClick={onGroup}>Сгруппировать</button>
		</CustomNodeToolbar>
	);
};

export default SelectedNodesToolbar;
