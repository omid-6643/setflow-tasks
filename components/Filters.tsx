import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";

import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import { useModel } from "@/hooks/useModel";

const Filters = () => {
  const [alignment, setAlignment] = useState<string | null>("active");
  const { data } = useModel();

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const category = ["All", ...new Set(data?.map((item) => item.category))];
  const brand = ["All", ...new Set(data?.map((item) => item.brand))];
  const sort = ['Date', 'Active']

  return (
    <>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
      >
        <ToggleButton value="active" aria-label="left aligned">
          Active
        </ToggleButton>
        <ToggleButton value="archived" aria-label="centered">
          Archived
        </ToggleButton>
      </ToggleButtonGroup>
      <Button variant="outlined" startIcon={<AddIcon />}>
        New Set
      </Button>
      <Divider />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={category}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Category" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={brand}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Brand" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={sort}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Sort" />}
      />
    </>
  );
};

export default Filters;
