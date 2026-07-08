import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    UserPlus,
    Edit,
    Trash2,
    Download,
    RefreshCw
} from 'lucide-react';
import {
    getAllUsers,
    deleteUserAdmin,
    updateUserRole,
    getAllEvents,
    deleteEventAdmin,
    suspendUser,
    unsuspendUser
} from '../../services/adminService';
import UserModal from '../../components/Admin/UserModal';
import ConfirmDialog from '../../components/Admin/ConfirmDialog';
import toast from 'react-hot-toast';

function UsersManagement() {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterRole, setFilterRole] = useState('all');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [showUserModal, setShowUserModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [users, searchQuery, filterRole]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const [usersData, eventsData] = await Promise.all([
                getAllUsers(),
                getAllEvents()
            ]);
            setUsers(usersData);
            setEvents(eventsData);
        } catch (error) {
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const filterUsers = () => {
        let filtered = users;

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(user =>
                user.displayName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                user.email?.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Role filter
        if (filterRole !== 'all') {
            filtered = filtered.filter(user => user.role === filterRole);
        }

        setFilteredUsers(filtered);
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUserAdmin(userId);
            toast.success('User deleted successfully');
            loadUsers();
        } catch (error) {
            toast.error('Failed to delete user');
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole);
            toast.success('Role updated successfully');
            loadUsers();
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    const handleBulkDelete = async () => {
        if (selectedUsers.length === 0) return;

        try {
            await Promise.all(selectedUsers.map(id => deleteUserAdmin(id)));
            toast.success(`${selectedUsers.length} users deleted`);
            setSelectedUsers([]);
            loadUsers();
        } catch (error) {
            toast.error('Failed to delete users');
        }
    };

    const handleSuspend = async (userId) => {
        try {
            await suspendUser(userId);
            toast.success('User suspended successfully');
            loadUsers();
        } catch (error) {
            toast.error('Failed to suspend user');
        }
    };

    const handleUnsuspend = async (userId) => {
        try {
            await unsuspendUser(userId);
            toast.success('User unsuspended successfully');
            loadUsers();
        } catch (error) {
            toast.error('Failed to unsuspend user');
        }
    };

    const handleWipeUserData = async (userId) => {
        try {
            // Get user's events and delete them
            const userEvents = events.filter(e => e.userId === userId);
            if (userEvents.length > 0) {
                await Promise.all(userEvents.map(e => deleteEventAdmin(e.id)));
            }
            toast.success('User data wiped successfully');
            loadUsers();
        } catch (error) {
            toast.error('Failed to wipe user data');
            throw error;
        }
    };

    const exportToCSV = () => {
        const csv = [
            ['Name', 'Email', 'Role', 'Status', 'Events', 'Joined'].join(','),
            ...filteredUsers.map(user => [
                user.displayName || 'N/A',
                user.email || 'N/A',
                user.role,
                user.status,
                user.eventIds?.length || 0,
                user.createdAt?.toDate?.().toLocaleDateString() || 'N/A'
            ].join(','))
        ].join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `users-${new Date().toISOString()}.csv`;
        a.click();
        toast.success('Users exported to CSV');
    };

    if (loading) {
        return (
            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
                <div className="spinner-border text-info" style={{ width: '3rem', height: '3rem' }}></div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-1">Users Management</h2>
                    <p className="text-muted-light mb-0">Manage all users and their permissions</p>
                </div>
                <button className="btn btn-gradient" onClick={() => {
                    setEditingUser(null);
                    setShowUserModal(true);
                }}>
                    <UserPlus size={18} className="me-2" />
                    Add User
                </button>
            </div>

            {/* Actions Bar */}
            <div className="glass-card p-3 mb-3">
                <div className="row g-2">
                    <div className="col-md-4">
                        <div className="input-group">
                            <span className="input-group-text bg-transparent border-secondary">
                                <Search size={18} />
                            </span>
                            <input
                                type="text"
                                className="form-control bg-transparent border-secondary text-white"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="input-group">
                            <span className="input-group-text bg-transparent border-secondary">
                                <Filter size={18} />
                            </span>
                            <select
                                className="form-select bg-transparent border-secondary text-white"
                                value={filterRole}
                                onChange={(e) => setFilterRole(e.target.value)}
                            >
                                <option value="all">All Roles</option>
                                <option value="user">Users</option>
                                <option value="admin">Admins</option>
                                <option value="guest">Guests</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-5 d-flex gap-2 justify-content-end">
                        <button className="btn btn-outline-info" onClick={loadUsers}>
                            <RefreshCw size={16} className="me-1" />
                            Refresh
                        </button>
                        <button className="btn btn-outline-success" onClick={exportToCSV}>
                            <Download size={16} className="me-1" />
                            Export CSV
                        </button>
                        {selectedUsers.length > 0 && (
                            <button className="btn btn-outline-danger" onClick={handleBulkDelete}>
                                <Trash2 size={16} className="me-1" />
                                Delete ({selectedUsers.length})
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="glass-card p-3">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead>
                            <tr>
                                <th style={{ width: '40px' }}>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedUsers(filteredUsers.map(u => u.id));
                                            } else {
                                                setSelectedUsers([]);
                                            }
                                        }}
                                    />
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Events</th>
                                <th>Joined</th>
                                <th className="text-end">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedUsers([...selectedUsers, user.id]);
                                                } else {
                                                    setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                                                }
                                            }}
                                        />
                                    </td>
                                    <td className="fw-semibold">{user.displayName || 'N/A'}</td>
                                    <td>{user.email || 'Guest'}</td>
                                    <td>
                                        <select
                                            className="form-select form-select-sm bg-transparent text-white border-secondary"
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            disabled={user.role === 'admin'}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                            <option value="guest">Guest</option>
                                        </select>
                                    </td>
                                    <td>
                                        <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-warning'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>{user.eventIds?.length || 0}</td>
                                    <td>{user.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}</td>
                                    <td className="text-end">
                                        <div className="btn-group btn-group-sm">
                                            <button
                                                className="btn btn-outline-info"
                                                onClick={() => {
                                                    setEditingUser(user);
                                                    setShowUserModal(true);
                                                }}
                                                title="Edit"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => {
                                                    setUserToDelete(user);
                                                    setShowDeleteConfirm(true);
                                                }}
                                                disabled={user.role === 'admin'}
                                                title="Delete"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-3 text-muted-light small">
                    Showing {filteredUsers.length} of {users.length} users
                </div>
            </div>

            {/* Modals */}
            <UserModal
                isOpen={showUserModal}
                onClose={() => {
                    setShowUserModal(false);
                    setEditingUser(null);
                }}
                onSave={(userData) => {
                    // Handle save logic here
                    loadUsers();
                }}
                user={editingUser}
                onWipeUserData={handleWipeUserData}
            />

            <ConfirmDialog
                isOpen={showDeleteConfirm}
                onClose={() => {
                    setShowDeleteConfirm(false);
                    setUserToDelete(null);
                }}
                onConfirm={() => {
                    if (userToDelete) {
                        handleDeleteUser(userToDelete.id);
                    }
                }}
                title="Delete User"
                message={`Are you sure you want to delete ${userToDelete?.displayName || userToDelete?.email}? This action cannot be undone.`}
                confirmText="Delete"
                confirmVariant="danger"
            />
        </div>
    );
}

export default UsersManagement;

