import { CustomSelect } from "../../../components/UI/CustomSelect/CustomSelect";
import { Select } from "../../../components/UI/Select/Select";

import { useLogicalEditorState } from "../../LogicalEditor/store/store";

export const columns = (
  handleChangeInt,
  handleChangeBool,
  updateResultOffset
) => {
  const { offsetsTypes } = useLogicalEditorState.getState();

  return [
    { field: "id", headerName: "id", width: 250 },
    { field: "type", headerName: "название", width: 250 },
    {
      field: "value",
      headerName: "значение",
      width: 250,
      renderCell: (params) => {
        const ustavka = params.row;
        const out = ustavka.type.includes("output");

        if (ustavka.dataType === "bool") {
          return (
            <CustomSelect
              values={[0, 1]}
              value={ustavka.value}
              // label="значения"
              handleChange={(event) =>
                handleChangeBool(
                  out ? ustavka.resultOffset : ustavka.sourcesOffsets[0],
                  event
                )
              }
            />
          );
        }
        if (ustavka.dataType === "int") {
          return (
            <input
              value={ustavka.value}
              onChange={(event) =>
                handleChangeInt(
                  out ? ustavka.resultOffset : ustavka.sourcesOffsets[0],
                  event
                )
              }
            />
          );
        }
      },
    },
  ];
};
