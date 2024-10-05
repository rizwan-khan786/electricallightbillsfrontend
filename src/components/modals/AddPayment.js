import React from 'react';
import { Box, Button, MenuItem, Select, TextField, Typography, FormControl, InputLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas'; 
const validationSchema = Yup.object({
  accountNumber: Yup.string().required('Account Number is required'),
  bank: Yup.string().required('Bank is required'),
  amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
});

const AddPayment = ({ open, handleClose, selectedBill }) => {
  const formik = useFormik({
    initialValues: {
      accountNumber: '',
      bank: '',
      amount: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(`Payment of ₹${values.amount} to ${values.bank} for account number ${values.accountNumber} is being processed.`);
      handleClose();
    },
  });

  const handleDownload = async () => {
    if (selectedBill) {
      const billContainer = document.getElementById('bill-details');
      const billDetails = `
        <div style="text-align: center; font-size: 16px; font-weight: bold;">
          Bill Details
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd; width: 50%;">First Name:</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${selectedBill.firstName}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd;">Last Name:</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${selectedBill.lastName}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd;">Email:</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${selectedBill.email}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd;">Username:</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${selectedBill.username}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd;">Contact Number:</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${selectedBill.contactNumber}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd;">Address:</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${selectedBill.address}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd;">Role:</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${selectedBill.role}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd;">Ward:</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${selectedBill.ward}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd;">Bill Amount:</td>
            <td style="padding: 5px; border: 1px solid #ddd;">₹${selectedBill.billAmount}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd;">Amount Payable:</td>
            <td style="padding: 5px; border: 1px solid #ddd;">₹${selectedBill.amountPayable}</td>
          </tr>
          <tr>
            <td style="padding: 5px; border: 1px solid #ddd;">Due Date:</td>
            <td style="padding: 5px; border: 1px solid #ddd;">${selectedBill.dueDate}</td>
          </tr>
        </table>
      `;

      const doc = new jsPDF();
      const canvas = await html2canvas(billContainer);
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 10, 190, 0);
      doc.save('bill_details.pdf');
    } else {
      alert('Please select a bill first.');
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        boxShadow: 24,
        p: 4,
        maxWidth: '400px',
        width: '100%',
        borderRadius: '8px',
        textAlign: 'center',
        display: open ? 'block' : 'none',
        zIndex: 6,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Bill Details
      </Typography>
      {selectedBill && (
        <Box id="bill-details" sx={{ mb: 2 }}>
          <Typography variant="body2">First Name: {selectedBill.firstName}</Typography>
          <Typography variant="body2">Last Name: {selectedBill.lastName}</Typography>
          <Typography variant="body2">Email: {selectedBill.email}</Typography>
          <Typography variant="body2">Username: {selectedBill.username}</Typography>
          <Typography variant="body2">Contact Number: {selectedBill.contactNumber}</Typography>
          <Typography variant="body2">Address: {selectedBill.address}</Typography>
          <Typography variant="body2">Role: {selectedBill.role}</Typography>
          <Typography variant="body2">Ward: {selectedBill.ward}</Typography>
          <Typography variant="body2">Bill Amount: ₹{selectedBill.billAmount}</Typography>
          <Typography variant="body2">Amount Payable: ₹{selectedBill.amountPayable}</Typography>
          <Typography variant="body2">Due Date: {selectedBill.dueDate}</Typography>
        </Box>
      )}
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" color="primary" onClick={handleDownload}>
            Download
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleClose} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddPayment;
