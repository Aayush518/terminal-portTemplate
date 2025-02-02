import React from 'react';
import { ProjectCard } from './ProjectCard';
import { Project } from '../data/projects';

interface ProjectsGridProps {
  projects: Project[];
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
  return (
    <div className="space-y-6 p-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-emerald-900/30">
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 mb-2">Featured Projects</h2>
          <p className="text-gray-400">Showcasing {projects.length} innovative solutions</p>
        </div>
      </div>
      
      <div className="space-y-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};