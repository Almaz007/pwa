import { DataGrid } from "@mui/x-data-grid";
import { columns } from "../../constants/TableData";
import { useLogicalEditorState } from "../../../LogicalEditor/store/store";
import { shallow } from "zustand/shallow";
import { useEffect, useMemo } from "react";
import { useIndicationsState } from "../../store/store";
import { useIndication } from "../../hooks/useIndication";

export const Indication = () => {
  const [indications, setIndications] = useIndicationsState(
    (state) => [state.indications, state.setIndications],
    shallow
  );
  const {} = useIndication();

  const [nodes] = useLogicalEditorState((state) => [state.nodes], shallow);

  const rows = useMemo(() => {
    const result = Object.entries(indications).map(
      (indication) => indication[1]
    );

    return result;
  }, [indications]);

  useEffect(() => {
    const outputs = nodes.filter((node) =>
      node?.data?.type?.includes("output")
    );
    console.log("outputs: ", outputs);
    const newIndications = outputs.reduce((newIndications, output) => {
      if (indications[output.id]) {
        newIndications[output.id] = {
          ...indications[output.id],
          name: output.data.name,
        };
      } else {
        newIndications[output.id] = {
          id: output.id,
          name: output.data.name,
          led1: 0,
          led2: 0,
          led3: 0,
          blOn: 0,
          blOff: 0,
        };
      }
      return newIndications;
    }, {});

    setIndications(newIndications);
  }, [nodes]);

  const handleChange = (id, fieldName) => {
    const res = Object.entries(indications).find(
      (indication) => indication[1][fieldName] === 1
    );

    if (!res) {
      const newIndications = {
        ...indications,
        [id]: {
          ...indications[id],
          [fieldName]: indications[id][fieldName] ? 0 : 1,
        },
      };
      setIndications(newIndications);
      return;
    }

    if (res[1].id !== id) return;

    const newIndications = {
      ...indications,
      [id]: {
        ...indications[id],
        [fieldName]: indications[id][fieldName] ? 0 : 1,
      },
    };
    setIndications(newIndications);
  };

  return (
    <div>
      <DataGrid
        hideFooter
        pageSize={false}
        disableSelectionOnClick
        rows={rows}
        columns={columns(handleChange)}
      />
    </div>
  );
};
