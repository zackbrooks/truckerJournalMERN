import { Routes, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Journal from "./pages/Journal.jsx";
import Company from "./pages/Company.jsx";
import Broker from "./pages/Broker.jsx";
import Error from "./pages/Error";
import { Container } from "@mui/material";
import Wrapper from "./components/HOC/Wrapper";
import ProtectedRoute from "./utils/ProtectedRoute";
function App() {
  return (
    <Container maxWidth="sm">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/journal" element={<Journal />} />
          <Route path="/company/:id" element={<Company />} />
          <Route path="/broker/:id" element={<Broker />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Container>
  );
}

export default App;
