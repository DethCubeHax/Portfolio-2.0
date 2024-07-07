import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import './Projects.css';

import Calendar from './assets/Calendar.png';
import Description from './assets/Description.png';
import ResearchIcon from './assets/Research.png';
import WorkIcon from './assets/Work.png';
import HamburgerMenu from './assets/HamburgerMenu.png';
import UnderwaterComms from './assets/UnderwaterComms.png'

import { initializeParticles } from './components/Particles';
import typewriter from './components/Typewriter';
import NavPanel from './NavPanel';
import Sidebar from './Sidebar';

import researchData from './data/research.json';

const Research = () => {
    const canvasRef = useRef(null);
    const titleMNTextRef = useRef(null);
    const titleLNTextRef = useRef(null);
    const [showProjects, setShowProjects] = useState(false);
    const [showDescriptionIndex, setShowDescriptionIndex] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);

    const imageMap = {
        UnderwaterComms: UnderwaterComms,
        // Add other image mappings here
    };

    useEffect(() => {
        const cleanup = initializeParticles(canvasRef);

        typewriter(titleMNTextRef.current, 'My', 100, 0.5);
        typewriter(titleLNTextRef.current, 'Research', 100, 1);

        const timer = setTimeout(() => {
            setShowProjects(true);
        }, 1000);

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
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 500);
            });
        }
    }, [showProjects]);

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
                    <div className="HomeHeaderTitleButtonHolder" style={{paddingRight: "10px"}}>
                        <img src={HamburgerMenu} className="HomeHeaderTitleButton" alt="Hamburger Menu" style={{zIndex:"2000"}} onClick={() => setShowSidebar((prevState) => !prevState)}/>
                    </div>
                }
            </div>
            <div className="ContentWindow">
                {researchData.projects.map((project, index) => (
                    <div className="ProjectCard" key={index}>
                        <div
                            className={`ProjectCardContent ${showProjects ? 'show' : ''}`}
                            onClick={() => toggleDescription(index)}
                        >
                            <div className='ProjectCardTitle'>
                                {project.title}
                            </div>
                            <img className='ProjectImageHolder' src={imageMap[project.image]} alt={project.title} />
                            <div className={`ProjectDate ${isDescriptionShown(index) ? 'show' : ''}`}>
                                <img src={Calendar} alt="Calendar" />
                                <div>{project.date}</div>
                            </div>
                            {project.links.map((link, linkIndex) => (
                                <div className="GitHubLink" key={linkIndex}>
                                    <img src={link.icon === 'ResearchIcon' ? ResearchIcon : WorkIcon} alt={link.text} />
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.text}
                                    </a>
                                </div>
                            ))}
                            <div className={`ProjectDate ${isDescriptionShown(index) ? 'show' : ''}`}>
                                <img src={Description} alt="Description" />
                                <div>Description: {descriptionText}</div>
                            </div>
                            <div className={descriptionClassName(index)}>
                                {project.description.split('\n').map((paragraph, i) => (
                                    <div key={i}>{paragraph}</div>
                                ))}
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

export default Research;