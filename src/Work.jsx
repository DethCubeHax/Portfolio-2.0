import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import './Projects.css';

import Calendar from './assets/Calendar.png';
import Tools from './assets/Tools.png';
import Description from './assets/Description.png';
import WorkIcon from './assets/Work.png';
import HamburgerMenu from './assets/HamburgerMenu.png';

import { initializeParticles } from './components/Particles';
import typewriter from './components/Typewriter';
import NavPanel from './NavPanel';
import Sidebar from './Sidebar';

// Import JSON data
import studentRA from './work/studentRA.json';
import softwareEngineer from './work/softwareEngineer.json';
import studentRARobotics from './work/studentRARobotics.json';
import scb from './work/scb.json';

const Work = () => {
    const canvasRef = useRef(null);
    const titleMNTextRef = useRef(null);
    const titleLNTextRef = useRef(null);
    const [showProjects, setShowProjects] = useState(false);
    const [showDescriptionIndex, setShowDescriptionIndex] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [images, setImages] = useState({});

    const workExperiences = [scb, studentRARobotics, softwareEngineer, studentRA ];

    useEffect(() => {
        const loadImages = async () => {
            const imageModules = await Promise.all(
                workExperiences.map(experience => import(`${experience.image}`))
            );
            const loadedImages = {};
            imageModules.forEach((module, index) => {
                loadedImages[workExperiences[index].image] = module.default;
            });
            setImages(loadedImages);
        };

        loadImages();
        const cleanup = initializeParticles(canvasRef);

        typewriter(titleMNTextRef.current, 'Work', 100, 0);
        typewriter(titleLNTextRef.current, 'Experiences', 100, 0.5);

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
                if (index === 0) {
                    card.classList.add('show');
                } else {
                    setTimeout(() => {
                        card.classList.add('show');
                    }, index * 500);
                }
            });
        }
    }, [showProjects]);

    useEffect(() => {
        setIsSidebarVisible(showSidebar);
    }, [showSidebar]);

    const toggleDescription = (index) => {
        if (showDescriptionIndex === index) {
            setShowDescriptionIndex(null);
        } else {
            setShowDescriptionIndex(index);
        }
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
                {workExperiences.map((experience, index) => (
                    <div className="ProjectCard" key={index}>
                        <div
                            className={`ProjectCardContent ${showProjects ? 'show' : ''}`}
                            onClick={() => toggleDescription(index)}
                        >
                            <div className='ProjectCardTitle'>
                                {experience.title}
                            </div>
                            {images[experience.image] && (
                                <img className='ProjectImageHolder' src={images[experience.image]} alt={experience.title} />
                            )}
                            <div className={`ProjectDate ${isDescriptionShown(index) ? 'show' : ''}`}>
                                <img src={Calendar} alt="Calendar" />
                                <div>{experience.date}</div>
                            </div>
                            <div className="GitHubLink">
                                <img src={WorkIcon} alt="Work Icon" />
                                <a href={experience.companyLink} rel="noopener noreferrer">
                                    {experience.company}
                                </a>
                            </div>
                            <div className={`ProjectDate ${isDescriptionShown(index) ? 'show' : ''}`}>
                                <img src={Tools} alt="Tools" />
                                <div>{experience.tools}</div>
                            </div>
                            <div className={`ProjectDate ${isDescriptionShown(index) ? 'show' : ''}`}>
                                <img src={Description} alt="Description" />
                                <div>Description: {descriptionText}</div>
                            </div>
                            <div className={descriptionClassName(index)}>
                                {experience.description.map((paragraph, pIndex) => (
                                    <div key={pIndex}>{paragraph}</div>
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

export default Work;