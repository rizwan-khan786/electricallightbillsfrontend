import React,{useEffect} from 'react';
import { Box, Typography, TextField, Button, MenuItem, Select, InputLabel, FormControl, Container } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import wardData from '../../data/warddata';
import { addUser } from '../../store/actions/userActions';
// import './Register.css';
const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    username: Yup.string().required('User Name is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
    contactNumber: Yup.string().required('Contact Number is required'),
    address: Yup.string().required('Address is required'),

    // role: Yup.string().required('Role is required'),
    // ward: Yup.string().required('Ward is required'), // Add validation for ward
});
const Register = () => {
    const dispatch = useDispatch();
    useEffect(() => {
   
        document.body.classList.add('auth-body');
        return () => {
          document.body.classList.remove('auth-body');
        };
    
      }, [dispatch]);
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName:'',
            username:'',
            email:'',
            password:'',
            contactNumber:'',
            address:'',
            role:'',
            ward:''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
                dispatch(addUser(values));
                // handleAddUserClose();
              }
    });
    return (
        <Container maxWidth="sm" sx={{mt:2}}>
            <Box
                sx={{
                    width: '80%',
                    margin: 'auto',
                    padding: '30px',
                    border: '1px solid #d3d3d3',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    bgcolor: 'background.paper',
                    
                }}
                component='form'
                    onSubmit={formik.handleSubmit}
            >
                <Typography className='Auth-Title' align="center" gutterBottom>
                    Register
                </Typography>
                <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
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
                    className='Auth-Input'
                    sx={{marginBottom:'14px'}}
                    InputLabelProps={{
                        sx: {
                            color: '#DDDDDD', // Change this to the desired color
                        },
                    }}
                />
                 <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
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
                    className='Auth-Input'
                    sx={{marginBottom:'14px'}}
                    InputLabelProps={{
                        sx: {
                            color: '#DDDDDD', // Change this to the desired color
                        },
                    }}
                />
                 <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
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
                    className='Auth-Input'
                    sx={{marginBottom:'14px'}}
                    InputLabelProps={{
                        sx: {
                            color: '#DDDDDD', // Change this to the desired color
                        },
                    }}
                />
                 <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
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
                    className='Auth-Input'
                    sx={{marginBottom:'14px'}}
                    InputLabelProps={{
                        sx: {
                            color: '#DDDDDD', // Change this to the desired color
                        },
                    }}
                />
                <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
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
                    className='Auth-Input'
                    sx={{marginBottom:'14px'}}
                    InputLabelProps={{
                        sx: {
                            color: '#DDDDDD', // Change this to the desired color
                        },
                    }}
                />
                <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
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
                    className='Auth-Input'
                    sx={{marginBottom:'14px'}}
                    InputLabelProps={{
                        sx: {
                            color: '#DDDDDD', // Change this to the desired color
                        },
                    }}
                />
                <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
                 ADDRESS
                 </Typography>
                 <TextField
                        fullWidth
                        id="address"
                        name="address"
                        label="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                        margin="normal"
                        variant="outlined"
                        multiline
                        minRows={1}
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD', // Change this to the desired color
                            },
                        }}
    maxRows={10} 
    className='Auth-Input'
    sx={{
        '& .MuiOutlinedInput-root': {
            '& textarea': {
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '10px', 
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555', 
                },
            },
        },
        marginBottom:'14px'
    }}
                    />
                {/* <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
                 ROLE
                 </Typography>
                <FormControl fullWidth margin="normal" variant="outlined" className='Auth-Input' sx={{marginBottom:'14px'}}>
                    <InputLabel id="role-label" sx={{color:"#DDDDDD"}}>Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        label="Role"
                        error={formik.touched.role && Boolean(formik.errors.role)}
                    >
                        <MenuItem value="Super Admin">Super Admin</MenuItem>
                        <MenuItem value="Additional Commissioner">Additional Commissioner</MenuItem>
                        <MenuItem value="Deputy Commissioner">Deputy Commissioner</MenuItem>
                        <MenuItem value="Executive Engineer">Executive Engineer</MenuItem>
                        <MenuItem value="Junior Engineer">Junior Engineer</MenuItem>
                        <MenuItem value="Consumer">Consumer</MenuItem>
                    </Select>
                    {formik.touched.role && formik.errors.role && (
                        <Typography color="error" variant="caption">{formik.errors.role}</Typography>
                    )}
                </FormControl> */}

                <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
                 WARD
                 </Typography>
                <FormControl fullWidth margin="normal" variant="outlined" className='Auth-Input'>
                        <InputLabel id="ward-label" sx={{color:"#DDDDDD"}}>Ward</InputLabel>
                        <Select
                            labelId="ward-label"
                            id="ward"
                            name="ward"
                            value={formik.values.ward}
                            onChange={formik.handleChange}
                            label="Ward"
                            error={formik.touched.ward && Boolean(formik.errors.ward)}
                        >
                            {wardData.map((ward, index) => (
                                <MenuItem key={index} value={ward.ward}>{ward.ward}</MenuItem>
                            ))}
                        </Select>
                        {/* {formik.touched.ward && formik.errors.ward && (
                            <Typography color="error" variant="caption">{formik.errors.ward}</Typography>
                        )} */}
                    </FormControl>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className='Auth-Button'
                        sx={{
                           
                            '&:hover': {
                                bgcolor: '#81c784',
                            }
                        }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};
export default Register;
