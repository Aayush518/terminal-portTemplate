import React from 'react';

interface WhoAmIOutputProps {
  content: string;
}

export const WhoAmIOutput: React.FC<WhoAmIOutputProps> = ({ content }) => {
  return (
    <div className="bg-gray-900/50 rounded-lg p-6 border border-emerald-900/30 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
              <span>👤</span>
              {content.split('\n')[1].trim()}
            </h3>
            <p className="text-emerald-500">{content.split('\n')[3].trim()}</p>
            <p className="text-gray-400">{content.split('\n')[4].trim()}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
              <span>🎯</span>
              Interests
            </h4>
            <ul className="list-none space-y-1">
              {content.split('🎯 Interests:\n')[1].split('\n\n')[0].split('\n').map((interest, i) => (
                <li key={i} className="text-gray-300">{interest.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
              <span>🎓</span>
              Education
            </h4>
            <p className="text-gray-300">{content.split('🎓 Education:\n')[1].split('\n\n')[0].trim()}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
              <span>🌐</span>
              Languages
            </h4>
            <ul className="list-none space-y-1">
              {content.split('🌐 Languages:\n')[1].split('\n\n')[0].split('\n').map((lang, i) => (
                <li key={i} className="text-gray-300">{lang.trim()}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-emerald-400 flex items-center gap-2">
              <span>🎨</span>
              Hobbies
            </h4>
            <ul className="list-none space-y-1">
              {content.split('🎨 Hobbies:\n')[1].split('\n').map((hobby, i) => (
                <li key={i} className="text-gray-300">{hobby.trim()}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};