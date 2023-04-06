import { Button, Modal, TextField } from "@mui/material";
import { useState } from "react";

const EditModal = ({ open, handleClose, handleSave, value }) => {
  const [inputValue, setInputValue] = useState(value)

  const handleChange = (event) => {
    setInputValue(event.target.value)
  };

  const handleModalClose = () => {
    handleClose()
    setInputValue(value)
  };

  const handleModalSave = () => {
    handleSave(inputValue)
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleModalClose}>
      <div className="modal">
        <TextField label="Edit" value={inputValue} onChange={handleChange} />
        <Button onClick={handleModalSave}>Save</Button>
      </div>
    </Modal>
  );
};

export default EditModal