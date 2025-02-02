import React from 'react';
import { Folder, FileText } from 'lucide-react';

interface FileIconProps {
  name: string;
  isDirectory: boolean;
}

export const FileIcon: React.FC<FileIconProps> = ({ name, isDirectory }) => {
  const getFileColor = () => {
    if (isDirectory) return 'text-blue-400';
    const ext = name.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'md': return 'text-yellow-400';
      case 'json': return 'text-green-400';
      case 'ts':
      case 'tsx': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`flex items-center gap-2 ${getFileColor()}`}>
      {isDirectory ? <Folder className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
      <span>{name}</span>
    </div>
  );
};