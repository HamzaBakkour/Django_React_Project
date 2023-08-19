//src/routes/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../hooks/user.actions";

/**Retrive the user property from localStorage and check
    wether we should redirect the user to login page or 
    render the page children*/
function ProtectedRoute({ children }) {
    const user = getUser();
    return user ? <>{children}</> : <Navigate to="/login/"/>;
}

export default ProtectedRoute;

