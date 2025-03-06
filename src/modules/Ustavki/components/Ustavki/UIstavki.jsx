import { shallow } from "zustand/shallow";
import { useLogicalEditorState } from "../../../LogicalEditor/store/store";
import { useMemo } from "react";
import {
  combineBytesToInt,
  splitIntToBytes,
} from "../../../LogicalEditor/helpers/helpers";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "../../constants/TableData";
import { useReactFlow } from "@xyflow/react";

export const Ustavki = () => {
  const [
    nodes,
    ustavkiValues,
    setUstavkiValues,
    offsetsTypes,
    setOffsets,
    updateNodes,
  ] = useLogicalEditorState(
    (state) => [
      state.nodes,
      state.ustavkiValues,
      state.setUstavkiValues,
      state.offsetsTypes,
      state.setOffsets,
      state.updateNodes,
    ],
    shallow
  );
  console.log(ustavkiValues);
  const ustavki = useMemo(() => {
    return nodes
      .filter((node) => node.data.ustavka)
      .map((node) => {
        const nodeUstavka = node.data;

        if (nodeUstavka.type.includes("output")) {
          if (nodeUstavka.dataType === "int") {
            const value = combineBytesToInt([
              ...ustavkiValues.slice(
                nodeUstavka.resultOffset,
                nodeUstavka.resultOffset + 4
              ),
            ]);

            return { id: node.id, ...nodeUstavka, value };
          }
          if (nodeUstavka.dataType === "bool") {
            const value = ustavkiValues[nodeUstavka.resultOffset];
            return { id: node.id, ...nodeUstavka, value };
          }
        } else {
          if (nodeUstavka.dataType === "int") {
            const value = combineBytesToInt([
              ...ustavkiValues.slice(
                nodeUstavka.sourcesOffsets[0],
                nodeUstavka.sourcesOffsets[0] + 4
              ),
            ]);

            return { id: node.id, ...nodeUstavka, value };
          }
          if (nodeUstavka.dataType === "bool") {
            const value = ustavkiValues[nodeUstavka.sourcesOffsets[0]];
            return { id: node.id, ...nodeUstavka, value };
          }
        }
      });
  }, [nodes, ustavkiValues]);

  const handleChangeInt = (ustavkiOffset, event) => {
    const newUstavkiValues = [...ustavkiValues];

    newUstavkiValues.splice(
      ustavkiOffset,
      4,
      ...splitIntToBytes(+event.target.value)
    );

    setUstavkiValues([...newUstavkiValues]);
  };

  const handleChangeBool = (ustavkiOffset, event) => {
    const newUstavkiValues = [...ustavkiValues];
    newUstavkiValues[ustavkiOffset] = +event.target.value;

    setUstavkiValues(newUstavkiValues);
  };

  return (
    <DataGrid
      getRowHeight={() => 70}
      hideFooter
      pageSize={false}
      rows={ustavki}
      columns={columns(handleChangeInt, handleChangeBool)}
      disableSelectionOnClick
    />
  );
};
