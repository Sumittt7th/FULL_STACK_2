import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './store/store';
import HomePage from './pages/homepage';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import NotFoundPage from './pages/errorPage';
import Layout from './layouts/layout';
import LazyComponent from './components/LazyComponent';
import ResetPasswordPage from './pages/resetpassword';
import ForgotPasswordPage from './pages/forgetpassword';
import AuthPage from './pages/auth';
import { AnimatePresence } from 'motion/react';
import Basic from './layouts/Basic';

const AdminDashboard = React.lazy(() => import('./components/AdminDashboard'));
const UserDashboard = React.lazy(() => import('./components/UserDashboard'));
const Profile = React.lazy(() => import('./pages/profile'));
const EditUser = React.lazy(() => import('./pages/edituser'));
const AllUsers = React.lazy(() => import('./pages/alluser'));
const ChangePassword = React.lazy(() => import('./pages/changepassword'));

function App() {
  const { role } = useAppSelector((state) => state.auth);

  return (
    <>
      <AnimatePresence mode='wait'>
        <Routes>
          {/* Public Routes */}
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
              <LazyComponent>
                <Layout allowedRoles={['ADMIN', 'USER']} />
              </LazyComponent>
            }
          >
            <Route path='dashboard' element={role === 'ADMIN' ? <AdminDashboard /> : <UserDashboard />}/>
            <Route path='profile' element={<Profile />} />
            <Route path='editUser' element={<EditUser />} />
            <Route path='users' element={<AllUsers />} />
            <Route path='changePassword' element={<ChangePassword />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
