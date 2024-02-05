import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import PeralatanRow from "../../components/PeralatanRow";
import PeralatanHeader from "../../components/PeralatanHeader";
import Heading from "../../components/base/Heading";
function Peralatan() {
  const searchItem = useRef();
  const [searchCategory, setSearchCategory] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchCount, setSearchCount] = useState("");

  const handleSearchCategory = (event) => {
    setSearchCategory(event.target.value);
  };
  const handleSearchType = (event) => {
    setSearchType(event.target.value);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => handleViewDetails(params.row.id)}
        >
          View Details
        </Button>
      ),
    },
  ];

  const rows = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    // Add more rows as needed
  ];

  const handleViewDetails = (id) => {
    // Implement your logic for viewing details
    console.log(`View details for ID: ${id}`);
  };

  return (
    <div className="w-full">
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-28">
        <div>
          <Heading title="List Perlatan"></Heading>
        </div>

        <div className="w-full flex items-center my-8 shadow-md px-8 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
            />
          </svg>
          <div className="w-full ml-4">
            <Input
              inputRef={searchItem}
              id=""
              label="Username"
              variant="standard"
              className="w-full"
              placeholder="Cari Barang di sini"
            />
          </div>
        </div>
        <div className="w-full flex flex-col xl:flex-row mb-12">
          <div className="w-full xl:w-1/4 p-4 md:p-8 shadow-xl">
            <div className="w-full">
              <Button variant="contained" size="large" fullWidth>
                + Tambah Peralatan
              </Button>
              <div className="w-full mt-8">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Kategori
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchCategory}
                    label="Kategori"
                    onChange={handleSearchCategory}
                    placeholder="Kategori"
                    fullWidth
                  >
                    <MenuItem value={"Elektronik"}>Elektronik</MenuItem>
                    <MenuItem value={"Alat Tulis"}>Alat Tulis</MenuItem>
                    <MenuItem value={"Lainnya"}>Lainnya</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="w-full mt-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tipe</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchType}
                    label="Tipe"
                    onChange={handleSearchType}
                    placeholder="Tipe"
                    fullWidth
                  >
                    <MenuItem value={"Berseri"}>Berseri</MenuItem>
                    <MenuItem value={"Tidak Berseri"}>Tidak Berseri</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="w-full mt-4">
                <TextField
                  inputRef={searchCount}
                  type="number"
                  id="standard-basic"
                  label="Jumlah Minimum"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
          </div>
          <div className="w-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 md:ml-4">
            <PeralatanHeader></PeralatanHeader>
            <PeralatanRow></PeralatanRow>
            <PeralatanRow></PeralatanRow>
            <PeralatanRow></PeralatanRow>
            <PeralatanRow></PeralatanRow>
            <PeralatanRow></PeralatanRow>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Peralatan;
