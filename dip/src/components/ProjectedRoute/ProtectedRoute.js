import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, ...props }) {
    return props.LogIn ? children : <Navigate replace to="/" />;
}
export default ProtectedRoute;