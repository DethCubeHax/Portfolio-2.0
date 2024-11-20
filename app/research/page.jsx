"use client"
import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import researchProjects from '../../public/research.json';

const ResearchProjectItem = ({ item }) => {
  return (
    <div className="flex gap-x-3 animate-fadeInDown" style={{ animationDelay: `${item.index * 0.1}s` }}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-full bg-gray-200 dark:bg-neutral-700"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center" style={{ height: '4rem', width: '4rem' }}>
          <img src={`/${item.image}`} alt="Conference Icon" className="h-full w-full object-contain bg-background" />
        </div>
      </div>
      <div className="grow pt-0.5 pb-8">
        <h3 className="font-semibold text-highlight text-2xl">{item.title}</h3>
        <span className="text-text text-lg block">{item.conference}</span>
        <span className="text-xs font-medium uppercase text-text mt-1 block">{item.date}</span>
        <p className="mt-2 text-gray-600 dark:text-neutral-400">{item.description}</p>
        <div className="flex items-center gap-x-4 mt-2">
          <a
            href={item.links[0].url}
            className="px-3 py-1 bg-white text-background font-semibold rounded-full hover:bg-highlight no-underline transition duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read My Publication
          </a>
        </div>
        <div className="flex mt-4 space-x-2">
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

const Research = () => {
  return (
    <PageLayout title="My Research">
      <div>
        {researchProjects.projects.map((project, idx) => (
          <ResearchProjectItem key={idx} item={{ ...project, index: idx }} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Research;
