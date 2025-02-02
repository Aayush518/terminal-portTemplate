import { useState, useCallback } from 'react';
import { FileSystem, FileSystemNode } from '../types/terminal';

const initialFileSystem: FileSystem = {
  root: {
    home: {
      type: 'directory',
      name: 'home',
      children: {
        about: {
          type: 'file',
          name: 'about.md',
          content: `# About Me\n\n## Professional Summary...`,
        },
        projects: {
          type: 'directory',
          name: 'projects',
          children: {
            quantum: {
              type: 'file',
              name: 'quantum.md',
              content: `# Quantum Computing Simulator...`,
            },
            neural: {
              type: 'file',
              name: 'neural.md',
              content: `# Neural Architecture Search...`,
            },
          },
        },
      },
    },
  },
  currentPath: ['home'],
};

export const useFileSystem = () => {
  const [fs, setFs] = useState<FileSystem>(initialFileSystem);

  const getCurrentDirectory = useCallback(() => {
    let current: { [key: string]: FileSystemNode } = fs.root;
    for (const segment of fs.currentPath) {
      current = current[segment].children || {};
    }
    return current;
  }, [fs]);

  const getFile = useCallback((path: string): FileSystemNode | null => {
    const segments = path.split('/').filter(Boolean);
    let current: { [key: string]: FileSystemNode } = fs.root;
    
    for (const segment of segments.slice(0, -1)) {
      if (!current[segment] || current[segment].type !== 'directory') {
        return null;
      }
      current = current[segment].children || {};
    }
    
    const fileName = segments[segments.length - 1];
    return current[fileName] || null;
  }, [fs]);

  const changeDirectory = useCallback((path: string) => {
    const segments = path.split('/').filter(Boolean);
    let current: { [key: string]: FileSystemNode } = fs.root;
    const newPath: string[] = [...fs.currentPath];

    for (const segment of segments) {
      if (segment === '..') {
        if (newPath.length > 0) {
          newPath.pop();
        }
      } else if (segment === '.') {
        continue;
      } else if (segment === '~') {
        newPath.length = 0;
        newPath.push('home');
      } else {
        const nextDir = current[segment];
        if (!nextDir || nextDir.type !== 'directory') {
          throw new Error(`Directory not found: ${segment}`);
        }
        newPath.push(segment);
        current = nextDir.children || {};
      }
    }

    setFs(prev => ({
      ...prev,
      currentPath: newPath,
    }));
  }, [fs]);

  const getAutocompleteSuggestions = useCallback((partial: string): string[] => {
    const currentDir = getCurrentDirectory();
    const suggestions = Object.keys(currentDir).filter(name => 
      name.toLowerCase().startsWith(partial.toLowerCase())
    );
    return suggestions;
  }, [getCurrentDirectory]);

  return {
    fs,
    getCurrentDirectory,
    getFile,
    changeDirectory,
    getAutocompleteSuggestions,
    currentPath: '/' + fs.currentPath.join('/'),
  };
};