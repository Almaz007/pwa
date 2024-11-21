import { useReactFlow, useStore } from '@xyflow/react';
import useDetachNodes from './useDetachNodes';

const useToolbar = id => {
	const detachNodes = useDetachNodes();
	const { deleteElements } = useReactFlow();
	const hasParent = useStore(store => store.nodeLookup.get(id).parentId);
	const onDelete = () => {
		deleteElements({
			nodes: [{ id }]
		});
	};
	const onDetach = () => {
		detachNodes([id]);
	};
	return {
		onDelete,
		onDetach,
		hasParent
	};
};

export default useToolbar;
