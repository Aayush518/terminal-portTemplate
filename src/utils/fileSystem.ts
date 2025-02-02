// Singleton instance of the file system
const fileSystem = {
  root: {
    home: {
      type: 'directory' as const,
      name: 'home',
      children: {
        portfolio: {
          type: 'directory' as const,
          name: 'portfolio',
          children: {
            about: {
              type: 'file' as const,
              name: 'about.md',
              content: `# About Me

## Professional Summary
Senior Software Engineer with expertise in distributed systems and cloud architecture.

## Skills
- Languages: TypeScript, Go, Rust, Python
- Frontend: React, Vue.js, WebGL
- Backend: Node.js, gRPC, GraphQL
- Cloud: AWS, GCP, Kubernetes
- AI/ML: TensorFlow, PyTorch

## Experience
- Principal Engineer @ TechCorp (2020-Present)
- Senior Developer @ InnovateLabs (2018-2020)
- Software Engineer @ StartupX (2016-2018)`,
            },
            projects: {
              type: 'directory' as const,
              name: 'projects',
              children: {
                quantum: {
                  type: 'file' as const,
                  name: 'quantum.md',
                  content: `# Quantum Computing Simulator
- Developed a quantum circuit simulator in Rust
- 50k+ monthly active users
- Featured in Quantum Computing Digest
- github.com/username/quantum-sim`,
                },
                neural: {
                  type: 'file' as const,
                  name: 'neural.md',
                  content: `# Neural Architecture Search
- Automated ML model optimization
- Published in ICML 2023
- Used by research institutions
- github.com/username/neural-arch`,
                },
              },
            },
            contact: {
              type: 'file' as const,
              name: 'contact.json',
              content: JSON.stringify({
                email: 'your.email@example.com',
                github: 'github.com/username',
                linkedin: 'linkedin.com/in/username',
                twitter: '@username',
                blog: 'blog.example.com',
              }, null, 2),
            },
          },
        },
      },
    },
  },
  currentPath: ['home', 'portfolio'],
};

export const getCurrentDirectory = () => {
  let current = fileSystem.root;
  for (const segment of fileSystem.currentPath) {
    if (!current[segment] || current[segment].type !== 'directory') {
      throw new Error(`Invalid path segment: ${segment}`);
    }
    current = current[segment].children || {};
  }
  return current;
};

export const getFile = (path: string) => {
  if (path.startsWith('/')) {
    path = path.slice(1);
  }
  const segments = path.split('/').filter(Boolean);
  let current = fileSystem.root;
  
  for (const segment of segments.slice(0, -1)) {
    if (!current[segment] || current[segment].type !== 'directory') {
      return null;
    }
    current = current[segment].children || {};
  }
  
  const fileName = segments[segments.length - 1];
  return current[fileName] || null;
};

export const changeDirectory = (path: string) => {
  if (path === '~') {
    fileSystem.currentPath = ['home', 'portfolio'];
    return;
  }

  const segments = path.split('/').filter(Boolean);
  let current = fileSystem.root;
  const newPath = [...fileSystem.currentPath];

  for (const segment of segments) {
    if (segment === '..') {
      if (newPath.length > 2) { // Don't go above ~/portfolio
        newPath.pop();
      }
    } else if (segment === '.') {
      continue;
    } else {
      const currentDir = getCurrentDirectory();
      if (!currentDir[segment] || currentDir[segment].type !== 'directory') {
        throw new Error(`Directory not found: ${segment}`);
      }
      newPath.push(segment);
      current = currentDir[segment].children || {};
    }
  }

  fileSystem.currentPath = newPath;
};

export const getCurrentPath = () => {
  return '~/' + fileSystem.currentPath.slice(2).join('/');
};

export const getAutocompleteSuggestions = (partial: string): string[] => {
  const currentDir = getCurrentDirectory();
  return Object.keys(currentDir).filter(name => 
    name.toLowerCase().startsWith(partial.toLowerCase())
  );
};

export const getFileSystem = () => fileSystem;