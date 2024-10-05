import React from 'react';
import { Modal, Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import wardData from '../../data/warddata';
import './AddBill.css';
import paymentdata from '../../data/paymnetdata';
import meterstatus from '../../data/meterstatus';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    username: Yup.string().required('User Name is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    // password: Yup.string().required('Password is required'),
    password:Yup.string().notRequired(),

    // contactNumber: Yup.string().required('Contact Number is required'),
    contactNumber: Yup.string()
  .required('Contact Number is required')
  .test('len', 'Contact Number must be 10 digits', val => val && val.length === 10)
  .matches(/^\d+$/, 'Contact Number must be a 10-digit number'),
    address: Yup.string().required('Address is required'),
    // role: Yup.string().required('Role is required'),
    // ward: Yup.string().required('Ward is required'),
    totalConsumption: Yup.number().required('Total Consumption is required').min(0, 'Total Consumption must be positive'),
    meterStatus: Yup.string().required('Meter Status is required'),
    currentReading: Yup.number().required('Current Reading is required').min(0, 'Current Reading must be positive'),
    previousReading: Yup.number().required('Previous Reading is required').min(0, 'Previous Reading must be positive'),
    currentBillAmount: Yup.number().required('Current Bill Amount is required').min(0, 'Current Bill Amount must be positive'),
    totalArrears: Yup.number().required('Total Arrears is required'),
    netBillAmount: Yup.number().required('Net Bill Amount is required').min(0, 'Net Bill Amount must be positive'),
    roundedBillAmount: Yup.number().required('Rounded Bill Amount is required').min(0, 'Rounded Bill Amount must be positive'),
    ifPaidThisDate: Yup.date().required('If Paid This Date is required').typeError('Invalid date format'),
    earlyPaymentAmount: Yup.number().required('Early Payment Amount is required').min(0, 'Early Payment Amount must be positive'),

    ifPaidBefore: Yup.string().required('If Paid Before is required'),
    dueDate: Yup.date().required('Due Date is required').typeError('Invalid date format'),
    ifPaidAfter: Yup.string().required('If Paid After is required'),
    forwardForGeneration: Yup.boolean().required('Forward for Generation is required'),
});

