import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useState, memo } from "react";
import { useOscilogramms } from "../../../store/store";

const CustomSelect = memo(({ channels }) => {
  const visibilityControl = useOscilogramms((state) => state.visibilityControl);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    visibilityControl(value[0]);
  };

  return (
    <FormControl sx={{ m: 1, width: 300, marginBottom: "40px" }}>
      {/* <InputLabel id="demo-multiple-checkbox-label">Каналы</InputLabel> */}
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={[]}
        onChange={handleChange}
        displayEmpty
        renderValue={(_) => {
          return "Каналы"; // Статичное название
        }}
        // input={<OutlinedInput label="Каналы" />}
      >
        {channels.map((channel) => (
          <MenuItem key={channel.id} value={channel.id}>
            <Checkbox checked={channel.visible} />
            <ListItemText primary={channel.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
CustomSelect.displayName = "CustomSelect";

export default CustomSelect;
