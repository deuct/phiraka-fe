// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import { AuthProvider } from "./hooks/useAuth";
import Register from "./pages/register/Register";
import ListUser from "./pages/users/ListUser";
import AddUser from "./pages/users/AddUser";
import Home from "./pages/home/Home";
import { ProtectedRoute } from "./helper/ProtectedRoute";
// import Notfound from "./pages/notfound/Notfound";
import Notfound from "./pages/notfound/NotfoundError";
import EditUser from "./pages/users/EditUser";
// import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <ListUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/add"
            element={
              <ProtectedRoute>
                <AddUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/edit"
            element={
              <ProtectedRoute>
                <EditUser />
              </ProtectedRoute>
            }
          />
          <Route path="/401" element={<Notfound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
