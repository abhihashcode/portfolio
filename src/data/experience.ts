export interface TimelineItem {
  id: string;
  type: 'work' | 'education';
  period: string;
  periodHi: string;
  title: string;
  titleHi: string;
  organization: string;
  organizationHi: string;
  location?: string;
  description: string;
  descriptionHi: string;
  tags?: string[];
  cgpa?: string;
  marks?: string;
  grade?: string;
  current?: boolean;
  skills?: { name: string; level: number }[];
}

export const timeline: TimelineItem[] = [
  {
    id: 'petco',
    current: true,
    type: 'work',
    period: 'May 2026 — Present',
    periodHi: 'मई 2026 — अभी',
    title: 'Full Stack Engineer',
    titleHi: 'फुल स्टैक इंजीनियर',
    organization: 'Petco',
    organizationHi: 'पेटको',
    location: 'Remote, India',
    description: 'Building and maintaining full-stack features for Petco\'s e-commerce platform using TypeScript, React, Next.js, and Python (FastAPI/Django) with PostgreSQL, GraphQL, and REST APIs. Architecting serverless solutions on AWS Lambda, S3, API Gateway, and SQS/SNS while handling real-time data streaming via Apache Kafka. Contributing to CI/CD pipelines, Docker-based deployments, and Agile sprints in collaboration with US-based teams. Ensuring ARIA accessibility compliance and maintaining test coverage with React Testing Library and Pytest.',
    descriptionHi: 'TypeScript, React, Next.js, Python, FastAPI/Django, PostgreSQL, GraphQL के साथ फुल-स्टैक इंजीनियरिंग। AWS Lambda, S3, Apache Kafka। CI/CD, Docker, ARIA, RTL, Pytest।',
    tags: ['TypeScript', 'React', 'Next.js', 'Python', 'FastAPI', 'PostgreSQL', 'GraphQL', 'AWS Lambda', 'Kafka', 'Docker'],
  },
  {
    id: 'bonami',
    type: 'work',
    period: 'March 2026 — May 2026',
    periodHi: 'मार्च 2026 — मई 2026',
    title: 'Software Developer',
    titleHi: 'सॉफ्टवेयर डेवलपर',
    organization: 'Bonami Software Pvt Ltd',
    organizationHi: 'बोनामी सॉफ्टवेयर प्रा. लि.',
    location: 'Noida, India',
    description: 'Worked on healthcare/medical domain projects with a focus on resolving production issues and improving application stability. Was on Bench — collaborating with internal teams and actively participating in client interviews and onboarding processes.',
    descriptionHi: 'हेल्थकेयर/मेडिकल डोमेन प्रोजेक्ट पर काम, प्रोडक्शन इशू रिज़ॉल्व करना और एप्लीकेशन स्थिरता सुधारना। इंटरनल टीम के साथ कोलैबोरेशन और क्लाइंट इंटरव्यू में भागीदारी।',
    tags: ['Healthcare Domain', 'Production Support', 'Application Stability'],
  },
  {
    id: 'digital-nav',
    type: 'work',
    period: 'Mar 2023 — Feb 2026',
    periodHi: 'मार्च 2023 — फरवरी 2026',
    title: 'Software Engineer',
    titleHi: 'सॉफ्टवेयर इंजीनियर',
    organization: 'Digital Navigation Pvt Ltd',
    organizationHi: 'डिजिटल नेविगेशन प्रा. लि.',
    description: 'Led full-stack development for enterprise media & advertising platforms (500+ daily users). Architected WebSocket system with Redis pub/sub for 100+ concurrent users — reduced design cycles by 40%. Reduced DB query times from 3s → 200ms via indexing & caching. Cut production bugs by 60% via CI/CD pipelines and code reviews. Managed VPS deployments with zero-downtime releases.',
    descriptionHi: '500+ दैनिक यूज़र्स वाले एंटरप्राइज़ मीडिया प्लेटफॉर्म के लिए फुल-स्टैक डेवलपमेंट। WebSocket + Redis pub/sub सिस्टम। DB क्वेरी टाइम 3s से 200ms किया। प्रोडक्शन बग्स 60% कम किए।',
    tags: ['Node.js', 'Angular', 'WebSocket', 'PostgreSQL', 'Redis', 'AWS', 'Docker', 'GitHub Actions'],
  },
  {
    id: 'arudan',
    type: 'work',
    period: 'Jan 2021 — Jul 2021',
    periodHi: 'जन 2021 — जुल 2021',
    title: 'Web Developer',
    titleHi: 'वेब डेवलपर',
    organization: 'Arudan Technology',
    organizationHi: 'अरुदान टेक्नोलॉजी',
    description: 'Built Online Service Management System improving customer service efficiency by 30% with ticketing, tracking, and admin dashboards.',
    descriptionHi: 'ऑनलाइन सर्विस मैनेजमेंट सिस्टम — कस्टमर सर्विस एफिशिएंसी 30% सुधरी।',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
  },
  {
    id: 'mca',
    type: 'education',
    period: '2021 — 2023',
    periodHi: '2021 — 2023',
    title: 'Master of Computer Applications (MCA)',
    titleHi: 'मास्टर ऑफ कंप्यूटर एप्लीकेशन (MCA)',
    organization: 'Abdul Kalam Technical University (AKTU)',
    organizationHi: 'अब्दुल कलाम टेक्निकल यूनिवर्सिटी (AKTU)',
    description: 'Specialization in Computer Science & Application Development.',
    descriptionHi: 'कंप्यूटर साइंस और एप्लीकेशन डेवलपमेंट में विशेषज्ञता।',
    cgpa: '8.43 / 10',
    marks: '80.5%',
    grade: 'First Class with Distinction',
  },
  {
    id: 'bca',
    type: 'education',
    period: '2018 — 2021',
    periodHi: '2018 — 2021',
    title: 'Bachelor of Computer Applications (BCA)',
    titleHi: 'बैचलर ऑफ कंप्यूटर एप्लीकेशन (BCA)',
    organization: 'Mahatma Gandhi Kashi Vidyapith University, Varanasi, Uttar Pradesh',
    organizationHi: 'महात्मा गांधी काशी विद्यापीठ, वराणसी, उत्तर प्रदेश',
    description: 'Core CS fundamentals, Web Development, DBMS, and Data Structures.',
    descriptionHi: 'CS बेसिक्स, वेब डेवलपमेंट, DBMS और डेटा स्ट्रक्चर्स।',
    marks: '70%',
    grade: 'First Class',
  },
  {
    id: 'twelfth',
    type: 'education',
    period: 'Completed 2018',
    periodHi: '2018 में पूर्ण',
    title: 'Higher Secondary (12th) — PCM',
    titleHi: 'इंटरमीडिएट (12वीं) — PCM',
    organization: 'UP Board, Uttar Pradesh',
    organizationHi: 'UP बोर्ड, उत्तर प्रदेश',
    description: 'Science stream with Physics, Chemistry & Mathematics.',
    descriptionHi: 'भौतिकी, रसायन और गणित के साथ विज्ञान वर्ग।',
    marks: '75%',
    grade: 'First Class',
  },
  {
    id: 'tenth',
    type: 'education',
    period: 'Completed 2016',
    periodHi: '2016 में पूर्ण',
    title: 'High School (10th)',
    titleHi: 'हाई स्कूल (10वीं)',
    organization: 'UP Board, Uttar Pradesh',
    organizationHi: 'UP बोर्ड, उत्तर प्रदेश',
    description: 'Completed secondary education with strong academic performance.',
    descriptionHi: 'मजबूत शैक्षणिक प्रदर्शन के साथ माध्यमिक शिक्षा पूर्ण।',
    marks: '80%',
    grade: 'First Class',
  },
];
