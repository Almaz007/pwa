import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const CustomSelect = ({ values, value, handleChange, label }) => {
  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(event) => handleChange(event.target.value)}
      >
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
