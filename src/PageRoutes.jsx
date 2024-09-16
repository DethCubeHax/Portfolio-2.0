import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home";
import Projects from "./Projects";
import Work from "./Work";
import Research from "./Research";
import Blog from "./Blog";
import Raksh from "./Raksh";

function PageRoutes() {
    const location = useLocation();
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/work" element={<Work />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/research" element={<Research />} />
            <Route path="/raksh" element={<Raksh />} />
        </Routes>
    );
}

export default PageRoutes;