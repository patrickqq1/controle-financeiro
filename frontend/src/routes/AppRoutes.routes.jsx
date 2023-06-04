import { Fragment, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Index from "../pages/dashboard";
import DayBalance from "../pages/dashboard/DayBalance";
import Login from "../pages/login/login";
import Register from "../pages/register/Register";
import { AuthContext, AuthProvider } from "../context/authContext";

export const Private = ({children}) => {
    const { authenticated } = useContext(AuthContext)
    if(!authenticated){
        return <Navigate to="/login" />
    }
    return children
}
export const Public = ({children}) => {
    const { authenticated } = useContext(AuthContext)
    if(authenticated){
        return <Navigate to='/home' />
    }
    return children
}

const RoutesApp = () => {
    return (
        <Fragment>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<Public><Navigate to="/login" replace /></Public>} />
                    <Route exact path="/login" element={<Public><Login /></Public>} />
                    <Route exact path="/register" element={<Public><Register /></Public>} />
                    <Route exact path="/home" element={<Private><Index /></Private>} />
                    <Route exact path="/saldodia" element={<Private><DayBalance /></Private>} />
                </Routes>
            </AuthProvider>
        </Fragment>
    );
};

export default RoutesApp;
