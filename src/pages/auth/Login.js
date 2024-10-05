import React,{useEffect} from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/loginActions';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const Login = () => {
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const authError = useSelector((state) => state.auth.error);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
   
        document.body.classList.add('auth-body');
        return () => {
          document.body.classList.remove('auth-body');
        };
    
      }, [dispatch]);

    //   useEffect(() => {
    //     if (isAuthenticated) {
    //       navigate('/');
    //     }
    //   }, [isAuthenticated, navigate]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values,{resetForm,setSubmitting}) => {
            dispatch(login(values, navigate))
            // navigate('/')
            .then(()=>{
                resetForm();
            }).catch(()=>{
               setSubmitting(false);
            })
        },
    });

    return (
        <Container className="Auth-Container" maxWidth="xs">
            <Box
                sx={{
                    width: '80%',
                    margin: 'auto',
                    padding: '30px',
                    border: '1px solid #d3d3d3',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    bgcolor: 'background.paper'
                }}
                component='form'
                onSubmit={formik.handleSubmit}
            >
                <Typography className='Auth-Title' gutterBottom>
                    Login
                </Typography>
                <Box className="Auth-LIB" >
                <Typography  className='Auth-Label' variant="subtitle1" gutterBottom>
                        EMAIL ADDRESS
                    </Typography>
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Enter email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    margin="normal"
                    variant="outlined"
                    className="Auth-Input"
                    InputProps={{
                        sx: {
                            height: '42px', // Adjust the height as needed
                            
                        },
                    }}
                    InputLabelProps={{
                        sx: {
                            color: '#DDDDDD', // Change this to the desired color
                        },
                    }}
                />
                </Box>

                <Box className="Auth-LIB" >
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
                    className="Auth-Input"
                    InputProps={{
                        sx: {
                            height: '44px', // Adjust the height as needed
                        },
                    }}
                    InputLabelProps={{
                        sx: {
                            color: '#DDDDDD',
                        },

                    }}
                />
                </Box>
                
                {authError && (
                    <Typography variant="body2" color="error" align="center" paragraph>
                        {authError}
                    </Typography>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;

