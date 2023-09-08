import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";

function PageRoutes() {
    const location = useLocation();
    return(
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
    );
}

export default PageRoutes;