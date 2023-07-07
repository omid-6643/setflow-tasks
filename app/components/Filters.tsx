"use client";
import { useState } from "react";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { useFilterContext } from "../context/filter";

import MainTable from "./Table";

const Filters = () => {
  const { updateFilters, updateSort, allModels } = useFilterContext();

  let category = ["All", ...new Set(allModels?.map((item) => item.category))];
  let brand = ["All", ...new Set(allModels?.map((item) => item.brand))];

  const [checked, setChecked] = useState<boolean | null>(null);
  const sort = ["Date"];

  const handleChecked = (
    event: React.MouseEvent<HTMLElement>,
    newChecked: boolean | null
  ) => {
    setChecked(newChecked);
    updateFilters({ name: "active", value: newChecked });
  };

  return (
    <>
      <Typography variant="h2" gutterBottom>
        Sets
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ m: 3 }}
      >
        <ToggleButtonGroup
          value={checked}
          exclusive
          onChange={handleChecked}
          aria-label="text checked"
          color="primary"
          size="small"
          sx={{ fontSize: 50 }}
        >
          <ToggleButton
            value={true}
            sx={{ fontSize: 15, px: 4, textTransform: "none" }}
          >
            Active
          </ToggleButton>
          <ToggleButton
            value={false}
            sx={{ fontSize: 15, px: 4, textTransform: "none" }}
          >
            Archived
          </ToggleButton>
        </ToggleButtonGroup>
        <Button
          endIcon={<AddIcon />}
          sx={{
            fontSize: 15,
            px: 4,
            color: "black",
            background: "yellow",
            borderRadius: 10,
            border: "none",
            textTransform: "none",
          }}
        >
          New Set
        </Button>
      </Stack>
      <Divider sx={{ bgcolor: "black" }} />

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ m: 3 }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
        >
          <Autocomplete
            id="combo-box-demo"
            options={category}
            onChange={(event: any, newValue: string | null) => {
              updateFilters({ name: "category", value: newValue });
            }}
            sx={{
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
              width: 200,
            }}
            renderInput={(params) => (
              <TextField {...params} label="Category" variant="standard" />
            )}
          />
          <Autocomplete
            id="combo-box-demo"
            options={brand}
            sx={{ width: 200 }}
            onChange={(event: any, newValue: string | null) => {
              updateFilters({ name: "brand", value: newValue });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Brand" variant="standard" />
            )}
          />
        </Stack>

        <Autocomplete
          id="combo-box-demo"
          options={sort}
          sx={{ width: 300 }}
          onChange={(event: any, newValue: string | null) => {
            updateSort({ name: "date", value: newValue });
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Sort"
              variant="outlined"
              sx={{
                ".MuiInputBase-root": {
                  borderRadius: "50px !important",
                },
              }}
            />
          )}
        />
      </Stack>
      <Divider sx={{ bgcolor: "black" , mb: 3}} />

      <MainTable />
    </>
  );
};

export default Filters;
