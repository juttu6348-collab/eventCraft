import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Themes from './pages/Themes';
import Events from './pages/Events';
import Dashboard from './pages/Dashboard';
import CreateEventForm from './pages/CreateEventForm';
import SharePage from './pages/SharePage';
import EventView from './pages/EventView';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import Overview from './pages/admin/Overview';
import UsersManagement from './pages/admin/UsersManagement';
import EventsManagement from './pages/admin/EventsManagement';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';
import ActivityLogs from './pages/admin/ActivityLogs';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './inline-styles.css';
import './admin-styles.css';
import './microsite.css';

import { UIProvider } from './context/UIContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <UIProvider>
            <Toaster position="top-center" toastOptions={{
              style: {
                background: '#333',
                color: '#fff',
              },
            }} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/themes" element={<Themes />} />
              <Route path="/events" element={<Events />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

              {/* Admin Routes with Nested Routing */}
              <Route path="/admin" element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminDashboard />
                </ProtectedRoute>
              }>
                <Route index element={<Overview />} />
                <Route path="users" element={<UsersManagement />} />
                <Route path="events" element={<EventsManagement />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="activity" element={<ActivityLogs />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/create" element={<CreateEventForm />} />
              <Route path="/create/:eventType" element={<CreateEventForm />} />
              <Route path="/share/:slug" element={<SharePage />} />
              <Route path="/e/:slug/*" element={<EventView />} />
            </Routes>
          </UIProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
