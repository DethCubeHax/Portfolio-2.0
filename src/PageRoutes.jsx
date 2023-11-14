import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Love from "./Love";
import Projects from "./Projects";

function PageRoutes() {
    const location = useLocation();
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/love" element={<Love />} />
            <Route path="/projects" element={<Projects />} />
        </Routes>
    );
}

export default PageRoutes;