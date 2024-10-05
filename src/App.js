import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate, useNavigate,useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Button from '@mui/material/Button';
import User from './pages/User';
import Home from './pages/Home';
import Rolemaster from './pages/Rolemaster';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ConsumerBill from './pages/ConsumerBill';
import Profile from './pages/auth/Profile';
import ApprovedStatusRecord from './pages/ApprovedStatusRecord';
import PaidBills from './pages/PaidBills';
import PartialPaidBills from './pages/PartialPaidBills';
import MassApprovalsBills from './pages/MassApprovalsBills';
import UsersUpcomingDueBills from './pages/UsersUpcomingDueBills';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchBills } from './store/actions/billActions';
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const { bills} = useSelector((state) => state.bills);
  const dueAlertrows = bills.filter(bill => {
    if (user?.role === 'Junior Engineer') {
      return bill.dueAlert === true && user.ward === bill.ward;
    }
    return bill.dueAlert === true;
  });
  const dueAlertCount = dueAlertrows.length;
  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  useEffect(() => {
    const storedData = localStorage.getItem("resdata");
    if (storedData) {
      const resData = JSON.parse(storedData);
      if (resData.token) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: resData,
        });
        navigate('/');
      }
    }
  }, [dispatch]);
  useEffect(() => {
    let timer;
    if (bills.length > 0 && isAuthenticated) {
      timer = setTimeout(() => {
      toast.error(
        `Reminder: You have a total of ${dueAlertCount} pending light bills.Please ensure that you do not cross the due date, as late payments will incur additional charges.`
        , {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          backgroundColor: '#FCE8E6',  
          color: '#000',               
          width: '800px',              
          height: '100px',             
          position: 'relative',          
          top: '0px',                  
          left: '-200px',                 
          display: 'flex',              
          alignItems: 'center',      
          justifyContent: 'center', 
        },
      });
    }, 6000); 
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAuthenticated]);
  const handleLogout = () => {
    localStorage.removeItem("resdata");
    dispatch({ type: "LOGOUT" });
    navigate('/login');
  };
  return (
    <>
          <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        {isAuthenticated ? (
          <>
            <Route path="/users" element={<User />} />
            <Route path="/rolemaster" element={<Rolemaster />} />
            <Route path="/bills" element={<ConsumerBill />} />
            <Route path="/usersupcomingduebills" element={<UsersUpcomingDueBills />} />
            <Route path="/massapprovalsbills" element={<MassApprovalsBills />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pendingapprovals" element={<ApprovedStatusRecord/>} />
            <Route path='/paidbills' element={<PaidBills/>}/>
            <Route path='/partialpaidbills' element={<PartialPaidBills/>}/>
            <Route path="/logout" element={<Button sx={{ color: '#0d2136' }} onClick={handleLogout}>Logout</Button>} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </>
  );
};
export default App;
  
