import { Fragment, useContext } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Index from "../pages/dashboard";
import DayBalance from "../pages/dashboard/DayBalance";
import Login from "../pages/login/login";
import Register from "../pages/register/Register";
import { AuthContext, AuthProvider } from "../context/authContext";
import AdminDashboard from "../pages/dashboard/adminDashboard";
import ErrorPage from "../pages/notFound";

export const Private = ({ children }) => {
    const { authenticated } = useContext(AuthContext)
    if (!authenticated) {
        return <Navigate to="/login" />
    }
    return children
}
export const Public = ({ children }) => {
    const { authenticated } = useContext(AuthContext)
    if (authenticated) {
        return <Navigate to='/home' />
    }
    return children
}

export const Admin = ({ children }) => {
    const navigate = useNavigate()
    const { authenticated, status } = useContext(AuthContext);

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    if (status === '1') {
        return <>
            <h3>Voce não tem permissão para entrar aqui</h3>
        </>
    }

    return children
};

const RoutesApp = () => {
    return (
        <Fragment>
            <Routes>
                <Route exact path="/" element={<Public><Navigate to="/login" replace /></Public>} />
                <Route exact path="/login" element={<Public><Login /></Public>} />
                <Route exact path="/register" element={<Public><Register /></Public>} />
                <Route exact path="/home" element={<Private><Index /></Private>} />
                <Route exact path="/saldodia" element={<Private><DayBalance /></Private>} />
                <Route exact path="/admin" element={<Admin><AdminDashboard /></Admin>} />
                <Route exact path="*" element={<ErrorPage />} />
            </Routes>
        </Fragment>
    );
};

export default RoutesApp;
