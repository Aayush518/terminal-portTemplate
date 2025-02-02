import React, { useState } from 'react';
import { Code2, Globe, ChevronDown, ChevronUp, ExternalLink, Star, Clock, Tag } from 'lucide-react';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative group">
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 via-blue-500 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
      
      {/* Main card */}
      <div className="relative bg-gray-900/90 rounded-lg p-6 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                {project.title}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Tag className="w-3 h-3" />
              <span>{project.category}</span>
              <span className="mx-2">•</span>
              <Clock className="w-3 h-3" />
              <span>Featured Project</span>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-emerald-900/30 rounded-lg transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-emerald-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-emerald-400" />
            )}
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-300 leading-relaxed">
            {isExpanded ? project.description : `${project.description.slice(0, 150)}...`}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-full bg-emerald-900/30 text-emerald-400 border border-emerald-900/50 hover:border-emerald-500/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>

          {isExpanded && (
            <div className="mt-6 space-y-6 border-t border-emerald-900/30 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h4 className="text-emerald-400 font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    Challenge
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{project.details.challenge}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-emerald-400 font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Solution
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{project.details.solution}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-emerald-400 font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    Impact
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{project.details.impact}</p>
                </div>
              </div>

              {project.images && project.images.length > 0 && (
                <div className="mt-6">
                  <div className="aspect-video rounded-lg overflow-hidden border border-emerald-900/30">
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-center justify-end gap-4 mt-4">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                <span>Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-900/30 text-emerald-400 hover:bg-emerald-900/50 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span>Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};