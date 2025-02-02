import { Command } from '../types/terminal';
import { projects } from '../data/projects';

export const projectsCommand: Command = {
  name: 'projects',
  description: 'List portfolio projects',
  usage: 'projects',
  execute: () => {
    return JSON.stringify(projects);
  },
};