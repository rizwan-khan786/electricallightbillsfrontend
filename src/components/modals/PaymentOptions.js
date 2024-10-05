// // components/modals/PaymentOptions.js
// import React from 'react';
// import { Box, Typography, Button } from '@mui/material';
// import mohanqr from "../../Images/mohan_qr.jpeg";
// const PaymentOptions = ({ bill, handleClose }) => {
//   return (
//     <Box p={2} sx={{ zIndex: 1,backgroundColor:'white'}}>
//       <Typography variant="h6">Payment for {bill.firstName} {bill.lastName}</Typography>
//       <Button variant="outlined" onClick={handleClose}>
//         X
//       </Button>
//       {/* Add your QR code or other payment options here */}
//       {/* <Typography>QR Code:</Typography> */}
//       <img src={mohanqr} alt="QR Code" height="200px" width="200px" />
//     </Box>
//   );
// };

// export default PaymentOptions;

// components/modals/PaymentOptions.js
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import mohanqr from "../../Images/mohan_qr.jpeg";

const PaymentOptions = ({ bill, handleClose }) => {
  return (
    <Box p={2} sx={{ zIndex: 1, backgroundColor: '#f3f3f3', position: 'relative',width:"100%" }}>
      <Typography>Payment for {bill.firstName} {bill.lastName}</Typography>
      <Button
        variant="outlined"
        onClick={handleClose}
        sx={{ position: 'absolute', top: '10px', right: '10px' }}
      >
        X
      </Button>
      <img src={mohanqr} alt="QR Code" height="200px" width="200px" style={{ marginTop: '20px' }} />
    </Box>
  );
};

export default PaymentOptions;
