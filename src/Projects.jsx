import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import './Projects.css';

import Calendar from './assets/Calendar.png';
import Tools from './assets/Tools.png';
import Description from './assets/Description.png';
import GitHubIcon from './assets/Github.png';
import HamburgerMenu from './assets/HamburgerMenu.png';

// Import project images
import GPAid from './assets/GPAid.jpg';
import Fish from './assets/Fish.jpg';
import Sudoku from './assets/Sudoku.png';
import SmartDisplay from './assets/SmartDisplay.jpeg';
import Portfolio from './assets/Portfolio.png';

import { initializeParticles } from './components/Particles';
import typewriter from './components/Typewriter';
import NavPanel from './NavPanel';
import Sidebar from './Sidebar';

import projectsData from './data/projects.json';

const Projects = () => {
    const canvasRef = useRef(null);
    const titleMNTextRef = useRef(null);
    const titleLNTextRef = useRef(null);
    const [showProjects, setShowProjects] = useState(false);
    const [showDescriptionIndex, setShowDescriptionIndex] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const imageMap = {
        GPAid: GPAid,
        Fish: Fish,
        Sudoku: Sudoku,
        SmartDisplay: SmartDisplay,
        Portfolio: Portfolio
    };

    useEffect(() => {
        const cleanup = initializeParticles(canvasRef);

        typewriter(titleMNTextRef.current, 'My', 100, 0);
        typewriter(titleLNTextRef.current, 'Projects', 100, 0.3);

        const timer = setTimeout(() => {
            setShowProjects(true);
        }, 1000);

        return () => {
            clearTimeout(timer);
            cleanup();
        };
    }, []);

    useEffect(() => {
        if (showProjects) {
            const projectCards = document.querySelectorAll('.ProjectCard');
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 500);
            });
        }
    }, [showProjects]);

    useEffect(() => {
        setIsSidebarVisible(showSidebar);
    }, [showSidebar]);

    const toggleDescription = (index) => {
        setShowDescriptionIndex(showDescriptionIndex === index ? null : index);
    };

    const isDescriptionShown = (index) => showDescriptionIndex === index;

    const descriptionText = showDescriptionIndex !== null ? '' : 'Click to expand';

    const descriptionClassName = (index) =>
        `Description ${isDescriptionShown(index) ? 'show' : ''} ${isDescriptionShown(index) ? '' : 'hidden'}`;

    return (
        <div className="Home" id="Home">
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
                        <img src={HamburgerMenu} className="HomeHeaderTitleButton" alt="Hamburger Menu" style={{zIndex:"2000"}} onClick={() => setShowSidebar((prevState) => !prevState)}/>
                    </div>
                }
            </div>

            {window.innerWidth > 600 && <div className='Spacer'></div>}
            <div className="ContentWindow">
                {projectsData.map((project, index) => (
                    <div className="ProjectCard" key={index}>
                        <div
                            className={`ProjectCardContent ${showProjects ? 'show' : ''}`}
                            onClick={() => toggleDescription(index)}
                        >
                            <div className='ProjectCardTitle'>
                                {project.title}
                            </div>
                            <img className='ProjectImageHolder' src={imageMap[project.imageUrl]} alt={project.title} />
                            <div className={`ProjectDate ${isDescriptionShown(index) ? 'show' : ''}`}>
                                <img src={Calendar} alt="Calendar" />
                                <div>{project.date}</div>
                            </div>
                            <div className="GitHubLink">
                                <img src={GitHubIcon} alt="GitHub Icon" />
                                <a href={project.gitHubLink} target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                            </div>
                            <div className={`ProjectDate ${isDescriptionShown(index) ? 'show' : ''}`}>
                                <img src={Tools} alt="Tools" />
                                <div>{project.tools}</div>
                            </div>
                            <div className={`ProjectDate ${isDescriptionShown(index) ? 'show' : ''}`}>
                                <img src={Description} alt="Description" />
                                <div >Description: {descriptionText}</div>
                            </div>
                            <div className={descriptionClassName(index)}>
                                {project.description}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <canvas className="Particles" ref={canvasRef}></canvas>
            {window.innerWidth > 600 && <NavPanel />}

            {isSidebarVisible && <Sidebar onClose={() => setShowSidebar((prevState) => !prevState)} />}
        </div>
    );
};

export default Projects;