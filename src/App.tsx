// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import RecoverPassword from './components/RecoverPassword';
import Dashboard from './components/Dashboard';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import BudgetList from './components/BudgetList';
import BudgetForm from './components/BudgetForm';
import ExportPDF from './components/ExportPDF';
import Profile from './components/Profile';
import { PrivateRoute } from './components/PrivateRoute';

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div className="container mx-auto p-4">
        <Routes>
          {/* Public routes */}
          <Route
            path="/login"
            element={
              !isAuthenticated
                ? <Login />
                : <Navigate to="/dashboard" replace />
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated
                ? <Register />
                : <Navigate to="/dashboard" replace />
            }
          />
          <Route
            path="/recover"
            element={
              !isAuthenticated
                ? <RecoverPassword />
                : <Navigate to="/dashboard" replace />
            }
          />

          {/* Root redirect */}
          <Route
            path="/"
            element={
              isAuthenticated
                ? <Navigate to="/dashboard" replace />
                : <Navigate to="/login" replace />
            }
          />

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionList />} />
            <Route path="/transactions/new" element={<TransactionForm />} />
            <Route path="/transactions/edit/:id" element={<TransactionForm />} />
            <Route path="/budgets" element={<BudgetList />} />
            <Route path="/budgets/new" element={<BudgetForm />} />
            <Route path="/budgets/edit/:id" element={<BudgetForm />} />
            <Route path="/export" element={<ExportPDF />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Catch-all */}
          <Route
            path="*"
            element={
              isAuthenticated
                ? <Navigate to="/dashboard" replace />
                : <Navigate to="/login" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
