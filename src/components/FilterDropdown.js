import React from "react";
import { FormControl, InputLabel, Select, MenuItem, Box, Typography } from "@material-ui/core";

const FilterDropdown = ({ filter, setFilter }) => {
  return (
    <Box sx={{ maxWidth: 300, margin: "0 auto", padding: 2 }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Status Filter</InputLabel>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          label="Status Filter"
          sx={{
            borderRadius: 1,
            padding: "8px 15px",
            fontSize: "16px",
            backgroundColor: "#fff",
          }}
        >
          <MenuItem value="">
            <Typography variant="body1">All</Typography>
          </MenuItem>
          <MenuItem value="To Do">
            <Typography variant="body1">To Do</Typography>
          </MenuItem>
          <MenuItem value="In Progress">
            <Typography variant="body1">In Progress</Typography>
          </MenuItem>
          <MenuItem value="Done">
            <Typography variant="body1">Done</Typography>
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterDropdown;
