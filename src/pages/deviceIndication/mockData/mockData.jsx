import MultipleSelect from "../../../components/UI/MultipleSelect/MultipleSelect";
import { MdDeleteForever } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { Checkbox } from "@mui/material";
const colors = ["Красный", "Синий", "Желтый", "Зеленый"];

export const rows = [
  {
    id: 1,
    name: "Не устранившиеся КЗ",
    led: [],
    mode: "",
    blinker: false,
    actions: "",
  },
  {
    id: 2,
    name: "Устранившиеся КЗ",
    led: [],
    mode: "",
    blinker: true,
    actions: "",
  },
  {
    id: 3,
    name: "ОЗЗ перед собой",
    led: [],
    mode: "",
    blinker: false,
    actions: "",
  },
  {
    id: 4,
    name: "ОЗЗ за спиной",
    led: [],
    mode: "",
    blinker: true,
    actions: "",
  },
  {
    id: 5,
    name: "Готовность модуля",
    led: [],
    mode: "",
    blinker: false,
    actions: "",
  },
  {
    id: 6,
    name: "Неисправность модуля",
    led: [],
    mode: "",
    blinker: false,
    actions: "",
  },
];

export const columns = (handleChange, handleCheckboxChange) => [
  { field: "id", headerName: "№", width: 100 },
  { field: "name", headerName: "События", width: 250 },
  {
    field: "led",
    headerName: "Светодиоды",
    width: 280,

    renderCell: (params) => {
      return (
        <MultipleSelect
          items={colors}
          value={params.row.led}
          handleChange={(event) => handleChange(params.id, event)}
        />
      );
    },
  },
  { field: "mode", headerName: "Режимы в Гц", width: 250, editable: true },
  {
    field: "blinker",
    headerName: "Блинкер",
    width: 300,
    renderCell: (params) => {
      return (
        <Checkbox
          checked={params.row.blinker}
          onChange={() => handleCheckboxChange(params.id)}
        />
      );
    },
  },

  {
    field: "actions",
    headerName: "",
    width: 250,
    renderCell: (params) => {
      return <Actions />;
    },
  },
];

function Actions() {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "20px",
      }}
    >
      <GrUpdate style={{ cursor: "pointer" }} />
      <MdDeleteForever style={{ cursor: "pointer" }} />
    </div>
  );
}
