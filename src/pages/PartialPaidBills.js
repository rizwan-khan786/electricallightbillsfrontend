import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
const PartialPaidBills = () => {
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const partialbills = bills.filter((bill) => bill.paymentStatus === 'Partial' && bill.approvedStatus==='PartialDone'
);

const gridStyle = {
  height: 'auto',
  width: isSidebarOpen ? '80%' : '90%',
  marginLeft: isSidebarOpen ? '19%' : '7%',
  transition: 'margin-left 0.3s',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '30px 0px',
  paddingLeft: '10px',
};

const innerDivStyle = {
  border: '1px solid #F7F7F8',
  width: '99%',
  padding: '30px 10px',
};

const rowColors = ['#F7F9FB', 'white'];

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-cell': {
    padding: theme.spacing(1),
  },
  '& .MuiDataGrid-row': {
    '&:nth-of-type(odd)': {
      backgroundColor: rowColors[0],
    },
    '&:nth-of-type(even)': {
      backgroundColor: rowColors[1],
    },
  },
}));

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
    // F7F9FB
    backgroundColor: '#FB404B',
    color: 'white',
    fontSize: '14px',
    padding: '10px 15px',
    borderRadius: '4px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: '#FB404B',
    
  },
});

const formatDate = (dateString) => {
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'FIRST NAME', width: 130 },
    { field: 'lastName', headerName: 'LAST NAME', width: 130 },
    { field: 'email', headerName: 'EMAIL', width: 130 },
    { field: 'contactNumber', headerName: 'CONTACT NUMBER', width: 130 },
    { field: 'address', headerName: 'ADDRESS', width: 130 },
    { field: 'ward', headerName: 'WARD', width: 130 },
    { field: 'meterNumber', headerName: 'METER NUMBER', width: 130 },
    { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
    { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
    { field: 'currentReading', headerName: 'CURRENT READING', width: 130 },
    { field: 'previousReading', headerName: 'PREVIOUS READING', width: 130 },
    { field: 'currentBillAmount', headerName: 'CURRENT BILL AMOUNT', width: 130 },
    { field: 'totalArrears', headerName: 'TOTAL ARREARS', width: 130 },
    { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 130 },
    { field: 'roundedBillAmount', headerName: 'ROUNDED BILL AMOUNT', width: 130 },
    { field: 'ifPaidBefore', headerName: 'IF PAID BEFORE', width: 130 },
    { field: 'dueDate', headerName: 'DUE DATE', width: 130 },
    { field: 'ifPaidAfter', headerName: 'IF PAID AFTER', width: 130 },
    { field: 'paymentStatus', headerName: 'PAYMENT STATUS', width: 130 },
    { field: 'paidAmount', headerName: 'PAID AMOUNT', width: 130 },
    { field: 'pendingAmount', headerName: 'PENDING AMOUNT', width: 130 },
    { field: 'approvedStatus', headerName: 'APPROVED STATUS', width: 130 },
  ];

  const rows = partialbills.map((bill, index) => ({
    id: index + 1,
    firstName: bill.firstName,
    lastName: bill.lastName,
    email: bill.email,
    contactNumber: bill.contactNumber,
    address: bill.address,
    ward: bill.ward,
    meterNumber: bill.meterNumber,
    totalConsumption: bill.totalConsumption,
    meterStatus: bill.meterStatus,
    currentReading: bill.currentReading,
    previousReading: bill.previousReading,
    currentBillAmount: bill.currentBillAmount,
    totalArrears: bill.totalArrears,
    netBillAmount: bill.netBillAmount,
    roundedBillAmount: bill.roundedBillAmount,
    ifPaidBefore: bill.ifPaidBefore,
    dueDate: formatDate(bill.dueDate),
    ifPaidAfter: bill.ifPaidAfter,
    paymentStatus: bill.paymentStatus || '-',
    paidAmount:bill.paidAmount?bill.paidAmount:0,
    pendingAmount:bill.paidAmount?bill.roundedBillAmount-bill.paidAmount:bill.roundedBillAmount,
    approvedStatus: bill.approvedStatus || '-',
    flag: bill.flag,
  }));

 

  return (
    <div style={gridStyle}>
<Box sx={innerDivStyle}>
      <Typography variant="h5" gutterBottom>
        Partial Paid Bills
      </Typography>
      <StyledDataGrid rows={rows} columns={columns} pageSize={5} />
    </Box>
    </div>
    
  );
};

export default PartialPaidBills;