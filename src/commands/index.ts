import { CommandRegistry } from '../types/terminal';
import { helpCommand } from './help';
import { catCommand } from './cat';
import { lsCommand } from './ls';
import { cdCommand } from './cd';
import { clearCommand } from './clear';
import { neofetchCommand } from './neofetch';
import { projectsCommand } from './projects';
import { contactCommand } from './contact';
import { skillsCommand } from './skills';
import { experienceCommand } from './experience';
import { whoamiCommand } from './whoami';
import { themeCommand } from './theme';
import { systemCommand } from './system';
import { matrixCommand } from './matrix';

export const commands: CommandRegistry = {
  help: helpCommand,
  cat: catCommand,
  ls: lsCommand,
  cd: cdCommand,
  clear: clearCommand,
  neofetch: neofetchCommand,
  projects: projectsCommand,
  contact: contactCommand,
  skills: skillsCommand,
  experience: experienceCommand,
  whoami: whoamiCommand,
  theme: themeCommand,
  system: systemCommand,
  matrix: matrixCommand,
};