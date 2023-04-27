import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import isLoggedIn from './isLoggedIn';
const Dashboard = ({ children, type }) => {
    const [sidebar, setSidebar] = useState(false);

    const openSidebar = () => {
        setSidebar(true);
    }

    const closeSidebar = () => {
        setSidebar(false);
    }
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (!isLoggedIn()) {
    //         navigate("/login");
    //     }
    // }, [])
    return (
        <div className={type === 2 ? "container" : "container"}>
            <Navbar sidebar={sidebar} openSidebar={openSidebar} />
            {children}
            <Sidebar sidebar={sidebar} closeSidebar={closeSidebar} />
        </div>
    )
}

export default Dashboard