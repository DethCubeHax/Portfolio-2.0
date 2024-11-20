"use client"
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import workExperiences from '../../public/work.json';
import { FaImages } from 'react-icons/fa';

const WorkExperienceItem = ({ item }) => {
  const [showImages, setShowImages] = useState(false);

  return (
    <div className="flex gap-x-3 animate-fadeInDown" style={{ animationDelay: `${item.index * 0.1}s` }}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-full bg-gray-200 dark:bg-neutral-700"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center" style={{ height: '4rem', width: '4rem', backgroundColor: 'inherit' }}>
          <img src={`/${item.image}`} alt={item.company.name} className="h-full w-full object-contain" />
        </div>
      </div>
      <div className="grow pt-0.5 pb-8">
        <h3 className="font-semibold text-highlight text-2xl">{item.company.name}</h3>
        <span className="text-text text-lg block">{item.title}</span>
        <span className="text-xs font-medium uppercase text-text mt-1 block">{item.date}</span>
        <ul className="mt-2 text-gray-600 dark:text-neutral-400 list-disc list-inside">
          {item.description.map((desc, index) => (
            <li key={index}>{desc}</li>
          ))}
        </ul>
        <div className="flex items-center gap-x-4 mt-2">
          <button className="flex items-center gap-x-1 text-blue-500 hover:underline" onClick={() => setShowImages(!showImages)}>
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

const WorkExperiences = () => {
  return (
    <PageLayout title="Work Experiences">
      <div>
        {workExperiences.map((experience, idx) => (
          <WorkExperienceItem key={idx} item={{ ...experience, index: idx }} />
        ))}
      </div>
    </PageLayout>
  );
};

export default WorkExperiences;
