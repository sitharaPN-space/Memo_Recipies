import React from "react";
import { Container} from '@material-ui/core';
import Navbar from "./components/NavBar/Navbar";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () =>{


    return(
        <GoogleOAuthProvider clientId="767197306847-43bcdsf6ue2g1ha5uaacq93fmsoerspr.apps.googleusercontent.com">
        <BrowserRouter>
            <Container maxWidth="lg">
                <Navbar/>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Container>
        </BrowserRouter>
        </GoogleOAuthProvider>
     
    )
}

export default App;
