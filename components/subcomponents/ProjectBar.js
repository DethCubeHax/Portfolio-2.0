import React from 'react';
import { FaFileCode, FaDatabase, FaCloud } from 'react-icons/fa';

const ProjectBar = ({ project }) => {
  return (
    <div className="relative w-16 h-full bg-gray-700 rounded-lg shadow-md cursor-pointer hover:bg-gray-600">
      <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-white">
          <FaFileCode className="text-2xl" />
          <p className="text-sm">{project.year}</p>
          <p className="text-xs">{project.stacks.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectBar;
