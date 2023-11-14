import React, { useEffect, useRef, useState } from 'react';
import './Home.css';
import './Projects.css';

import LinkedIn from './assets/LinkedIn.png';
import GPAid from './assets/GPAid.jpg';
import Github from './assets/Github.png';
import Calendar from './assets/Calendar.png';
import Tools from './assets/Tools.png';
import Description from './assets/Description.png';
import Fish from './assets/Fish.jpg';
import Sudoku from './assets/Sudoku.png';

import { initializeParticles } from './components/Particles';
import typewriter from './components/Typewriter';
import NavPanel from './NavPanel';

const Projects = () => {
    const canvasRef = useRef(null);
    const titleMNTextRef = useRef(null);
    const titleLNTextRef = useRef(null);
    const [showProjects, setShowProjects] = useState(false);
    const [showDescriptionIndex, setShowDescriptionIndex] = useState(null);

    useEffect(() => {
        const cleanup = initializeParticles(canvasRef);

        typewriter(titleMNTextRef.current, 'My', 100, 0.5);
        typewriter(titleLNTextRef.current, 'Projects', 100, 1);

        const timer = setTimeout(() => {
            setShowProjects(true);
        }, 1000); // Wait for 1 second before showing the projects

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
                    }, index * 500); // Delay each card by 500 milliseconds
                }
            });
        }
    }, [showProjects]);

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
            </div>
            <div className="SpacerHeader"></div>

            {window.innerWidth > 600 && <div className='Spacer'></div>}
            <div className="ContentWindow">
                {/* Project #1, GPAID HKU Alpha */}
                <div className="ProjectCard">
                    <div
                        className={`ProjectCardContent ${showProjects ? 'show' : ''}`}
                        onClick={() => toggleDescription(0)}
                    >
                        <div className='ProjectCardTitle'>
                            GPAid HKU Alpha
                        </div>
                        <img className='ProjectImageHolder' src={GPAid} />
                        <div className={`ProjectDate ${isDescriptionShown(0) ? 'show' : ''}`}>
                            <img src={Calendar} />
                            <div>Jan 2023 - Mar 2023</div>
                        </div>
                        <div className="GitHubLink">
                            <img src={Github} />
                            <a href="https://github.com/DethCubeHax/GPAID-Alpha-HKU" rel="noopener noreferrer">
                                Project Source
                            </a>
                        </div>
                        <div className={`ProjectDate ${isDescriptionShown(0) ? 'show' : ''}`}>
                            <img src={Tools} />
                            <div>React, Node, Express, MongoDB</div>
                        </div>
                        <div className={`ProjectDate ${isDescriptionShown(0) ? 'show' : ''}`}>
                            <img src={Description} />
                            <div>Description: {descriptionText}</div>
                        </div>
                        <div className={descriptionClassName(0)}>
                            <div>A course selection app that suggests students courses to take based on the reviews of past course takers, as well as their grades.</div>
                            <div>Built using the MERN stack,with React for the front-end, Node.js and Express for the back-end, and MongoDB for the database.</div>
                        </div>
                    </div>
                </div>

                {/* Project #2 */}
                <div className="ProjectCard">
                    <div
                        className={`ProjectCardContent ${showProjects ? 'show' : ''}`}
                        onClick={() => toggleDescription(1)}
                    >
                        <div className='ProjectCardTitle'>
                            Robotic Fish, BREED
                        </div>
                        <img className='ProjectImageHolder' src={Fish} />
                        <div className={`ProjectDate ${isDescriptionShown(1) ? 'show' : ''}`}>
                            <img src={Calendar} />
                            <div>Jun 2022 - Present</div>
                        </div>
                        <div className="GitHubLink">
                            <img src={Github} />
                            <a href="https://github.com/DethCubeHax/GPAID-Alpha-HKU" rel="noopener noreferrer">
                                Project Source
                            </a>
                        </div>
                        <div className={`ProjectDate ${isDescriptionShown(1) ? 'show' : ''}`}>
                            <img src={Tools} />
                            <div>C++, ROS, Python, EasyEDA</div>
                        </div>
                        <div className={`ProjectDate ${isDescriptionShown(1) ? 'show' : ''}`}>
                            <img src={Description} />
                            <div>Description: {descriptionText}</div>
                        </div>
                        <div className={descriptionClassName(1)}>
                            <div>As the Embedded Systems Technical Lead of the Student Interest Group, <a href="https://innowings.engg.hku.hk/breed2022/">BREED HKU</a>, I worked alongside a team of talented engineers to develop our flagship robotic fish, holding the Guinness World Record for the fastest swimming fish in the world.</div>
                            <div>I developed the code for the fish's fins and the main motor. I also devised an algorithm to optimize the turning by using the quadrature encoder on the motor to analyse the tail fin position, and use it directly to turn the fish, greatly improving turning efficacy.</div>
                            <div>In addition, I optimized the electrical systems by developing robust, drop-in PCBs for the mainboard and the controller. Currently, I am focusing on migrating the system away to a Raspberry Pi based system for integration of advanced sensors using ROS.</div>
                        </div>
                    </div>
                </div>

                {/* Project #3 */}
                <div className="ProjectCard">
                    <div
                        className={`ProjectCardContent ${showProjects ? 'show' : ''}`}
                        onClick={() => toggleDescription(2)}
                    >
                        <div className='ProjectCardTitle'>
                            Sudoku Game
                        </div>
                        <img className='ProjectImageHolder' src={Sudoku} />
                        <div className={`ProjectDate ${isDescriptionShown(2) ? 'show' : ''}`}>
                            <img src={Calendar} />
                            <div>Dec 2022</div>
                        </div>
                        <div className="GitHubLink">
                            <img src={Github} />
                            <a href="https://github.com/DethCubeHax/ENGG1340-Project" rel="noopener noreferrer">
                                Project Source
                            </a>
                        </div>
                        <div className={`ProjectDate ${isDescriptionShown(2) ? 'show' : ''}`}>
                            <img src={Tools} />
                            <div>C++</div>
                        </div>
                        <div className={`ProjectDate ${isDescriptionShown(2) ? 'show' : ''}`}>
                            <img src={Description} />
                            <div>Description: {descriptionText}</div>
                        </div>
                        <div className={descriptionClassName(2)}>
                            <div>As part of a course project, I developed a sudoku game purely in C++.</div>
                            <div>It features the ability to find unique boards every single time, where the player plays against the computer.</div>
                            <div>Also features save and load options.</div>
                        </div>
                    </div>
                </div>
            </div>
            <canvas className="Particles" ref={canvasRef}></canvas>
            {window.innerWidth > 600 && <NavPanel />}
        </div>
    );
};

export default Projects;