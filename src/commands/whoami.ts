import { Command } from '../types/terminal';

const userInfo = {
  name: "Aayush Adhikari",
  role: "Full Stack Developer & NLP Engineer",
  location: "Pokhara, Nepal",
  interests: [
    "Web Development",
    "Natural Language Processing",
    "Speech Technology",
    "Machine Learning"
  ],
  education: "Bachelor's in Computer Engineering",
  languages: ["English", "Nepali", "Hindi"],
  hobbies: ["Coding", "Reading", "Music", "Photography"]
};

export const whoamiCommand: Command = {
  name: 'whoami',
  description: 'Display user information',
  usage: 'whoami',
  execute: () => {
    return `
👤 ${userInfo.name}
${'-'.repeat(userInfo.name.length + 2)}
🚀 ${userInfo.role}
📍 ${userInfo.location}

🎯 Interests:
${userInfo.interests.map(interest => `  • ${interest}`).join('\n')}

🎓 Education:
  • ${userInfo.education}

🌐 Languages:
${userInfo.languages.map(lang => `  • ${lang}`).join('\n')}

🎨 Hobbies:
${userInfo.hobbies.map(hobby => `  • ${hobby}`).join('\n')}
`;
  },
};