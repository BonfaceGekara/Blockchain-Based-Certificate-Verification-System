import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomeRedirect from './routes/HomeRedirect.jsx';
import PublicRoute from './routes/PublicRoute.jsx';
import RoleRoute from './routes/RoleRoute.jsx';

import Layout from './layouts/Layout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';

import Home from './pages/Home';
import Signup from './pages/auth/Signup.jsx';
import Login from './pages/auth/Login.jsx';
import ForgotPass from './pages/auth/ForgotPass.jsx';

import Dashboard from './pages/user/Dashboard.jsx';
import AdminDashboard from './pages/admin/Dashboard.jsx';
import AddCerificates from './pages/admin/AddCerificates.jsx';
import ManageCertificates from './pages/admin/ManageCertificates.jsx';
import ManageUsers from './pages/admin/ManageUsers.jsx';
import ViewUser from './pages/admin/ViewUser.jsx';
import Verify from './pages/user/Verify.jsx';
import Results from './components/Results.jsx';
import Verifications from './pages/user/Verifications.jsx';
import Payment from './pages/user/Payment.jsx';
import VerificationDetails from './pages/user/VerificationDetails.jsx';
import Profile from './pages/user/Profile.jsx';
import ActivateAccount from './pages/auth/ActivateAccount.jsx';
import ResetPassword from './pages/auth/ResetPassword.jsx';
import VerificationLogs from './pages/admin/VerificationLogs.jsx';
import NotFound from './pages/NotFound.jsx';

const App = () => {

  return (
    <div>
      <Routes>

        <Route element={<Layout />}>

          <Route
            path='/'
            element={
              <HomeRedirect />
            }
          />
          <Route
            path='/home'
            element={
              <Home />
            }
          />
          <Route
            path='/signup'
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route
            path='/activate'
            element={
              <PublicRoute>
                <ActivateAccount />
              </PublicRoute>
            }
          />
          <Route
            path='/login'
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path='/forgot'
            element={
              <PublicRoute>
                <ForgotPass />
              </PublicRoute>
            }
          />
          <Route
            path='/reset-password'
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />

        </Route>

        <Route element={<AuthLayout />}>

          <Route
            path='/dashboard'
            element={
              <RoleRoute role={['user']}>
                <Dashboard />
              </RoleRoute>
            }
          />
          <Route
            path='/verify'
            element={
              <RoleRoute role={['user']}>
                <Verify />
              </RoleRoute>
            }
          />
          <Route
            path='/results'
            element={
              <RoleRoute role={['user']}>
                <Results />
              </RoleRoute>
            }
          />
          <Route
            path='/verifications'
            element={
              <RoleRoute role={['user']}>
                <Verifications />
              </RoleRoute>
            }
          />
          <Route
            path='/verification/:id'
            element={
              <RoleRoute role={['user']}>
                < VerificationDetails />
              </RoleRoute>
            }
          />
          <Route
            path='/payment'
            element={
              <RoleRoute role={['user']}>
                <Payment />
              </RoleRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <RoleRoute role={['user']}>
                <Profile />
              </RoleRoute>
            }
          />
          <Route
            path='/admin/dashboard'
            element={
              <RoleRoute role={['admin']}>
                <AdminDashboard />
              </RoleRoute>
            }
          />
          <Route
            path='/admin/addcertificates'
            element={
              <RoleRoute role={['admin']}>
                <AddCerificates />
              </RoleRoute>
            }
          />
          <Route
            path='/admin/manageCertificates'
            element={
              <RoleRoute role={['admin']}>
                <ManageCertificates />
              </RoleRoute>
            }
          />
          <Route
            path='/admin/manageusers'
            element={
              <RoleRoute role={['admin']}>
                <ManageUsers />
              </RoleRoute>
            }
          />
          <Route
            path='/admin/users/:id'
            element={
              <RoleRoute role={['admin']}>
                <ViewUser />
              </RoleRoute>
            }
          />
          <Route
            path='/admin/verifications'
            element={
              <RoleRoute role={['admin']}>
                <VerificationLogs />
              </RoleRoute>
            }
          />

        </Route>

        <Route path='*' element={<NotFound />} />

      </Routes>
    </div>
  )
}

export default App;