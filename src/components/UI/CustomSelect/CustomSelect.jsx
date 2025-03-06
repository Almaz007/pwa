import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const CustomSelect = ({ values, value, handleChange, label }) => {
  return (
    <FormControl sx={{ width: 200, m: 1 }}>
      {label && <InputLabel id="demo-simple-select-label">{label}</InputLabel>}
      <Select value={value} label={label ?? ""} onChange={handleChange}>
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
