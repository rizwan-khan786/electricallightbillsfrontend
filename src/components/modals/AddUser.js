import React from 'react';
import { Modal, Box, Typography, TextField, Button,MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import rolesdata from '../../data/rolesdata';
import rolesupervisors from '../../data/rolesupervisors';
import wardData from '../../data/warddata';
import './AddUser.css';
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    
    // password: Yup.string().required('Password is required'),
    password: Yup.string().notRequired(),
    contactNumber: Yup.string().required('Contact Number is required')
    .matches(/^\d{10}$/, 'Contact Number must be exactly 10 digits'),
    address: Yup.string().required('Address is required'),
    // role: Yup.string().required('Role is required'),
    ward: Yup.string().required('Ward is required'),
  });

  const rolesToDisplayField = [
    'Additional Commissioner',
    'Deputy Commissioner',
    'Admin',
    'Junior Engineer',
    'Executive Engineer',
    'Super Admin',
  ];
const AddUser = ({ open, handleClose, handleAddUser,currentUser,editUser }) => {
    const formik = useFormik({
        initialValues: {
          firstName: currentUser ? currentUser.firstName : '',
          lastName: currentUser ? currentUser.lastName : '',
          username: currentUser ? currentUser.username : '',
          email: currentUser ? currentUser.email : '',
          password: currentUser ? currentUser.password : '',
          contactNumber: currentUser ? currentUser.contactNumber : '',
          address: currentUser ? currentUser.address : '',
          role: currentUser ? currentUser.role : 'User',
        //   role: currentUser ? currentUser.role : '',
        //   roleSupervisor: currentUser ? currentUser.roleSupervisor : '',
        roleSupervisor: currentUser ? currentUser.roleSupervisor : 'Junior Engineer',
          ward: currentUser ? currentUser.ward : '',
        },
        validationSchema: validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        enableReinitialize: true,
        onSubmit: (values) => {
          if (currentUser && !values.password) {
            values.password = currentUser.password;
          }
          if (currentUser) {
            editUser(currentUser._id, values);
          } else {
            handleAddUser(values);
          }
          handleClose();
        },
      });
      
    const shouldDisplayRoleField = rolesToDisplayField.includes(formik.values.role);

    return (
        <Modal open={open} onClose={handleClose}>   
            <Box
                sx={{
                    // mt:5,
                    mb:5,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius:'5px',
                    p: 4,
                    maxHeight: '90%',
                    overflow: 'auto',
                    paddingTop:'20px',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '5px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#23CCEF', 
                        borderRadius: '5px',
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
                        margin: 'auto',
                       
                    }}
                    component='form'
                    onSubmit={formik.handleSubmit}
                >
                    <Box>

                    </Box>
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
                        className='A-U-Input'
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
                        className='A-U-Input'
                    />
                     <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
                        USER NAME
                    </Typography>
                     <TextField
                        fullWidth
                        id="username"
                        name="username"
                        label="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                        margin="normal"
                        variant="outlined"
                        className='A-U-Input'
                    />
                     <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
                        EMAIL
                    </Typography>
                   <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        margin="normal"
                        variant="outlined"
                        className='A-U-Input'
                    />
                     <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
                  PASSWORD
                 </Typography>
                        <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        margin="normal"
                        variant="outlined"
                        className='A-U-Input'
                    />
 {shouldDisplayRoleField && (
    <>
    <Typography className='A-R-Label' variant="subtitle1" gutterBottom>
                        ROLE NAME
                    </Typography>
                    
                    <TextField
                        fullWidth
                        id="role"
                        name="role"
                        label="Role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        error={formik.touched.role && Boolean(formik.errors.role)}
                        helperText={formik.touched.role && formik.errors.role}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{
                            sx: {
                                color: '#DDDDDD',
                            },
                        }}

                        disabled
                    />
    </>
 )}
{!shouldDisplayRoleField && (
    <>
     <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
                 ROLE 
                </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input'>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        label="Role"
                        error={formik.touched.role && Boolean(formik.errors.role)}
                    >
                        {rolesdata.map((role, index) => (
                                <MenuItem key={role.id} value={role.rolename}>{role.rolename}</MenuItem>
                            ))}

                    </Select>
                    {formik.touched.role && formik.errors.role && (
                        <Typography color="error" variant="caption">{formik.errors.role}</Typography>
                    )}
                </FormControl>
    </>
)}

               

                <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
                 ROLE SUPERVISOR
                 </Typography>
                    <FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input'>
                    <InputLabel id="role-label">Role Supervisor</InputLabel>
                    {/* {formik.values.roleSupervisor==='Executive Engineer'||formik.values.roleSupervisor==='Admin'||formik.values.roleSupervisor==='Super Admin'} */}
                    <Select
                        labelId="roleSupervisor-label"
                        id="roleSupervisor"
                        name="roleSupervisor"
                        value={formik.values.roleSupervisor}
                        onChange={formik.handleChange}
                        label="Role Supervisor"
                        disabled={formik.values.roleSupervisor==='Executive Engineer'||formik.values.roleSupervisor==='Admin'||formik.values.roleSupervisor==='Super Admin'||formik.values.roleSupervisor==='None'}
                        error={formik.touched.roleSupervisor && Boolean(formik.errors.roleSupervisor)}
                    >
                        {rolesupervisors.map((role, index) => (
                                <MenuItem key={role.id} value={role.roleSupervisor}>{role.roleSupervisor}</MenuItem>
                            ))}

                    </Select>
                    {formik.touched.roleSupervisor && formik.errors.roleSupervisor && (
                        <Typography color="error" variant="caption">{formik.errors.roleSupervisor}</Typography>
                    )}
                </FormControl>
                <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
                 CONTACT NUMBER
                 </Typography>
                        <TextField
                        fullWidth
                        id="contactNumber"
                        name="contactNumber"
                        label="contactNumber"
                        value={formik.values.contactNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                        helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                        margin="normal"
                        variant="outlined"
                        className='A-U-Input'
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
                        className='A-U-Input'
    maxRows={10} 
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
    }}
                    />
                      <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
                 WARD
                 </Typography>

<FormControl fullWidth margin="normal" variant="outlined" className='A-U-Input'>
    <InputLabel id="ward-label">Ward</InputLabel>
    <Select
        labelId="ward-label"
        id="ward"
        name="ward"
        value={formik.values.ward}
        onChange={formik.handleChange}
        label="Ward"
        disabled={formik.values.ward==='All'}
        error={formik.touched.ward && Boolean(formik.errors.ward)}
    >
        {wardData.map((ward, index) => (
            <MenuItem key={ward.wardid} value={ward.ward}>{ward.ward}</MenuItem>
        ))}
    </Select>
    {formik.touched.ward && formik.errors.ward && (
  <Typography color="error" variant="caption">{formik.errors.ward}</Typography>
)}
</FormControl>
                   
                     <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center'}}>
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
                                   opacity:'0.8' 
                                }
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
                                    opacity:'0.8'
                                }
                            }}
                        >
                            {currentUser ? 'Update User' : 'Add User'}
                        </Button>
                   
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
};

export default AddUser;
