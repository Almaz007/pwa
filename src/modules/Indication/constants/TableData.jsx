import { Checkbox } from "@mui/material";

export const columns = (handleChange) => [
  { field: "name", headerName: "События", width: 250 },
  {
    field: "led1",
    headerName: "led1",

    renderCell: (params) => {
      return (
        <Checkbox
          checked={!!params.row[params.field]}
          onChange={() => handleChange(params.id, params.field)}
        />
      );
    },
  },
  {
    field: "led2",
    headerName: "led2",

    renderCell: (params) => {
      return (
        <Checkbox
          checked={!!params.row[params.field]}
          onChange={() => handleChange(params.id, params.field)}
        />
      );
    },
  },
  {
    field: "led3",
    headerName: "led3",

    renderCell: (params) => {
      return (
        <Checkbox
          checked={!!params.row[params.field]}
          onChange={() => handleChange(params.id, params.field)}
        />
      );
    },
  },

  {
    field: "blOn",
    headerName: "blOn",
    renderCell: (params) => {
      return (
        <Checkbox
          checked={!!params.row[params.field]}
          onChange={() => handleChange(params.id, params.field)}
        />
      );
    },
  },
  {
    field: "blOff",
    headerName: "blOff",

    renderCell: (params) => {
      return (
        <Checkbox
          checked={!!params.row[params.field]}
          onChange={() => handleChange(params.id, params.field)}
        />
      );
    },
  },
];
