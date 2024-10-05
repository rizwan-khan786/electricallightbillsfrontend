import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBills, addBill,  deleteBill, editBill, massBillApprovalsAction } from '../store/actions/billActions';
import { DataGrid } from '@mui/x-data-grid';
import { Typography, Box, Button, Modal,Checkbox} from '@mui/material';
import AddBill from '../components/modals/AddBill';
import AddPayment from '../components/modals/AddPayment';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './ConsumerBill.css';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import * as XLSX from 'xlsx';

const MassApprovalsBills = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  

  const { bills, loading, error } = useSelector((state) => state.bills);
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const [billOpen, setBillOpen] = useState(false);
  const [currentBill, setCurrentBill] = useState(null);
  const [addPaymentOpen, setAddPaymentOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});
  const [normalMeterCount, setNormalMeterCount] = useState(0);
  const [faultyMeterCount, setFaultyMeterCount] = useState(0);
  const [averageMeterCount, setAverageMeterCount] = useState(0);
  const [billPaid, setBillPaid] = useState(0);
  const [billUnPaid, setBillUnPaid] = useState(0);
  const [cBillAmount, setCBillAmount] = useState(0);
  const [tArrears, setArrears] = useState(0);
  const [nBillAmount, setNBillAmount] = useState(0);
  const [rBillAmount, setRBillAmount] = useState(0);
  const [paidBefore, setPaidBefore] = useState(0);
  const [paidAfter, setPaidAfter] = useState(0);
  
  const user = useSelector(state => state.auth.user);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch, data]);

  useEffect(() => {
    if (bills) {
      const initialSelectedValues = bills.reduce((acc, bill, index) => {
        acc[index + 1] = bill.forwardForGeneration ? 'Yes' : 'No';
        return acc;
      }, {});

      setSelectedValues(initialSelectedValues);
      const normalMeters = bills.filter(bill => bill.meterStatus === 'Normal').length;
      const faultyMeters = bills.filter(bill => bill.meterStatus === 'Faulty').length;
      const averageMeters = bills.filter(bill => bill.meterStatus === 'Average').length;
      const paid = bills.filter(bill => bill.paymentStatus === 'Paid').length;
      const unpaid = bills.filter(bill => bill.paymentStatus === 'UnPaid').length;

      setNormalMeterCount(normalMeters);
      setFaultyMeterCount(faultyMeters);
      setAverageMeterCount(averageMeters);
      setBillPaid(paid)
      setBillUnPaid(unpaid)
    }
  }, [bills]);

  useEffect(() => {
    setCBillAmount(bills?.currentBillAmount)
    setArrears(bills?.totalArrears)
    setNBillAmount(bills?.netBillAmount)
    setRBillAmount(bills?.roundedBillAmount)
    setPaidAfter(bills?.ifPaidBefore)
    setPaidBefore(bills?.ifPaidAfter)
  }, [])

  const getFilteredBills = () => {
    if (user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') {
      return bills;
    } else if (user?.role.startsWith('Junior Engineer')) {
      const specificWard = user?.ward;
      return bills.filter((bill) => bill.ward === specificWard);
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

  const handleAddBillOpen = () => {
    setBillOpen(true);
  };

  const handleAddBillClose = () => {
    setBillOpen(false);
  };

  const handleAddBill = (billData) => {
    dispatch(addBill(billData));
    handleAddBillClose();
  };

  const handleAddPaymentClose = () => {
    setAddPaymentOpen(false);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return; 
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      setData(json);
      console.log('Imported Data:', json);
      data.forEach((bill) => {
        dispatch(addBill(bill));
      });
    };
    reader.readAsArrayBuffer(file);
  };

  // const rows = bills?.map((bill, index) => ({

  const combinedData = [...filteredBills, ...data];
  const rows = combinedData.map((bill, index) => ({
    _id: bill._id,
    id: index + 1,
    userId: bill.userId,
    firstName: bill.firstName,
    lastName: bill.lastName,
    email: bill.email,
    username: bill.username || '-',
    contactNumber: bill.contactNumber,
    meterNumber: bill.meterNumber || '-',
    totalConsumption: bill.totalConsumption,
    meterStatus: bill.meterStatus,
    previousReadingDate: formatDate(bill.previousReadingDate),
    previousReading: bill.previousReading,
    currentReadingDate: formatDate(bill.currentReadingDate),
    currentReading: bill.currentReading,
    billDate: formatDate(bill.billDate),
    currentBillAmount: bill.currentBillAmount,
    totalArrears: bill.totalArrears,
    netBillAmount: bill.netBillAmount,
    roundedBillAmount: bill.roundedBillAmount,
    address: bill.address || '-',
    ward: bill?.ward,
    paymentStatus: bill.paymentStatus || '-',
    approvedStatus: bill.approvedStatus || 'Initial',
    paidAmount: bill.paidAmount ? bill.paidAmount : 0,
    pendingAmount: bill.paidAmount ? bill.roundedBillAmount - bill.paidAmount : bill.roundedBillAmount,
    ifPaidByThisDate: formatDate(bill.ifPaidByThisDate),
    earlyPaymentAmount: bill.earlyPaymentAmount,
    ifPaidBefore: bill.ifPaidBefore,
    dueDate: formatDate(bill.dueDate),
    ifPaidAfter: bill.ifPaidAfter,
    forwardForGeneration: bill.forwardForGeneration,
  }));

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(rows); // Select all rows
    } else {
      setSelectedItems([]); // Deselect all rows
    }
  };
  
  
  const handleCheckboxChange = (event, row) => {
    if (event.target.checked) {
      // Add to array if checked
      setSelectedItems((prev) => [...prev, row]);
    } else {
      // Remove from array if unchecked
      setSelectedItems((prev) => prev.filter((item) => item.id !== row.id));
    }
  };

  // Handle process button click
  const handleProcessClick = () => {
    // Here you can process the selectedItems array
    console.log('Selected Items:', selectedItems);
  };

  
  const columns = (handleDeleteBill) => [
    // {
    //   field: 'checkbox',
    //   headerName: '',
    //   width: 50,
    //   renderCell: (params) => (
    //     <Checkbox
    //       checked={selectedItems.some((item) => item.id === params.row.id)}
    //       onChange={(event) => handleCheckboxChange(event, params.row)}
    //     />
    //   ),
    // },
    {
      field: 'checkbox',
      headerName: '',
      width: 50,
      headerClassName: 'data-grid-checkbox-header',
      renderHeader: (params) => (
        <Checkbox
          checked={selectedItems.length === rows.length && rows.length > 0}
          indeterminate={selectedItems.length > 0 && selectedItems.length < rows.length}
          onChange={handleSelectAll}
        />
      ),
      renderCell: (params) => (
        <Checkbox
          checked={selectedItems.some((item) => item.id === params.row.id)}
          onChange={(event) => handleCheckboxChange(event, params.row)}
        />
      ),
    },
    
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userId', headerName: 'CONSUMER NO.', width: 130 },
    { field: 'email', headerName: 'EMAIL', width: 130 },
    { field: 'contactNumber', headerName: 'CONTACT NUMBER', width: 130 },
    { field: 'address', headerName: 'ADDRESS', width: 130 },
    { field: 'ward', headerName: 'WARD', width: 130 },
    { field: 'meterNumber', headerName: 'METER NUMBER', width: 130 },
    { field: 'totalConsumption', headerName: 'TOTAL CONSUMPTION', width: 130 },
    { field: 'meterStatus', headerName: 'METER STATUS', width: 130 },
    { field: 'previousReadingDate', headerName: 'PREVIOUS READING DATE', width: 130 },
    { field: 'previousReading', headerName: 'PREVIOUS READING', width: 130 },
    { field: 'currentReadingDate', headerName: 'CURRENT READING DATE', width: 130 },
    { field: 'currentReading', headerName: 'CURRENT READING', width: 130 },
    { field: 'billDate', headerName: 'BILL DATE', width: 130 },
    { field: 'currentBillAmount', headerName: 'CURRENT BILL AMOUNT', width: 130 },
    { field: 'totalArrears', headerName: 'TOTAL ARREARS', width: 130 },
    { field: 'netBillAmount', headerName: 'NET BILL AMOUNT', width: 130 },
    { field: 'roundedBillAmount', headerName: 'ROUNDED BILL AMOUNT', width: 130 },
    { field: 'ifPaidByThisDate', headerName: 'IF PAID BY THIS DATE', width: 130 },
    { field: 'earlyPaymentAmount', headerName: 'EARLY PAYMENT AMOUNT', width: 130 },
    { field: 'ifPaidBefore', headerName: 'IF PAID BEFORE', width: 130 },
    { field: 'dueDate', headerName: 'DUE DATE', width: 130 },
    { field: 'ifPaidAfter', headerName: 'IF PAID AFTER', width: 130 },
    { field: 'paymentStatus', headerName: 'PAYMENT STATUS', width: 130 },
    { field: 'paidAmount', headerName: 'PAID AMOUNT', width: 130 },
    { field: 'pendingAmount', headerName: 'PENDING AMOUNT', width: 130 },
    { field: 'approvedStatus', headerName: 'APPROVED STATUS', width: 170 },
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

  const handleDeleteBill = (billId) => {
    dispatch(deleteBill(billId));
  };

  const handleEditBill = (bill) => {
    setCurrentBill(bill);
    setBillOpen(true);
  };


  return (
    <div style={gridStyle}>
      <div>

      </div>
      <Box sx={innerDivStyle}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography style={{ paddingLeft: '20px', color: '#0d2136' }} className="title-2">
            MASS APPROVALS BILLS          </Typography>
          <Box sx={{ display: 'flex', width: '430px', justifyContent: 'space-between' }}>

            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="fileInput"
            />
            <Button
              sx={{
                color: '#23CCEF',
                border: '0.1px solid #23CCEF',
                cursor: 'pointer',
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'space-between',
                width: '80px',
              }}
        
              onClick={handleProcessClick}
              disabled={selectedItems.length === 0}
            >
              <Typography>Process</Typography>  
            </Button>
          </Box>

        </Box>
        <StyledDataGrid rows={rows}
          columns={columns(handleDeleteBill, handleEditBill)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 15]}
         

          sx={{ paddingRight: 0.5, paddingLeft: 0.5 }}
        />
        <Modal open={billOpen} onClose={handleAddBillClose}>
          <AddBill open={billOpen} handleClose={handleAddBillClose} handleAddBill={handleAddBill}
            currentBill={currentBill}
            editBill={(billId, billData) => {
              dispatch(editBill(billId, billData));
              dispatch(fetchBills());
            }}
          />
        </Modal>
        <Modal open={addPaymentOpen} onClose={handleAddPaymentClose}>
          <AddPayment open={addPaymentOpen} handleClose={handleAddPaymentClose} selectedBill={selectedBill} />
        </Modal>
      </Box>
    </div>
  );
};
export default MassApprovalsBills;

