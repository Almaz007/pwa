import { useEffect, useRef, useState, useCallback } from 'react';
import {
	useStore,
	useReactFlow,
	getConnectedEdges,
	useKeyPress
} from '@xyflow/react';
import { nanoid, customAlphabet } from 'nanoid';
export const useCopyPaste = () => {
	const mousePositionRef = useRef({ x: 0, y: 0 });
	const rfDomNode = useStore(state => state.domNode);

	const { getNodes, setNodes, getEdges, setEdges, screenToFlowPosition } =
		useReactFlow();

	const [bufferedNodes, setBufferedNodes] = useState([]);
	const [bufferedEdges, setBufferedEdges] = useState([]);

	useEffect(() => {
		const events = ['cut', 'copy', 'paste'];
		if (rfDomNode) {
			const preventDefault = e => e.preventDefault();

			const onMouseMove = event => {
				mousePositionRef.current = {
					x: event.clientX,
					y: event.clientY
				};
			};

			for (const event of events) {
				rfDomNode.addEventListener(event, preventDefault);
			}

			rfDomNode.addEventListener('mousemove', onMouseMove);

			return () => {
				for (const event of events) {
					rfDomNode.removeEventListener(event, preventDefault);
				}
				rfDomNode.removeEventListener('mousemove', onMouseMove);
			};
		}
	}, [rfDomNode]);

	const copy = useCallback(() => {
		const selectedNodes = getNodes().filter(node => node.selected);
		const selectedEdges = getConnectedEdges(selectedNodes, getEdges()).filter(
			edge => {
				const isExternalSource = selectedNodes.every(n => n.id !== edge.source);
				const isExternalTarget = selectedNodes.every(n => n.id !== edge.target);

				return !(isExternalSource || isExternalTarget);
			}
		);

		setBufferedNodes(selectedNodes);
		setBufferedEdges(selectedEdges);
	}, [getNodes, getEdges]);

	const cut = useCallback(() => {
		const selectedNodes = getNodes().filter(node => node.selected);
		const selectedEdges = getConnectedEdges(selectedNodes, getEdges()).filter(
			edge => {
				const isExternalSource = selectedNodes.every(n => n.id !== edge.source);
				const isExternalTarget = selectedNodes.every(n => n.id !== edge.target);

				return !(isExternalSource || isExternalTarget);
			}
		);

		setBufferedNodes(selectedNodes);
		setBufferedEdges(selectedEdges);

		// A cut action needs to remove the copied nodes and edges from the graph.
		setNodes(nodes => nodes.filter(node => !node.selected));
		setEdges(edges => edges.filter(edge => !selectedEdges.includes(edge)));
	}, [getNodes, setNodes, getEdges, setEdges]);

	const paste = useCallback(
		(
			{ x: pasteX, y: pasteY } = screenToFlowPosition({
				x: mousePositionRef.current.x,
				y: mousePositionRef.current.y
			})
		) => {
			const minX = Math.min(...bufferedNodes.map(s => s.position.x));
			const minY = Math.min(...bufferedNodes.map(s => s.position.y));

			const nanoid = customAlphabet('12345', 5);

			const newNodes = bufferedNodes.map(node => {
				const id = nanoid();
				const x = pasteX + (node.position.x - minX);
				const y = pasteY + (node.position.y - minY);

				return { ...node, id, position: { x, y } };
			});

			const nodeIdMap = newNodes.reduce((map, node, index) => {
				map[bufferedNodes[index].id] = node.id;
				return map;
			}, {});

			const newEdges = bufferedEdges.map(edge => {
				const id = nanoid();
				const source = nodeIdMap[edge.source];
				const target = nodeIdMap[edge.target];

				return { ...edge, id, source, target };
			});

			setNodes(nodes => [
				...nodes.map(node => ({ ...node, selected: false })),
				...newNodes
			]);
			setEdges(edges => [
				...edges.map(edge => ({ ...edge, selected: false })),
				...newEdges
			]);
		},
		[bufferedNodes, bufferedEdges, screenToFlowPosition, setNodes, setEdges]
	);

	useShortcut(['Meta+x', 'Control+x'], cut);
	useShortcut(['Meta+c', 'Control+c'], copy);
	useShortcut(['Meta+v', 'Control+v'], paste);
	return { copy, cut, paste, bufferedNodes, bufferedEdges };
};

function useShortcut(keyCode, callback) {
	const [didRun, setDidRun] = useState(false);
	const shouldRun = useKeyPress(keyCode);

	useEffect(() => {
		if (shouldRun && !didRun) {
			callback();
			setDidRun(true);
		} else {
			setDidRun(shouldRun);
		}
	}, [shouldRun, didRun, callback]);
}
