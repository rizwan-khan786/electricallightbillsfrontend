import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills, updateBillStatusAction, updateFlagStatus } from '../store/actions/billActions'; 
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box,Modal } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import UndoIcon from '@mui/icons-material/Undo';
import AddBill from '../components/modals/AddBill';
import AddPayment from '../components/modals/AddPayment';
import ForwardIcon from '@mui/icons-material/Forward';
import './ConsumerBill.css';
import { styled } from '@mui/material/styles';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ApprovedStatusRecord = () => {
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector(state => state.auth.user);
  const [billOpen, setBillOpen] = useState(false);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [cBillAmount,setCBillAmount]=useState(0);
  const [tArrears,setArrears]=useState(0);
  const [nBillAmount,setNBillAmount]=useState(0);
  const [rBillAmount,setRBillAmount]=useState(0);
  const [paidBefore,setPaidBefore]=useState(0);
  const [paidAfter,setPaidAfter]=useState(0);
  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);
  useEffect(()=>{
    setCBillAmount(bills?.currentBillAmount)
    setArrears(bills?.totalArrears)
    setNBillAmount(bills?.netBillAmount)
    setRBillAmount(bills?.roundedBillAmount)
    setPaidAfter(bills?.ifPaidBefore)
    setPaidBefore(bills?.ifPaidAfter)
  },[])
  const getFilteredBills = () => {
    if (user?.role === 'Junior Engineer') {
      return bills.filter(bill => bill.approvedStatus === 'PendingForJuniorEngineer'||bill.approvedStatus === 'Initial' || bill.approvedStatus === 'PendingForExecutiveEngineer');
    }
    else if (user?.role === 'Executive Engineer') {
      return bills.filter(bill => bill.approvedStatus === 'PendingForExecutiveEngineer' || bill.approvedStatus === 'PendingForAdmin');
    } else if (user?.role === 'Admin') {
      return bills.filter(bill => bill.approvedStatus === 'PendingForAdmin'|| bill.approvedStatus === 'PendingForSuperAdmin');
    } else if (user?.role === 'Super Admin') {
      return bills.filter(bill => bill.approvedStatus === 'PendingForSuperAdmin' || bill.approvedStatus === 'Done');
    }
    return [];
  };
  const filteredBills = getFilteredBills();
  if (loading) {
    return <p>Loading...</p>;
  } 
  if (error) {
    return <p>Error: {error}</p>;
  }
  const handleAddBillOpen = () => setBillOpen(true);
  const handleAddBillClose = () => setBillOpen(false);
  const handleAddPaymentClose = () => setAddPaymentOpen(false);
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  const rows = filteredBills.map((bill, index) => ({
    _id: bill._id,
    id: index + 1,
    firstName: bill.firstName,
    lastName: bill.lastName,
    email: bill.email,
    username: bill.username || '-',
    contactNumber: bill.contactNumber,
    meterNumber: bill.meterNumber || '-',
    totalConsumption: bill.totalConsumption,
    meterStatus: bill.meterStatus,
    currentReading: bill.currentReading,
    previousReading: bill.previousReading,
    currentBillAmount: bill.currentBillAmount,
    totalArrears: bill.totalArrears,
    netBillAmount: bill.netBillAmount,
    roundedBillAmount: bill.roundedBillAmount,
    address: bill.address || '-',
    ward: bill?.ward,
    paymentStatus: bill.paymentStatus || '-',
    approvedStatus: bill.approvedStatus || '-',
    paidAmount:bill.paidAmount?bill.paidAmount:0,
    pendingAmount:bill.paidAmount?bill.roundedBillAmount-bill.paidAmount:bill.roundedBillAmount,
    ifPaidBefore: bill.ifPaidBefore,
    dueDate: formatDate(bill.dueDate),
    ifPaidAfter: bill.ifPaidAfter,
    flagStatus: bill.flagStatus,
  }));
