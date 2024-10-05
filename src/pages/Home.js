// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../store/actions/userActions';
import { fetchRoles } from '../store/actions/roleActions';
import { getMasters } from '../store/actions/masterActions';

import InfoCard from '../components/cards/InfoCard';
import { CircularProgress, Box } from '@mui/material';
import './Home.css';

const Home = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector((state) => state.sidebar.isOpen);

  const { users, loading: loadingUsers, error: errorUsers } = useSelector((state) => state.users);
  const { roles, loading: loadingRoles, error: errorRoles } = useSelector((state) => state.roles);
  const { masters, loading: loadingMasters, error: errorMasters } = useSelector((state) => state.masters);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(getMasters());
    dispatch(fetchRoles());
    document.body.classList.add('home-body');
    return () => {
      // Clean up: Remove body class when component unmounts
      document.body.classList.remove('home-body');
    };

  }, [dispatch]);

  if (loadingUsers || loadingRoles) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (errorUsers) {
    return <p>Error loading users: {errorUsers}</p>;
  }

  if (errorRoles) {
    return <p>Error loading roles: {errorRoles}</p>;
  }
  const gridStyle = {
    width: '100%',
    width: isSidebarOpen ? '80%' : '95%', // adjust the values as needed
  marginLeft: isSidebarOpen ? '20%' : '60px', // adjust the values as needed
  transition: 'margin-left 0.3s',
  display: 'flex',
  height: '88.4vh',
  justifyContent: 'flex-start',
  alignContent: 'flex-start',
  alignItems: 'flex-start',
  // backgroundColor:'red'
  };
  
  return (
    <div style={gridStyle} className="containerhome">
     {/* <div className="opacity-layer"> </div> */}
     <div className="info-card-container">
     <InfoCard className='container-infocard' title="Total Masters" count={masters.length} />
     <InfoCard className='container-infocard' title="Total Users" count={users.length} />
     </div>
     
    </div>
  );
};

export default Home;
