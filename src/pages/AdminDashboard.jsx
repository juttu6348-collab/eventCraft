import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import AdminSidebar from '../components/Admin/AdminSidebar';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const { userRole } = useAuth();
    const navigate = useNavigate();

    // Protect admin route
    useEffect(() => {
        if (userRole !== 'admin') {
            navigate('/');
        }
    }, [userRole, navigate]);

    if (userRole !== 'admin') {
        return null;
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />

            <div className="admin-layout">
                <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />

                <main className={`admin-main-content ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
                    <div className="admin-content-wrapper">
                        <Outlet />
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
}

export default AdminDashboard;
