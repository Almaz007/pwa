import { DataGrid } from "@mui/x-data-grid";
import { rows, columns } from "./mockData/mockData";
import Button from "../UI/button/Button";

const MekSettings103 = ({ setCsIndex }) => {
  return (
    <div>
      <div style={{ display: "flex", columnGap: "12px", marginBottom: "20px" }}>
        <Button handleClick={() => setCsIndex("0")}>Клиент</Button>
        <Button handleClick={() => setCsIndex("1")}>Сервер</Button>
      </div>
      <DataGrid rows={rows} columns={columns} hideFooter />;
    </div>
  );
};

export default MekSettings103;
