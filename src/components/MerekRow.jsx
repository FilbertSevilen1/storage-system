import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
  } from "@mui/material";
  import React, { useRef, useState } from "react";
  function MerekRow(props) {
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const vertical = "top";
    const horizontal = "center";
  
    let [id, setID] = useState(props.brandId);
    let [name, setName] = useState(props.brandName);
    let [type, setType] = useState(props.brandCategory);
    const [editDialog, setEditDialog] = useState(false);
  
    const editBrandNama = useRef("");
    const [editBrandNamaDefault, setEditBrandNamaDefault] = useState("");
    const [editBrandType, setEditBrandType] = useState("");
  
    const [errorEditBrandNama, setErrorEditBrandNama] = useState(false);
    const [errorEditBrandNamaMessage, setErrorEditBrandNamaMessage] =
      useState("");
  
    const handleInputBrand = (event) => {
      setEditBrandType(event.target.value);
    };
  
    const resetErrorMessage = () =>{
      setErrorEditBrandNamaMessage("");
      setErrorEditBrandNama(false);
    }
  
    const openEditDialog = (name, type) => {
      setEditBrandNamaDefault(name);
      setEditBrandType(type);

      console.log(editBrandType)
  
      resetErrorMessage();
  
      return setEditDialog(true);
    };
    const closeEditDialog = () => {
      setEditDialog(false);
    };
  
    const checkBrandNama = () => {
      if (editBrandNama.current.value == "") {
        setErrorEditBrandNama(true);
        return setErrorEditBrandNamaMessage(
          "Nama Brand tidak boleh kosong"
        );
      }
      setErrorEditBrandNamaMessage("");
      return setErrorEditBrandNama(false);
    };
  
    const onSubmit = () => {
      if (editBrandNama.current.value == "") {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Nama Brand tidak boleh kosong");
      }
      return closeEditDialog()
    };
  
    return (
      <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={snackbar}
          autoHideDuration={3000}
          message={snackbarMessage}
          key={"top" + "center"}
        />
        <Dialog open={editDialog} onClose={closeEditDialog}>
          <DialogTitle>Edit Merek</DialogTitle>
          <DialogContent>
            <div className="w-full flex justify-between">
              <div className="p-2 w-96">
                <TextField
                  onChange={checkBrandNama}
                  error={errorEditBrandNama}
                  margin="dense"
                  id="name"
                  name="name"
                  label="Nama"
                  type="text"
                  fullWidth
                  variant="outlined"
                  inputRef={editBrandNama}
                  defaultValue={editBrandNamaDefault}
                />
                <div className="text-red-500 text-md">
                  {errorEditBrandNamaMessage}
                </div>
              </div>
              <div className="p-2 w-96 mt-2">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Kategori
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={editBrandType}
                    label="Brand"
                    onChange={handleInputBrand}
                    placeholder="Kategori"
                    fullWidth
                  >
                    
                  </Select>
                </FormControl>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditDialog}>Cancel</Button>
            <Button onClick={onSubmit} type="submit">
              <b>Ubah</b>
            </Button>
          </DialogActions>
        </Dialog>
        <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
          <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Id : </div>
            {id}
          </div>
          <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Nama : </div>
            {name}
          </div>
          <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Tipe : </div>
            {type}
          </div>
          <div className=" w-full md:w-3/12 flex mx-2 p-2 rounded-xl flex justify-center items-center">
            <div
              onClick={() => openEditDialog(name, type)}
              className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="black"
                  d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5zm6.575-5.6l.925-.975l-.925-.925l-.95.95z"
                />
              </svg>
            </div>
            {/* <div className="mx-1 p-1 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="black"
                  d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
                />
              </svg>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
  export default MerekRow;
  