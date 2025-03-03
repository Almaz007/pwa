export const columns = (handleChangeInt, handleChangeBool) => [
  { field: "name", headerName: "название", width: 250 },
  {
    field: "value",
    headerName: "значение",
    width: 250,
    renderCell: (params) => {
      const ustavka = params.row;

      if (ustavka.dataType === "bool") {
        return (
          <MultipleSelect
            items={[0, 1]}
            value={ustavka.value}
            handleChange={(event) =>
              handleChangeBool(ustavka.sourcesOffsets[0], event)
            }
          />
        );
      }
      if (ustavka.dataType === "int") {
        return (
          <input
            value={ustavka.value}
            handleChange={(event) =>
              handleChangeInt(ustavka.sourcesOffsets[0], event)
            }
          />
        );
      }
    },
  },
];
