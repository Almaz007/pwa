import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const CustomSelect = ({ values, value, handleChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Age</InputLabel>
      <Select value={value} label="processor" onChange={handleChange}>
        {values.map((value) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
