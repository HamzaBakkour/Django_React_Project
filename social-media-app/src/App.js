//src/App.js
import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import SinglePost from "./pages/SinglePost";
import Profile from "./pages/Profiel";
import EditProfile from "./pages/EditProfile";

function App(){
  return(
    <Routes>

      <Route path = "/" element = {
        // The default location is the profile page(Home)
        //However, with no credentials in the store, the user
        //will be redirected to the login page(ProtectedRoute)
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }/>

      <Route path = "/login" element = {<div>Login</div>}/>

      <Route path = "/register/" element = {<Registration />}/>

      <Route path = "/login/" element = {<Login />}/>

      <Route path = "/post/:postId" element = {
        <ProtectedRoute>
          <SinglePost />
        </ProtectedRoute>
      }/>

      <Route
      path = "/profile/:profileId/"
      element = {
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }/>

      <Route
      path = "/profile/:profileId/edit/"
      element = {
        <ProtectedRoute>
          <EditProfile/>
        </ProtectedRoute>
      }/>

    </Routes>
  );
} 

export default App;

