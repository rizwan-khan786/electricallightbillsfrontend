// ImportBills.js
import React, { useState } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';
import * as XLSX from 'xlsx';

const ImportBills = ({ open, handleClose, handleImport }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        handleImport(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ ...modalStyle, width: 400 }}>
        <Typography variant="h6" component="h2">
          Import Bills
        </Typography>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
        <Button onClick={handleFileUpload}>Upload</Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default ImportBills;
