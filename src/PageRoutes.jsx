import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Love from "./Love";

function PageRoutes() {
    const location = useLocation();
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="love" element={<Love />} />
        </Routes>
    );
}

export default PageRoutes;