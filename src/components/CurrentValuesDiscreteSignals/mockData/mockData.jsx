import Checkbox from "@mui/material/Checkbox";

export const rows = [
  { id: 1, name: "Направление", type: "value", value: "+" },
  { id: 2, name: "Линия под нагрузкой", type: "checkBoxValue", value: true },
  { id: 3, name: "Линия под напряжением", type: "checkBoxValue", value: false },
  { id: 4, name: "Низкий заряд АКБ", type: "checkBoxValue", value: true },
  { id: 5, name: "МФ КЗ", type: "checkBoxValue", value: true },
  { id: 6, name: "КЗ спереди", type: "checkBoxValue", value: true },
  { id: 7, name: "КЗ сзади", type: "checkBoxValue", value: true },
  { id: 8, name: "ОЗЗ", type: "checkBoxValue", value: true },
  { id: 9, name: "ОЗЗ спереди", type: "checkBoxValue", value: true },
  { id: 10, name: "ОЗЗ сзади", type: "checkBoxValue", value: true },
  { id: 11, name: "Обледенение провода", type: "checkBoxValue", value: true },
  { id: 12, name: "Успешное АПВ ", type: "checkBoxValue", value: true },
  {
    id: 13,
    name: "Состояние GSM сигнала(для мастера)",
    type: "value",
    value: "хорошее",
  },
  { id: 14, name: "Связь с мастером", type: "checkBoxValue", value: true },
  {
    id: 15,
    name: "Потеря связи со Slave индикаторами",
    type: "checkBoxValue",
    value: true,
  },
  { id: 16, name: "Неисправность GSM", type: "checkBoxValue", value: true },
  {
    id: 17,
    name: "Неисправность процессора",
    type: "checkBoxValue",
    value: true,
  },
  {
    id: 18,
    name: "Неисправность отбора тока",
    type: "checkBoxValue",
    value: true,
  },
  { id: 19, name: "Состояние блинкера", type: "checkBoxValue", value: false },
  // Добавьте больше строк по мере необходимости
];

export const columns = (handleCheckboxChange) => [
  { field: "name", headerName: "Наименование", width: 150 },
  {
    field: "value",
    headerName: "Значение",
    width: 150,
    renderCell: (params) => {
      if (params.row.type === "value") {
        return params.value;
      }

      return (
        <Checkbox
          checked={params.value}
          onChange={() => handleCheckboxChange(params.id)}
        />
      );
    },
  },
];
