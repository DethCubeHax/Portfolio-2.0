"use client";
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import projects from '../../public/projects.json';
import { FaGithub, FaImages } from 'react-icons/fa';

const TimelineItem = ({ item }) => {
  const [showImages, setShowImages] = useState(false);
  const [ProminentIcon, setProminentIcon] = useState(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const { [item.prominentStackIcon]: Icon } = await import('react-icons/fa');
        setProminentIcon(() => Icon);
      } catch (error) {
        console.error(`Icon ${item.prominentStackIcon} not found`, error);
      }
    };

    loadIcon();
  }, [item.prominentStackIcon]);

  return (
    <div className="flex gap-x-3 animate-fadeInDown" style={{ animationDelay: `${item.index * 0.1}s` }}>
      <div className="relative">
        <div className="relative z-10 flex flex-col items-center justify-center text-center" style={{ height: '4rem', width: '4rem' }}>
          {ProminentIcon ? <ProminentIcon className="text-4xl text-orange-500" /> : <div>Loading...</div>}
        </div>
        <div className="absolute inset-0 top-14 flex items-start justify-center">
          <div className="w-px h-full bg-gray-200 dark:bg-neutral-700"></div>
        </div>
      </div>
      <div className="grow pt-0.5 pb-8">
        <h3 className="font-semibold text-highlight text-2xl">{item.title}</h3>
        <span className="text-text text-lg">{item.date}</span>
        <p className="mt-2 text-gray-600 dark:text-neutral-200 text-justify">{item.description}</p>
        <div className="flex flex-wrap items-center gap-4 mt-2">
          <a
            href={item.gitHubLink}
            className="px-3 py-1 bg-white text-background font-semibold rounded-full hover:bg-highlight no-underline transition duration-300 flex items-center gap-x-1"
            target="_blank"
            rel="noopener noreferrer"
            style={{ whiteSpace: "nowrap" }}
          >
            <FaGithub className="text-xl" /> View on GitHub
          </a>
          <button
            className="px-3 py-1 bg-white text-background font-semibold rounded-full hover:bg-highlight no-underline transition duration-300 flex items-center gap-x-1"
            onClick={() => setShowImages(!showImages)}
            style={{ whiteSpace: "nowrap" }}
          >
            <FaImages className="text-xl" /> Show Images
          </button>
        </div>
        {showImages && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {item.screenshots.map((src, index) => (
              <img key={index} className="rounded-lg" src={src} alt={`Screenshot ${index + 1}`} />
            ))}
          </div>
        )}
        <div className="flex flex-wrap mt-4 gap-2">
          {item.tools.split(', ').map((tool, index) => (
            <span key={index} className="text-xs bg-lightblue text-background rounded-full px-2 py-1">
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <PageLayout title="My Projects">
      <div>
        {projects.map((project, idx) => (
          <TimelineItem key={idx} item={{ ...project, index: idx }} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Projects;
