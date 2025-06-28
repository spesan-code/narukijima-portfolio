import React from 'react';
import type { Project } from '../types';
import { LinkIcon } from '../constants';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block bg-white rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <div className="relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center">
          {project.title}
          <LinkIcon className="w-4 h-4 ml-2 text-slate-400 group-hover:text-slate-700 transition-colors" />
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed">{project.description}</p>
      </div>
    </a>
  );
};

export default ProjectCard;
