//src/hooks/user.actions.js
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axtiosService from "../helpers/axios";

function useUserActions() {
    const navigate = useNavigate();
    const baseURL = process.env.REACT_APP_API_URL;

    return {
        login,
        register,
        logout,
        edit
    };

    // Login the user
    function login(data) {
            return axios.post(`${baseURL}/auth/login/`, data).then((res) => {
            // Registering the account and tokens in the store
            setUserData(res.data);
            navigate("/");
        });
    }

    // Register the user
    function register(data) {
            return axios.post(`${baseURL}/auth/register/`, data).then((res) => {
            // Registering the account and tokens in the store
            setUserData(res.data);
            navigate("/");
        });
    }

  // Logout the user
    function logout() {
        localStorage.removeItem("auth");
        navigate("/login");
    }

    function edit(data, userId) {
        return axtiosService.patch(`${baseURL}/user/${userId}/`, data, {
            headers: {
                "content-type": "multipart/form-data",
                },
            })
            .then((res) => {
                localStorage.setItem(
                                    "auth",
                                    JSON.stringify({
                                        access: getAccessToken(),
                                        refresh: getRefreshToken(),
                                        user: res.data,
                                    })
                            );
            });
        }
}

// Get the user
function getUser() {
    const auth = JSON.parse(localStorage.getItem("auth")) || null;
    if (auth) {
        return auth.user;
    } else {
        return null;
    }
}

// Get the access token
function getAccessToken() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth.access;
}

// Get the refresh token
function getRefreshToken() {
    const auth = JSON.parse(localStorage.getItem("auth"));
    return auth.refresh;
}

// Set the access, token and user property
function setUserData(data) {
    localStorage.setItem(
        "auth",
        JSON.stringify({
            access: data.access,
            refresh: data.refresh,
            user: data.user,
        })
    );
}

export { useUserActions, getUser, getAccessToken, getRefreshToken };

