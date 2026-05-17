export interface Project {
  id: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  longDescription: string;
  longDescriptionHi: string;
  tags: string[];
  category: string;
  status: string;
  image: string;
  screenshots: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 'lead-nirvana',
    title: 'LeadNirvana',
    titleHi: 'लीड निर्वाण',
    description: 'AI-Powered Sales Execution Engine for high-ticket B2B businesses.',
    descriptionHi: 'हाई-टिकट B2B बिज़नेस के लिए AI-संचालित सेल्स एग्जेक्यूशन इंजन।',
    longDescription: 'Founder & Lead Engineer. Converts paid leads into revenue by automating qualification, follow-ups, and sales escalations for businesses spending ₹50K–₹10L/month on Meta ads. Features <5s instant response, AI qualification & lead scoring, multi-step sequences, omnichannel inbox, and ad-to-revenue attribution. Targets Real Estate, EdTech, B2B SaaS verticals — designed to improve conversion rates from 2–5% to 5–10%.',
    longDescriptionHi: 'फाउंडर और लीड इंजीनियर। मेटा एड्स पर ₹50K–₹10L/माह खर्च करने वाले बिज़नेस के लिए पेड लीड्स को रेवेन्यू में बदलता है। <5s इंस्टेंट रिस्पॉन्स, AI क्वालिफिकेशन और ऑमनीचैनल इनबॉक्स।',
    tags: ['NestJS', 'PostgreSQL', 'Redis', 'BullMQ', 'OpenAI', 'Claude AI', 'WhatsApp API', 'WebSocket'],
    category: 'ai',
    status: 'Building',
    image: '/images/leadnirvana.png',
    screenshots: ['/images/leadnirvana.png'],
    liveUrl: 'https://leadnirvana.netlify.app/',
    featured: true,
  },
  {
    id: 'layout365',
    title: 'Layout-365',
    titleHi: 'लेआउट-365',
    description: 'AI-Powered Media Suite — comprehensive print media platform for newsroom operations.',
    descriptionHi: 'AI-संचालित मीडिया सूट — न्यूज़रूम के लिए व्यापक प्रिंट मीडिया प्लेटफॉर्म।',
    longDescription: 'Led full-stack development for comprehensive print media platform unifying editorial, advertising, publishing, and CRM. AI features: OCR text extraction, DALL-E image generation, auto ad placement. Real-time WebSocket collaboration with conflict resolution for simultaneous multi-user editing. Reduced initial bundle size by 60% via lazy loading. Optimized 10,000+ row tables with virtual scrolling.',
    longDescriptionHi: 'संपादकीय, विज्ञापन, प्रकाशन और CRM को एकीकृत करने वाले मीडिया प्लेटफॉर्म का नेतृत्व किया। OCR, DALL-E, रियल-टाइम कोलैबोरेशन। बंडल साइज़ 60% कम किया।',
    tags: ['Angular', 'Node.js', 'TypeScript', 'WebSocket', 'Python', 'DALL-E', 'PrimeNG', 'PostgreSQL'],
    category: 'fullstack',
    status: 'Live',
    image: '/images/layout365.png',
    screenshots: ['/images/layout365.png'],
    liveUrl: 'https://www.layout-365.com/#/',
    featured: true,
  },
  {
    id: 'realtime-collab',
    title: 'Page Making Collaboration (CPM)',
    titleHi: 'रियल-टाइम कोलैबोरेशन (CPM)',
    description: 'WebSocket system handling 100+ concurrent users with Redis pub/sub for newsroom design cycles.',
    descriptionHi: 'Redis pub/sub के साथ 100+ समवर्ती यूज़र्स को संभालने वाला WebSocket सिस्टम।',
    longDescription: 'Built at Digital Navigation — WebSocket system with Redis pub/sub handling 100+ concurrent users. Reduced design cycles by 40% for newsroom operations. Implemented conflict resolution, live cursor tracking, and role-based edit permissions.',
    longDescriptionHi: 'डिजिटल नेविगेशन में बनाया — 100+ समवर्ती यूज़र्स के साथ WebSocket सिस्टम। डिज़ाइन साइकिल 40% कम की।',
    tags: ['Node.js', 'WebSocket', 'Redis', 'Angular', 'PostgreSQL'],
    category: 'backend',
    status: 'Live',
    image: '/images/cpm.png',
    screenshots: ['/images/cpm.png'],
    liveUrl: 'https://cpmstage2.bhaskarmatrix.com/',
  },
  {
    id: 'osms',
    title: 'Online Service Management System',
    titleHi: 'ऑनलाइन सर्विस मैनेजमेंट सिस्टम',
    description: 'Customer service platform with ticketing, tracking, and admin dashboards improving efficiency by 30%.',
    descriptionHi: 'टिकटिंग, ट्रैकिंग और एडमिन डैशबोर्ड के साथ कस्टमर सर्विस एफिशिएंसी 30% सुधरी।',
    longDescription: 'Built at Arudan Technology. Improved customer service efficiency by 30% with complete ticketing system, service tracking, and admin dashboards with analytics. Full auth system with role-based access.',
    longDescriptionHi: 'अरुदान टेक्नोलॉजी में बनाया। कस्टमर सर्विस एफिशिएंसी 30% सुधरी। टिकटिंग, ट्रैकिंग और एडमिन डैशबोर्ड।',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    category: 'fullstack',
    status: 'Completed',
    image: '/images/osms.png',
    screenshots: ['/images/osms.png'],
    liveUrl: 'https://geekyshows.com/course/online-ser/',
  },
  {
    id: 'portfolio',
    title: 'Personal Portfolio',
    titleHi: 'पर्सनल पोर्टफोलियो',
    description: 'This site — React + TypeScript + Three.js + GSAP. Bilingual EN/HI, light theme.',
    descriptionHi: 'यह पोर्टफोलियो — React + Three.js + GSAP। EN/HI द्विभाषी, लाइट थीम।',
    longDescription: 'Designed and built from scratch: React + TypeScript + Vite + Tailwind CSS. Three.js particle background, GSAP animations, bilingual language toggle (English/Hindi), fully responsive mobile-first design, and curvy photo cutouts.',
    longDescriptionHi: 'React + TypeScript + Vite + Tailwind CSS के साथ स्क्रैच से डिज़ाइन। Three.js पार्टिकल, GSAP एनिमेशन, द्विभाषी।',
    tags: ['React', 'TypeScript', 'Three.js', 'GSAP', 'Tailwind CSS', 'Vite'],
    category: 'frontend',
    status: 'Live',
    image: '/images/abhishek-formal.png',
    screenshots: ['/images/abhishek-formal.png'],
    liveUrl: '#',
    githubUrl: 'https://github.com/abhihashcode/',
  },
];

export const projectCategories = ['all', 'fullstack', 'ai', 'backend', 'frontend'];
