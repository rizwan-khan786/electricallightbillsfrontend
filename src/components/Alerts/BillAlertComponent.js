    import React, { useEffect } from 'react';
    import { useSelector } from 'react-redux';
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

    const BillAlertComponent = ({ bills }) => {
    const user = useSelector(state => state.auth.user);

    // Filter dueAlert bills based on the user's role and ward
    const dueAlertrows = bills.filter(bill => {
        if (user?.role === 'Junior Engineer') {
        return bill.dueAlert === true && user.ward === bill.ward;
        }
        return bill.dueAlert === true;
    });

    const dueAlertCount = dueAlertrows.length;

    // Show toast notification on successful login
    useEffect(() => {
        if (user?.role === 'Junior Engineer' && dueAlertCount > 0) {
        toast.info(`Please pay your bills. You have ${dueAlertCount} pending bills.`, {
            position: "top-center", // Horizontal toast
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        }
    }, [user, dueAlertCount]);

    return (
        <>
        {/* Render your UI or table */}
        <ToastContainer />
        </>
    );
    };

    export default BillAlertComponent;
