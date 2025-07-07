import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import NewExpense from "./pages/expense/NewExpense";
import ExpenseDetails from "./pages/expense/ExpenseDetails";
import ExpenseReports from "./pages/expense/ExpenseReports";

import Navbar from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { isAuthenticated } = useAuthContext();
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/new"
          element={isAuthenticated ? <NewExpense /> : <Navigate to="/login" />}
        />
        <Route
          path="/view/:expenseId"
          element={
            isAuthenticated ? <ExpenseDetails /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/reports"
          element={
            isAuthenticated ? <ExpenseReports /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/edit/:expenseId"
          element={isAuthenticated ? <NewExpense /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
