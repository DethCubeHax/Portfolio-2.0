import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import './Projects.css';
import './Blog.css';

import HamburgerMenu from './assets/HamburgerMenu.png';

import { Analytics } from "@vercel/analytics/react"
import { initializeParticles } from './components/Particles';
import typewriter from './components/Typewriter';
import NavPanel from './NavPanel';
import Sidebar from './Sidebar';
import Terminal from './components/Terminal';

// Import blog posts from JSON file
import blogPosts from './data/blog.json';

const Blog = () => {
    const canvasRef = useRef(null);
    const titleMNTextRef = useRef(null);
    const titleLNTextRef = useRef(null);
    const [showProjects, setShowProjects] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [isTerminalVisible, setIsTerminalVisible] = useState(false);

    // State to keep track of which blog post is currently expanded
    const [expandedPostIndex, setExpandedPostIndex] = useState(null);

    useEffect(() => {
        const cleanup = initializeParticles(canvasRef);

        typewriter(titleMNTextRef.current, 'My', 100, 0.5);
        typewriter(titleLNTextRef.current, 'Blog', 100, 1);

        const timer = setTimeout(() => {
            setShowProjects(true);
        }, 1000); // Wait for 1 second before showing the projects

        return () => {
            clearTimeout(timer);
            cleanup();
        };
    }, []);

    useEffect(() => {
        setIsSidebarVisible(showSidebar);
    }, [showSidebar]);

    useEffect(() => {
        if (showProjects) {
            const projectCards = document.querySelectorAll('.ProjectCard');
            projectCards.forEach((card, index) => {
                if (index === 0) {
                    card.classList.add('show');
                } else {
                    setTimeout(() => {
                        card.classList.add('show');
                    }, index * 500); // Delay each card by 500 milliseconds
                }
            });
        }
    }, [showProjects]);

    // Function to toggle the expanded blog post
    const toggleExpandedPost = index => {
        setExpandedPostIndex(expandedPostIndex === index ? null : index);
    };

    return (
        <div className="Home" id="Home">
            <Analytics />
            <div className="HomeHeader">
                <div></div>
                <div className="HomeHeaderTitle">
                    <div className="HomeHeaderTitleHolder">
                        <div className="HomeHeaderTitleMN" ref={titleMNTextRef}></div>
                        <div className="HomeHeaderTitleLN" ref={titleLNTextRef}></div>
                    </div>
                    <div className="HomeHeaderTitleButtonHolder"></div>
                </div>
                {window.innerWidth < 600 &&
                    <div className="HomeHeaderTitleButtonHolder" style={{ paddingRight: "10px" }}>
                        <img src={HamburgerMenu} className="HomeHeaderTitleButton" alt="Hamburger Menu" style={{ zIndex: "2000" }} onClick={() => setShowSidebar((prevState) => !prevState)} />
                    </div>}
            </div>
            <div className="ContentWindow">
                <div className='BlogContent'>
                    {blogPosts.map((post, index) => {
                        // Split the date into an array [day, month, year]
                        const dateParts = post.date.split(' ');
                        // Define the string to use for the date on desktop screens
                        const desktopDate = post.date;
                        // Define the string to use for the date on mobile screens (day and month)
                        const mobileDate = `${dateParts[1]} ${dateParts[0]}`;

                        return (
                            <p
                                key={index}
                                data-date={window.innerWidth < 600 ? mobileDate : desktopDate}
                                onClick={() => toggleExpandedPost(index)}
                            >
                                <div className="postContent">
                                    <strong className={expandedPostIndex === index ? 'expanded' : ''}>
                                        {post.title}
                                    </strong>
                                    <div className={expandedPostIndex === index ? 'blogContent expandedContent' : 'blogContent'}>
                                        {post.content.split('\n').map((line, lineIndex) => (
                                            <p key={lineIndex}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            </p>
                        );
                    })}
                </div>
            </div>
            <canvas className="Particles" ref={canvasRef}></canvas>
            {window.innerWidth > 600 && <NavPanel />}

            <div className="help-container">
                <div className="help-circle" onClick={() => setIsTerminalVisible(prevState => !prevState)}>
                    <span>?</span>
                </div>

                {isTerminalVisible && (
                    <div className={`terminal-container ${isTerminalVisible ? 'visible' : ''}`}>
                        <div className="terminal-area">
                            <Terminal />
                        </div>
                    </div>
                )}
            </div>

            {isSidebarVisible && <Sidebar onClose={() => setShowSidebar((prevState) => !prevState)} />}
        </div>
    );
};

export default Blog;