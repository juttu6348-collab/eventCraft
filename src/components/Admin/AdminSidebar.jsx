import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Calendar,
    BarChart3,
    Settings,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    Activity
} from 'lucide-react';

function AdminSidebar({ collapsed, setCollapsed }) {
    const location = useLocation();

    const menuItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Overview', exact: true },
        { path: '/admin/users', icon: Users, label: 'Users' },
        { path: '/admin/events', icon: Calendar, label: 'Events' },
        { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
        { path: '/admin/activity', icon: Activity, label: 'Activity Logs' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    const isActive = (path, exact) => {
        if (exact) return location.pathname === path;
        return location.pathname.startsWith(path);
    };

    return (
        <>
            {/* Toggle Button - Outside sidebar for visibility */}
            <button
                className={`sidebar-toggle ${collapsed ? 'collapsed-state' : ''}`}
                onClick={() => setCollapsed(!collapsed)}
                aria-label="Toggle Sidebar"
                style={{
                    position: 'fixed',
                    left: collapsed ? '71px' : '266px',
                    top: '94px',
                    zIndex: 1000,
                    transition: 'left 0.3s ease'
                }}
            >
                {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>

            {/* Sidebar */}
            <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}>
                {/* Sidebar Header */}
                <div className="sidebar-header">
                    <div className="sidebar-logo">
                        <LayoutDashboard size={24} className="text-info" />
                    </div>
                    {!collapsed && <h5 className="sidebar-title mb-0">Admin Panel</h5>}
                </div>

                {/* Navigation Menu */}
                <nav className="sidebar-nav">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.path, item.exact);

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`sidebar-nav-item ${active ? 'active' : ''}`}
                                title={collapsed ? item.label : ''}
                            >
                                <Icon size={20} />
                                {!collapsed && <span>{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
}

export default AdminSidebar;
