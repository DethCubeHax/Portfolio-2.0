"use client"
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/PageLayout';
import projects from '../../public/projects.json';
import { FaGithub, FaImages } from 'react-icons/fa';

const TimelineItem = ({ item }) => {
  const [showImages, setShowImages] = useState(false);
  const [ProminentIcon, setProminentIcon] = useState(null);

  useEffect(() => {
    // Function to dynamically import the icon
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
    <div
      className={`flex gap-x-3 animate-fadeInDown`}
      style={{ animationDelay: `${item.index * 0.1}s` }}
    >
      <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700">
        <div className="relative z-10 size-7 flex justify-center items-center">
          {ProminentIcon ? <ProminentIcon className="text-4xl text-orange-500" /> : <div>Loading...</div>}
        </div>
      </div>
      <div className="grow pt-0.5 pb-8">
        <h3 className="flex gap-x-1.5 font-semibold text-highlight text-2xl">
          {item.title}
        </h3>
        <span className="text-text text-lg">
          {item.date}
        </span>
        <p className="mt-2 text-gray-600 dark:text-neutral-400">
          {item.description}
        </p>
        <div className="flex items-center gap-x-4">
          <a href={item.gitHubLink} className="flex items-center gap-x-1 text-blue-500 hover:underline">
            <FaGithub className="text-xl" /> View on GitHub
          </a>
          <button
            className="flex items-center gap-x-1 text-blue-500 hover:underline"
            onClick={() => setShowImages(!showImages)}
          >
            <FaImages className="text-xl" /> Show Images
          </button>
        </div>
        {showImages && (
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {item.screenshots.map((src, index) => (
              <img key={index} className="rounded-lg" src={src} alt={`Screenshot ${index + 1}`} />
            ))}
          </div>
        )}
        <div className="flex mt-2 space-x-2">
          {item.tools.split(', ').map((tool, index) => (
            <span key={index} className="text-xs bg-white text-background rounded-full px-2 py-1">
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