const AddBill = ({ open, handleClose, handleAddBill,currentBill=[],editBill }) => {
    const user = useSelector(state => state.auth.user);
    console.log("user role in Add bill test",user?.role)
// console.log("currentBill",currentBill?.dueDate,"currentBill",currentBill?.overdueDate)
    const formik = useFormik({
        initialValues: {
            firstName: currentBill ? currentBill.firstName : '',
            lastName: currentBill ? currentBill.lastName : '',
            username: currentBill ? currentBill.username : '',
            email: currentBill ? currentBill.email : '',
            password: currentBill ? currentBill.password : '',
            contactNumber: currentBill ? currentBill.contactNumber : '',
            address: currentBill ? currentBill.address : '',
            role: currentBill ? currentBill.role : '',
            ward: currentBill ? currentBill.ward : '',
            meterNumber: currentBill ? currentBill.meterNumber : '',
            totalConsumption: currentBill ? currentBill.totalConsumption : '',
            meterStatus: currentBill ? currentBill.meterStatus : '',
            currentReading: currentBill ? currentBill.currentReading : '',
            previousReading: currentBill ? currentBill.previousReading : '',
            currentBillAmount: currentBill ? currentBill.currentBillAmount : '',
            totalArrears: currentBill ? currentBill.totalArrears : '',
            netBillAmount: currentBill ? currentBill.netBillAmount : '',
            roundedBillAmount: currentBill ? currentBill.roundedBillAmount : '',
            ifPaidThisDate:currentBill?.ifPaidThisDate ? moment(currentBill?.ifPaidThisDate, "MMMM DD, YYYY").format("YYYY-MM-DD"):new Date().toISOString().split('T')[0],
            earlyPaymentAmount: currentBill ? currentBill.earlyPaymentAmount : '',

            ifPaidBefore: currentBill ? currentBill.ifPaidBefore : '',
            dueDate:currentBill?.dueDate ? moment(currentBill?.dueDate, "MMMM DD, YYYY").format("YYYY-MM-DD"):new Date().toISOString().split('T')[0],
            ifPaidAfter: currentBill ? currentBill.ifPaidAfter: '',
            // overdueDate:currentBill?.overdueDate ? moment(currentBill?.overdueDate, "MMMM DD, YYYY").format("YYYY-MM-DD"):new Date().toISOString().split('T')[0],

            // overdueDate:currentBill.overdueDate ? currentBill.overdueDate:new Date().toISOString().split('T')[0],
            paymentStatus: currentBill ? currentBill.paymentStatus: '',
            paidAmount: currentBill ? currentBill.paidAmount : '',
            pendingAmount: currentBill ? currentBill.pendingAmount : '',
            forwardForGeneration: false,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleAddBill(values);
            handleClose();
        },


        onSubmit: (values) => {
            if (currentBill && !values.password) {
              values.password = currentBill.password;
            }
            if (currentBill) {
              editBill(currentBill._id, values);
            } else {
                handleAddBill(values);
           
            }
            handleClose();
          },

    });

  
    
    const getFilteredWards = () => {
        if (user?.role === 'Super Admin' || user?.role === 'Admin' || user?.role === 'Executive Engineer') {
            return wardData;
        } else if (user?.role && user?.role.startsWith("Junior Engineer")) {
            // const specificWard = extractWardFromRole(user?.role);
            return wardData.filter(ward => ward.ward === user?.ward);
        }
        return [];
    };
    
    // Helper function to extract the specific ward
    function extractWardFromRole(role) {
        let match = role.match(/Ward\s*-\s*\w/);
        if (match) {
            let cleanedPart = match[0].replace(/\s*-\s*/g, '-');
            return cleanedPart;
        }
        return 'Unknown Ward'; // or some other default value
    }
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    maxHeight: '90%',
                    overflow: 'auto',
                    borderRadius: '10px',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#23CCEF',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#1EA2C1',
                    },
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        padding: '30px',
                        paddingTop: '10px',
                        margin: 'auto'
                    }}
                    component='form'
                    onSubmit={formik.handleSubmit}
                >
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        FIRST NAME
                    </Typography>
                    <TextField
                        fullWidth
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        LAST NAME
                    </Typography>
                    <TextField
                        fullWidth
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        USER NAME
                    </Typography>
                    <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        EMAIL
                    </Typography>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        PASSWORD
                    </Typography>
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        CONTACT NUMBER
                    </Typography>
                    <TextField
                        fullWidth
                        id="contactNumber"
                        name="contactNumber"
                        label="Contact Number"
                        value={formik.values.contactNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                        helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        ADDRESS
                    </Typography>
                    <TextField
                        fullWidth
                        id="address"
                        name="address"
                        label="Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />

                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        WARD
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-B-Input'>
                        <InputLabel id="ward-label">Ward</InputLabel>
                        <Select
                            labelId="ward-label"
                            id="ward"
                            name="ward"
                            value={formik.values.ward}
                            onChange={formik.handleChange}
                            label="Ward"
                        >
                            {/* {wardData.map((ward, index) => (
                                <MenuItem key={index} value={ward.ward}>{ward.ward}</MenuItem>
                            ))} */}

                             {getFilteredWards().map((ward, index) => (
                            
                <MenuItem key={index} value={ward.ward}>{ward.ward}</MenuItem>
            ))}
                        </Select>
                    </FormControl>

                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        METER NUMBER
                    </Typography>
                    <TextField
                        fullWidth
                        id="meterNumber"
                        name="meterNumber"
                        label="Meter Number"
                        value={formik.values.meterNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.meterNumber && Boolean(formik.errors.meterNumber)}
                        helperText={formik.touched.meterNumber && formik.errors.meterNumber}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        TOTAL CONSUMPTION
                    </Typography>
                    <TextField
                        fullWidth
                        id="totalConsumption"
                        name="totalConsumption"
                        label="Total Consumption"
                        value={formik.values.totalConsumption}
                        onChange={formik.handleChange}
                        error={formik.touched.totalConsumption && Boolean(formik.errors.totalConsumption)}
                        helperText={formik.touched.totalConsumption && formik.errors.totalConsumption}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />

<Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        METER STATUS
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-B-Input'>
                        <InputLabel id="ward-label">Meter Status</InputLabel>
                        <Select
                            labelId="meterStatus-label"
                            id="meterStatus"
                            name="meterStatus"
                            value={formik.values.meterStatus}
                            onChange={formik.handleChange}
                            label="Ward"
                        >
                            {meterstatus.map((meterStatus, index) => (
                                <MenuItem key={index} value={meterStatus.status}>{meterStatus.status}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                    CURRENT READING DATE
                    </Typography>
                    <TextField
                        fullWidth
                        id="currentReadingDate"
                        name="currentReadingDate"
                        label="Current Reading Date"
                        type="date"
                        value={formik.values.currentReadingDate}
                        onChange={formik.handleChange}
                        error={formik.touched.currentReadingDate && Boolean(formik.errors.currentReadingDate)}
                        helperText={formik.touched.currentReadingDate && formik.errors.currentReadingDate}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />



                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        CURRENT READING
                    </Typography>
                    <TextField
                        fullWidth
                        id="currentReading"
                        name="currentReading"
                        label="Current Reading"
                        value={formik.values.currentReading}
                        onChange={formik.handleChange}
                        error={formik.touched.currentReading && Boolean(formik.errors.currentReading)}
                        helperText={formik.touched.currentReading && formik.errors.currentReading}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />

<Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                     PREVIOUS READING DATE
                    </Typography>
                    <TextField
                        fullWidth
                        id="previousReadingDate"
                        name="previousReadingDate"
                        label="Previous Reading Date"
                        type="date"
                        value={formik.values.previousReadingDate}
                        onChange={formik.handleChange}
                        error={formik.touched.previousReadingDate && Boolean(formik.errors.previousReadingDate)}
                        helperText={formik.touched.previousReadingDate && formik.errors.previousReadingDate}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />


                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        PREVIOUS READING
                    </Typography>
                    <TextField
                        fullWidth
                        id="previousReading"
                        name="previousReading"
                        label="Previous Reading"
                        value={formik.values.previousReading}
                        onChange={formik.handleChange}
                        error={formik.touched.previousReading && Boolean(formik.errors.previousReading)}
                        helperText={formik.touched.previousReading && formik.errors.previousReading}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />

<Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        BILL DATE
                    </Typography>
                    <TextField
                        fullWidth
                        id="billDate"
                        name="billDate"
                        label="Bill Date"
                        type="date"
                        value={formik.values.billDate}
                        onChange={formik.handleChange}
                        error={formik.touched.billDate && Boolean(formik.errors.billDate)}
                        helperText={formik.touched.billDate && formik.errors.billDate}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        CURRENT BILL AMOUNT
                    </Typography>
                    <TextField
                        fullWidth
                        id="currentBillAmount"
                        name="currentBillAmount"
                        label="Current Bill Amount"
                        value={formik.values.currentBillAmount}
                        onChange={formik.handleChange}
                        error={formik.touched.currentBillAmount && Boolean(formik.errors.currentBillAmount)}
                        helperText={formik.touched.currentBillAmount && formik.errors.currentBillAmount}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        TOTAL ARREARS
                    </Typography>
                    <TextField
                        fullWidth
                        id="totalArrears"
                        name="totalArrears"
                        label="Total Arrears"
                        value={formik.values.totalArrears}
                        onChange={formik.handleChange}
                        error={formik.touched.totalArrears && Boolean(formik.errors.totalArrears)}
                        helperText={formik.touched.totalArrears && formik.errors.totalArrears}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        NET BILL AMOUNT
                    </Typography>
                    <TextField
                        fullWidth
                        id="netBillAmount"
                        name="netBillAmount"
                        label="Net Bill Amount"
                        value={formik.values.netBillAmount}
                        onChange={formik.handleChange}
                        error={formik.touched.netBillAmount && Boolean(formik.errors.netBillAmount)}
                        helperText={formik.touched.netBillAmount && formik.errors.netBillAmount}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        ROUNDED BILL AMOUNT
                    </Typography>
                    <TextField
                        fullWidth
                        id="roundedBillAmount"
                        name="roundedBillAmount"
                        label="Rounded Bill Amount"
                        value={formik.values.roundedBillAmount}
                        onChange={formik.handleChange}
                        error={formik.touched.roundedBillAmount && Boolean(formik.errors.roundedBillAmount)}
                        helperText={formik.touched.roundedBillAmount && formik.errors.roundedBillAmount}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        IF PAID BY THIS DATE
                    </Typography>
                    <TextField
                        fullWidth
                        id="ifPaidByThisDate"
                        name="ifPaidByThisDate"
                        label="If Paid By This Date"
                        type="date"
                        value={formik.values.ifPaidByThisDate}
                        onChange={formik.handleChange}
                        error={formik.touched.ifPaidByThisDate && Boolean(formik.errors.ifPaidByThisDate)}
                        helperText={formik.touched.ifPaidByThisDate && formik.errors.ifPaidByThisDate}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />

<Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        EARLY PAYMENT AMOUNT
                    </Typography>
                    <TextField
                        fullWidth
                        id="earlyPaymentAmount"
                        name="earlyPaymentAmount"
                        label="Early Payment Amount"
                        value={formik.values.earlyPaymentAmount}
                        onChange={formik.handleChange}
                        error={formik.touched.earlyPaymentAmount && Boolean(formik.errors.earlyPaymentAmount)}
                        helperText={formik.touched.earlyPaymentAmount && formik.errors.earlyPaymentAmount}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />

                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                    IF PAID BEFORE
                    </Typography>
                    <TextField
                        fullWidth
                        id="ifPaidBefore"
                        name="ifPaidBefore"
                        label="If Paid Before"
                        value={formik.values.ifPaidBefore}
                        onChange={formik.handleChange}
                        error={formik.touched.ifPaidBefore && Boolean(formik.errors.ifPaidBefore)}
                        helperText={formik.touched.ifPaidBefore && formik.errors.ifPaidBefore}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        DUE DATE
                    </Typography>
                    <TextField
                        fullWidth
                        id="dueDate"
                        name="dueDate"
                        label="Due Date"
                        type="date"
                        value={formik.values.dueDate}
                        onChange={formik.handleChange}
                        error={formik.touched.dueDate && Boolean(formik.errors.dueDate)}
                        helperText={formik.touched.dueDate && formik.errors.dueDate}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                    IF PAID AFTER
                    </Typography>
                    <TextField
                        fullWidth
                        id="ifPaidAfter"
                        name="ifPaidAfter"
                        label="If Paid After"
                        value={formik.values.ifPaidAfter}
                        onChange={formik.handleChange}
                        error={formik.touched.ifPaidAfter && Boolean(formik.errors.ifPaidAfter)}
                        helperText={formik.touched.ifPaidAfter && formik.errors.ifPaidAfter}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />
  {/* <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        OVERDUE DATE
                    </Typography>
                    <TextField
                        fullWidth
                        id="overdueDate"
                        name="overdueDate"
                        label="Overdue Date"
                        type="date"
                        value={formik.values.overdueDate}
                        onChange={formik.handleChange}
                        error={formik.touched.overdueDate && Boolean(formik.errors.overdueDate)}
                        helperText={formik.touched.overdueDate && formik.errors.overdueDate}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    /> */}

          <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        PAYMENT STATUS
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-B-Input'>
                        <InputLabel id="ward-label">Payment Status</InputLabel>
                        <Select
                            labelId="paymentStatus-label"
                            id="paymentStatus"
                            name="paymentStatus"
                            // value={formik.values.paymentStatus}
                            value={formik.values.paidAmount === formik.values.roundedBillAmount ? 'Paid' : formik.values.paymentStatus}

                            onChange={formik.handleChange}
                            label="Ward"
                        >
                            {paymentdata.map((paymentstatus, index) => (
                                <MenuItem key={index} value={paymentstatus.status}>{paymentstatus.status}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>


                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        PAID AMOUNT
                    </Typography>
                    <TextField
                        fullWidth
                        id="paidAmount"
                        name="paidAmount"
                        label="Paid Amount"
                        
                        // value={formik.values.paymentStatus==="Paid"?formik.values.paidAmount=formik.values.netBillAmount:formik.values.paidAmount}
                        // value={formik.values.paymentStatus==="Paid"?formik.values.paidAmount=formik.values.roundedBillAmount:formik.values.paidAmount}
                        // value={
                        //     formik.values.paymentStatus === "Paid" 
                        //       ? formik.values.paidAmount = formik.values.roundedBillAmount 
                        //       : formik.values.paymentStatus === "UnPaid" 
                        //         ? formik.values.paidAmount = 0
                        //         : formik.values.paidAmount 
                        //   }

                        value={
                            formik.values.paymentStatus === "Paid" 
                              ? formik.values.paidAmount = formik.values.roundedBillAmount 
                              : formik.values.paymentStatus === "UnPaid" 
                                ? formik.values.paidAmount = 0
                                : formik.values.paymentStatus === "Partial" 
                                  ? Math.max(formik.values.paidAmount, formik.values.paidAmount>0) 
                                  : formik.values.paymentStatus === "Pending" 
                                    ? Math.min(formik.values.paidAmount, formik.values.roundedBillAmount - 1) 
                                    : formik.values.paidAmount 
                          }
                        disabled={formik.values.paymentStatus==="Paid" || formik.values.paymentStatus==="UnPaid"}
                        onChange={formik.handleChange}
                        error={formik.touched.paidAmount && Boolean(formik.errors.paidAmount)}
                        helperText={formik.touched.paidAmount && formik.errors.paidAmount}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />

<Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        PENDING AMOUNT
                    </Typography>
                    <TextField
                        fullWidth
                        id="pendingAmount"
                        name="pendingAmount"
                        label="Pending Amount"
                        // value={formik.values.pendingAmount}
                        // value={formik.values.pendingAmount=formik.values.roundedBillAmount-formik.values.paidAmount}
                        value={
                            formik.values.paymentStatus === 'UnPaid' ? formik.values.roundedBillAmount :
                            formik.values.paymentStatus === 'Paid' ? 0 :
                            formik.values.paymentStatus === 'Partial' ? formik.values.roundedBillAmount - formik.values.paidAmount :
                            formik.values.paidAmount ? formik.values.roundedBillAmount - formik.values.paidAmount : formik.values.pendingAmount
                          }
                        onChange={formik.handleChange}
                        error={formik.touched.pendingAmount && Boolean(formik.errors.pendingAmount)}
                        helperText={formik.touched.pendingAmount && formik.errors.pendingAmount}
                        margin="normal"
                        variant="outlined"
                        className='A-B-Input'
                    />

                    <Typography className='Auth-Label' variant="subtitle1" gutterBottom>
                        FORWARD FOR GENERATION
                    </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-B-Input'>
                        <Select
                            id="forwardForGeneration"
                            name="forwardForGeneration"
                            value={formik.values.forwardForGeneration}
                            onChange={formik.handleChange}
                            label="Forward for Generation"
                            error={formik.touched.forwardForGeneration && Boolean(formik.errors.forwardForGeneration)}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                        {formik.touched.forwardForGeneration && formik.errors.forwardForGeneration && (
                            <Typography color="error" variant="caption">{formik.errors.forwardForGeneration}</Typography>
                        )}
                    </FormControl>

                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            type="button"
                            onClick={handleClose}
                            variant="contained"
                            sx={{
                                mr: 2,
                                backgroundColor: '#23CCEF',
                                width: '100px',
                                '&:hover': {
                                    backgroundColor: '#23CCEF',
                                    opacity: '0.8',
                                },
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: '#FB404B',
                                '&:hover': {
                                    backgroundColor: '#FB404B',
                                    opacity: '0.8',
                                },
                            }}
                        >
                            {currentBill ? 'Update Bill' : 'Add Bill'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddBill;