const handleApproveClick = (bill, yesno) => {
  let approvedStatus;
  let paymentStatus;
  if (!bill || !bill._id) {
    console.error("Bill or Bill _id is missing");
    return;
  }
  if (user?.role === 'Junior Engineer') {
    if (yesno === 'No') {
      approvedStatus = 'Initial';
      paymentStatus = 'UnPaid';
    } else {
      approvedStatus = 'PendingForExecutiveEngineer';
      paymentStatus = 'Pending';
    }
  }
  else if (user?.role === 'Executive Engineer') {
   if(yesno==='Yes' && bill.paymentStatus==='Partial'){
    approvedStatus='PendingForAdmin';
    paymentStatus='Partial'
   }else if(yesno==='No' && bill.paymentStatus==='Partial'&& bill.approvedStatus==='PendingForAdmin'){
    approvedStatus='PendingForExecutiveEngineer';
    paymentStatus='Partial'
   }else if(yesno==='Yes' && bill.paymentStatus==='Pending' && bill.approvedStatus==='PendingForExecutiveEngineer' && bill.pendingAmount>0 && bill.paidAmount<bill.roundedBillAmount && bill.pendingAmount!==0){
    approvedStatus='PendingForAdmin';
    paymentStatus='Partial'
   }else if(yesno==='Yes' && bill.paymentStatus==='Pending'&& bill.approvedStatus==='PendingForExecutiveEngineer' && bill.pendingAmount===bill.roundedBillAmount && bill.paidAmount===0 && bill.pendingAmount!==0){
    approvedStatus='PendingForAdmin';
    paymentStatus='Pending';
   }else if(yesno==='Yes' && bill.paymentStatus==='UnPaid'&& bill.approvedStatus==='PendingForExecutiveEngineer'){
    approvedStatus='PendingForAdmin';
    paymentStatus='UnPaid';
   }else if(yesno==='No' && bill.paymentStatus==='UnPaid'&& bill.approvedStatus==='PendingForAdmin'){
    approvedStatus='PendingForExecutiveEngineer';
    paymentStatus='UnPaid';
   }
   else{
    approvedStatus='PendingForAdmin';
    paymentStatus='Pending'
   }
  }
  else if (user?.role === 'Admin') {
    if (yesno === 'No' && bill.approvedStatus === 'PendingForSuperAdmin' && bill.paymentStatus==='Pending') {
      approvedStatus = 'PendingForAdmin';
      paymentStatus = 'Pending';
      toast.info('Bill sent back to Admin for review');
    }else if(yesno === 'Yes' && bill.approvedStatus === 'PendingForAdmin' && bill.paymentStatus==='Paid') {
      approvedStatus = 'PendingSuperForAdmin';
      paymentStatus = 'Paid';
      toast.info('Bill sent back to Admin for review');
    }
    else if(yesno === 'No' && bill.approvedStatus === 'PendingForSuperAdmin' && bill.paymentStatus==='Paid') {
      approvedStatus = 'PendingForAdmin';
      paymentStatus = 'Paid';
      toast.info('Bill sent back to Admin for review');
    }
    else if(yesno==='Yes' && bill.paymentStatus==='UnPaid'&& bill.approvedStatus==='PendingForAdmin'){
      approvedStatus='PendingForSuperAdmin';
      paymentStatus='UnPaid';
     }else if(yesno==='No' && bill.paymentStatus==='UnPaid'&& bill.approvedStatus==='PendingForSuperAdmin'){
      approvedStatus='PendingForAdmin';
      paymentStatus='UnPaid';
      toast.info('Bill sent back to Admin for review');
     }
    else {
      approvedStatus = 'PendingForSuperAdmin';
      paymentStatus = 'Pending';
      toast.success('Record forwarded to Super Admin');
    }
  }
  else if (user?.role === 'Super Admin') {
    if (yesno === 'No' && bill.approvedStatus === 'Done'&& bill.paymentStatus === 'Paid') {
      approvedStatus = 'PendingForSuperAdmin';
      paymentStatus = 'Pending';
      toast.info('Bill sent back to Super Admin for review');
    }else if (yesno === 'Yes' && bill.approvedStatus === 'PendingForSuperAdmin'&& bill.paymentStatus === 'Pending' && bill.pendingAmount>0) {
      approvedStatus = 'PartialDone';
      paymentStatus = 'Partial';
      toast.success('Bill partially approved successfully!');
    }
    else if(yesno==='Yes' && bill.paymentStatus === 'Partial'){
      approvedStatus = 'PartialDone';
      paymentStatus = 'Partial';
    }
    else {
      if (bill.paidAmount === 0) {
        toast.error('You need to pay the bill first');
        return;
      }
      approvedStatus = 'Done';
      paymentStatus = 'Paid';
      toast.success('Bill approved successfully!');
    }
  }
  console.log(`Updating bill status for bill id: ${bill._id} to ${approvedStatus}`);
  dispatch(updateBillStatusAction(bill._id, approvedStatus, paymentStatus, yesno ));
};
const flagChange = (billId, flagStatus) => {
  dispatch(updateFlagStatus(billId, flagStatus));
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
    { field: 'paymentStatus', headerName: 'Payment Status', width: 130 },
    { field: 'approvedStatus', headerName: 'APPROVED STATUS', width: 130 },
    { field: 'paidAmount', headerName: 'PAID AMOUNT', width: 130 },
    { field: 'pendingAmount', headerName: 'PENDING AMOUNT', width: 130 },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 200,
        renderCell: (params) => (
          <>
          {
  !(
    (user?.role === 'Executive Engineer' && params.row.approvedStatus === 'PendingForAdmin') ||
    (user?.role === 'Admin' && params.row.approvedStatus === 'PendingForSuperAdmin')||
    (user?.role === 'Super Admin' && params.row.approvedStatus === 'Done')
  ) && (
    <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleApproveClick(params.row, 'Yes')}>
      <CheckIcon />
    </IconButton>
  )
}
{
  !(
    (user?.role === 'Executive Engineer' && params.row.approvedStatus === 'PendingForExecutiveEngineer') ||
    (user?.role === 'Admin' && params.row.approvedStatus === 'PendingForAdmin')||
    (user?.role === 'Super Admin' && params.row.approvedStatus === 'PendingForSuperAdmin')
  ) && (
    <IconButton sx={{ color: '#23CCEF' }} onClick={() => handleApproveClick(params.row, 'No')}>
      <UndoIcon />
    </IconButton>
  )
}
{
  (user?.role === 'Super Admin' && params.row.approvedStatus === 'Done' && params.row.paymentStatus==='Paid' && params.row.flagStatus===false)&&(
    <IconButton sx={{ color: '#23CCEF' }} onClick={()=>flagChange(params.row._id,true)}>
    <ForwardIcon />
  </IconButton>
  )
}
        </>
        ),
      },
  ];
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
  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-cell': {
      padding: theme.spacing(1),
    },
    '& .MuiDataGrid-row': {
      '&:nth-of-type(odd)': {
        backgroundColor: '#F7F9FB',
      },
      '&:nth-of-type(even)': {
        backgroundColor: 'white',
      },
    },
  }));
  return (
    <div style={gridStyle}>
      <Box sx={innerDivStyle}>
        <Typography style={{ paddingLeft: '20px', color: '#0d2136' }} className="title-2">
          APPROVED STATUS RECORD
        </Typography>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
        />
        <Modal open={billOpen} onClose={handleAddBillClose}>
          <AddBill open={billOpen} handleClose={handleAddBillClose} />
        </Modal>
        <Modal open={addPaymentOpen} onClose={handleAddPaymentClose}>
          <AddPayment open={addPaymentOpen} handleClose={handleAddPaymentClose} selectedBill={selectedBill} />
        </Modal>
      </Box>
    </div>
  );
};

export default ApprovedStatusRecord;
