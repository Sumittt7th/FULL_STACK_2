import React, { useMemo } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
  const authData = useAppSelector((store) => store.auth);
  const isAuthenticated = useMemo(() => {
    return authData.isAuthenticated || false; 
  }, [authData]);
  
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
          <Route path='/' element={<Layout allowedRoles={['ADMIN', 'USER']} />}>
            <Route
              path='dashboard'
              element={
                <LazyComponent>
                  {role === 'ADMIN' ? <AdminDashboard /> : <UserDashboard />}
                </LazyComponent>
              }
            />
            <Route
              path='profile'
              element={
                <LazyComponent>
                  <Profile />
                </LazyComponent>
              }
            />
            <Route
              path='editUser'
              element={
                <LazyComponent>
                  <EditUser />
                </LazyComponent>
              }
            />
            <Route
              path='users'
              element={
                <LazyComponent>
                  <AllUsers />
                </LazyComponent>
              }
            />
            <Route
              path='changePassword'
              element={
                <LazyComponent>
                  <ChangePassword />
                </LazyComponent>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
