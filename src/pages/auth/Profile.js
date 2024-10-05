
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Typography,
  Button,
  Grid,
  Stack,
  Divider,
  Avatar,
  Box,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import { editUser } from '../../store/actions/userActions';
import PersonIcon from '@mui/icons-material/Person';
const Profile = () => {
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);
  const user = useSelector((state) => state.auth.user);
  console.log("user testing",user)
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [address, setAddress] = useState('');
  const [ward, setWard] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setUsername(user.username || '');
      setEmail(user.email || '');
      setRole(user.role || '');
      setAddress(user.address || '');
      setWard(user.ward || '');
      setCity(user.city || '');
      setCountry(user.country || '');
      setPostalCode(user.postalCode || '');
      setDescription(user.description || '');
    }
  }, [user]);

  const handleChange = (setter) => (event) => setter(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedUserData = {
      firstName,
      lastName,
      username,
      email,
      address,
      ward,
      city,
      country,
      postalCode,
      description,
    };
    dispatch(editUser(user._id, updatedUserData));
  };

  const gridStyle = {
    height: 'auto',
    width: isSidebarOpen ? '80%' : '90%',
    marginLeft: isSidebarOpen ? '19%' : '7%',
    transition: 'margin-left 0.3s',
    display: 'flex',
    gridTemplateColumns: '1fr 1fr', // Create two columns
    gridGap: '20px', // Add spacing between the columns
    flexDirection: 'row',
    justifyContent:'center',
    alignItems: 'start',
    padding: '30px 0px',
    paddingLeft: '10px',
    marginTop: '2px',
    
  };

  return (
    <Grid container spacing={2} style={gridStyle}>
      <Grid item xs={7} sx={{border:'1px solid #C4C4C4',borderRadius:'5px',paddingRight:'20px'}}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                value={firstName}
                onChange={handleChange(setFirstName)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                value={lastName}
                onChange={handleChange(setLastName)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Username"
                value={username}
                onChange={handleChange(setUsername)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email Address"
                value={email}
                onChange={handleChange(setEmail)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Role"
                value={role}
                onChange={handleChange(setRole)}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Address"
                value={address}
                onChange={handleChange(setAddress)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Ward"
                value={ward}
                onChange={handleChange(setWard)}
                fullWidth
                disabled
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="City"
                value={city}
                onChange={handleChange(setCity)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Country"
                value={country}
                onChange={handleChange(setCountry)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Postal Code"
                value={postalCode}
                onChange={handleChange(setPostalCode)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={handleChange(setDescription)}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
          </Grid>
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Update Profile
          </Button>
        </form>
      </Grid>
      <Grid item xs={4} sx={{border:'1px solid #C4C4C4',borderRadius:'5px'}}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ mr: 2 }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h5">
            {user.firstName} {user.lastName}
          </Typography>
        </Box>
        <Stack sx={{ mt: 2 }}>
          <Typography variant="subtitle1">
            {user.username}
          </Typography>
        </Stack>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Stack sx={{ mt: 2 }}>
          <Typography variant="subtitle1">
            Hey there! As you can see, it is already looking great.
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};
export default Profile;
