import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './store/store';
import HomePage from './pages/homepage';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import NotFoundPage from './pages/errorPage';
import Layout from './layouts/layout';
import ResetPasswordPage from './pages/resetpassword';
import ForgotPasswordPage from './pages/forgetpassword';
import AuthPage from './pages/auth';
import { AnimatePresence } from 'motion/react';
import Basic from './layouts/Basic';
import Navbar from './layouts/navbar';

const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const UserDashboard = React.lazy(() => import('./components/UserDashboard'));
const Profile = React.lazy(() => import('./pages/profile'));
const EditUser = React.lazy(() => import('./pages/edituser'));
const AllUsers = React.lazy(() => import('./pages/alluser'));
const ChangePassword = React.lazy(() => import('./pages/changepassword'));
const Transaction = React.lazy(() => import('./pages/transaction'))
const AllApprovals = React.lazy(() => import('./pages/allapproval'))
const AllTransactions = React.lazy(() => import('./pages/alltransactions'))

function App() {
  const { role } = useAppSelector((state) => state.auth);

  return (
    <>
      <AnimatePresence mode='wait'>
        <Routes>
          {/* Public Routes */}
          <Route element={<Navbar />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutPage />} />
          <Route path='/contact' element={<ContactPage />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />

          <Route element={<Basic />}>
            <Route path='/auth' element={<AuthPage />} />
          </Route>

          {/* Protected Routes */}
          <Route
            path='/'
            element={
             
                <Layout allowedRoles={['ADMIN', 'USER']} />
             
            }
          >
            <Route path='dashboard' element={role === 'ADMIN' ? <AdminDashboard /> : <UserDashboard />}/>
            <Route path='profile' element={<Profile />} />
            <Route path='editUser' element={<EditUser />} />
            <Route path='users' element={<AllUsers />} />
            <Route path='transaction' element={<Transaction/>} />
            <Route path='changePassword' element={<ChangePassword />} />
            <Route path='approvals' element={<AllApprovals />} />
            <Route path='all_transactions' element={<AllTransactions />} />
          </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
