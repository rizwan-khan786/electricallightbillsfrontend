import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import CountUp from 'react-countup';
import './InfoCard.css';
const InfoCard = ({ title, count }) => {
  return (
    <Card
    className='container-infocard'
    sx={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        minWidth: 250,
        minHeight:175,
        margin: 2,
        color: 'white',
        borderRadius:'4px'
      }}
     >
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="h4">
          <CountUp  style={{fontSize:'17px',color:'#9A9A9A'}} end={count} duration={3.5} />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
