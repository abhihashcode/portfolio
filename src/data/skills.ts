export interface SkillCategory {
  id: string;
  label: string;
  labelHi: string;
  skills: { name: string; level: number }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    label: 'Backend',
    labelHi: 'बैकएंड',
    skills: [
      { name: 'Node.js (NestJS / Express)', level: 90 },
      { name: 'Python', level: 75 },
      { name: 'PHP', level: 65 },
      { name: 'REST APIs / WebSocket', level: 92 },
      { name: 'BullMQ / Kafka', level: 75 },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    labelHi: 'फ्रंटएंड',
    skills: [
      { name: 'Angular + NgRx + RxJS', level: 88 },
      { name: 'React / Next.js', level: 80 },
      { name: 'TypeScript / JavaScript', level: 90 },
      { name: 'PrimeNG / Material UI', level: 82 },
      { name: 'Three.js / GSAP', level: 68 },
    ],
  },
  {
    id: 'database',
    label: 'Database',
    labelHi: 'डेटाबेस',
    skills: [
      { name: 'PostgreSQL', level: 88 },
      { name: 'MongoDB', level: 75 },
      { name: 'MySQL', level: 80 },
      { name: 'Redis', level: 82 },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Cloud',
    labelHi: 'DevOps और क्लाउड',
    skills: [
      { name: 'AWS (EC2, S3, Lambda)', level: 75 },
      { name: 'Docker / Kubernetes', level: 72 },
      { name: 'GitHub Actions / Jenkins', level: 78 },
      { name: 'Nginx / PM2', level: 80 },
      { name: 'Prometheus / Grafana', level: 68 },
    ],
  },
  {
    id: 'ai',
    label: 'AI / ML',
    labelHi: 'AI / ML',
    skills: [
      { name: 'OpenAI API', level: 82 },
      { name: 'Claude AI', level: 80 },
      { name: 'LangChain', level: 72 },
      { name: 'Conversational AI', level: 78 },
    ],
  },
];

export interface Service {
  id: string;
  icon: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
}

export const services: Service[] = [
  {
    id: 'backend',
    icon: 'Server',
    title: 'Backend Engineering',
    titleHi: 'बैकएंड इंजीनियरिंग',
    description: 'Scalable APIs, microservices, real-time systems with Node.js / NestJS.',
    descriptionHi: 'Node.js / NestJS के साथ स्केलेबल APIs, माइक्रोसर्विस, रियल-टाइम सिस्टम।',
  },
  {
    id: 'fullstack',
    icon: 'Layout',
    title: 'Full-Stack Web Apps',
    titleHi: 'फुल-स्टैक वेब ऐप्स',
    description: 'End-to-end web applications — Angular/React frontend + Node.js backend.',
    descriptionHi: 'Angular/React फ्रंटएंड + Node.js बैकएंड के साथ एंड-टू-एंड वेब एप्लीकेशन।',
  },
  {
    id: 'ai',
    icon: 'Brain',
    title: 'AI Integration',
    titleHi: 'AI इंटीग्रेशन',
    description: 'OpenAI, Claude AI, LangChain integrations into production applications.',
    descriptionHi: 'प्रोडक्शन एप्लीकेशन में OpenAI, Claude AI, LangChain इंटीग्रेशन।',
  },
  {
    id: 'devops',
    icon: 'CloudCog',
    title: 'DevOps & Deployment',
    titleHi: 'DevOps और डिप्लॉयमेंट',
    description: 'CI/CD pipelines, Kubernetes, AWS, VPS management and monitoring.',
    descriptionHi: 'CI/CD पाइपलाइन, Kubernetes, AWS, VPS मैनेजमेंट और मॉनिटरिंग।',
  },
  {
    id: 'performance',
    icon: 'Zap',
    title: 'Performance Optimization',
    titleHi: 'परफॉर्मेंस ऑप्टिमाइजेशन',
    description: 'DB query optimization, caching strategies, bundle size reduction.',
    descriptionHi: 'DB क्वेरी ऑप्टिमाइजेशन, कैशिंग स्ट्रैटेजी, बंडल साइज़ रिडक्शन।',
  },
  {
    id: 'leadership',
    icon: 'Users',
    title: 'Tech Leadership',
    titleHi: 'टेक लीडरशिप',
    description: 'Team mentoring, code reviews, Git workflows, system design (HLD/LLD).',
    descriptionHi: 'टीम मेंटरिंग, कोड रिव्यू, Git वर्कफ्लो, सिस्टम डिज़ाइन।',
  },
];
