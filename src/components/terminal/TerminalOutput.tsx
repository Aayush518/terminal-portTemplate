import React from 'react';
import { ChevronRight } from 'lucide-react';
import { TerminalHistory } from '../../types/terminal';
import { FileIcon } from './FileIcon';
import { WhoAmIOutput } from './outputs/WhoAmIOutput';
import { ProjectsGrid } from '../ProjectsGrid';
import { Project } from '../../data/projects';

interface TerminalOutputProps {
  entry: TerminalHistory;
}

export const TerminalOutput: React.FC<TerminalOutputProps> = ({ entry }) => {
  const getOutputClassName = () => {
    switch (entry.type) {
      case 'error':
        return 'text-red-400 font-medium';
      case 'system':
        return 'text-blue-400 font-medium';
      case 'command':
        return 'text-purple-400 font-medium';
      default:
        return 'text-emerald-400 font-medium';
    }
  };

  const formatOutput = (content: string) => {
    if (entry.type === 'output') {
      // Handle ls command output
      if (content.includes('[0m')) {
        const files = content.split('  ').filter(Boolean);
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file, index) => {
              const isDirectory = file.includes('[1;34m');
              const name = file.replace(/\[\d+;?\d*m/g, '').replace('[0m', '');
              return (
                <FileIcon key={index} name={name} isDirectory={isDirectory} />
              );
            })}
          </div>
        );
      }
      
      // Handle help command output with special formatting
      if (content.includes('╭─') && content.includes('╰─')) {
        return (
          <div className="font-mono whitespace-pre rounded-lg bg-black/20 p-4 backdrop-blur-sm">
            {content}
          </div>
        );
      }
      
      // Handle whoami command output
      if (content.includes('👤')) {
        return <WhoAmIOutput content={content} />;
      }
      
      // Handle projects command output
      try {
        const data = JSON.parse(content);
        if (Array.isArray(data) && data.length > 0 && 'title' in data[0]) {
          return <ProjectsGrid projects={data as Project[]} />;
        }
      } catch (e) {
        // Not JSON or not projects data
      }
    }
    return content;
  };

  return (
    <div className={`${getOutputClassName()} leading-relaxed break-words`}>
      {entry.type === 'command' ? (
        <div className="flex items-center gap-2">
          <span className="text-blue-400">λ</span>
          <span className="text-emerald-500 font-bold">~/portfolio</span>
          <ChevronRight className="w-4 h-4 text-purple-400" />
          <span>{entry.content}</span>
        </div>
      ) : (
        formatOutput(entry.content)
      )}
    </div>
  );
};