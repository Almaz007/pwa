import { DataGrid } from "@mui/x-data-grid";
import TabeLayout from "../../components/tableLayout/TableLayout";
import { rows as initialRows, columns } from "./mockData/mockData";
import { useState } from "react";

const DeviceIndication = () => {
  const [rows, setRows] = useState(initialRows);

  const handleChange = (id, event) => {
    const {
      target: { value },
    } = event;

    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              led: typeof value === "string" ? value.split(",") : value,
            }
          : row
      )
    );
  };
  const handleCheckboxChange = (id) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, blinker: !row.blinker } : row
      )
    );
  };
  const handleProcessRowUpdate = (newRow) => {
    const updatedRows = rows.map((row) =>
      row.id === newRow.id ? newRow : row
    );
    setRows(updatedRows);
    return newRow;
  };

  return (
    <div>
      <TabeLayout text={"Модуль индикации"}>
        <DataGrid
          getRowHeight={() => 70}
          hideFooter
          pageSize={false}
          rows={rows}
          columns={columns(handleChange, handleCheckboxChange)}
          processRowUpdate={handleProcessRowUpdate} // Сохранение изменений
          experimentalFeatures={{ newEditingApi: true }} // Включение нового API редактирования
          disableSelectionOnClick
        />
      </TabeLayout>
    </div>
  );
};

export default DeviceIndication;
