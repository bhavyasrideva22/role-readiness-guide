import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Section - Interest Scale
  {
    id: 'p1',
    text: 'I am interested in understanding how computer systems work under the hood.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest'
  },
  {
    id: 'p2',
    text: 'I enjoy reading technical documentation and troubleshooting guides.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest'
  },
  {
    id: 'p3',
    text: 'I find satisfaction in monitoring dashboards and analyzing system metrics.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'interest'
  },

  // Psychometric Section - Personality Compatibility
  {
    id: 'p4',
    text: 'I enjoy solving technical puzzles and identifying patterns.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality'
  },
  {
    id: 'p5',
    text: 'I remain calm and focused when systems are failing and alerts are firing.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality'
  },
  {
    id: 'p6',
    text: 'I pay close attention to details and notice when things are slightly off.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'personality'
  },

  // Cognitive & Work Style
  {
    id: 'p7',
    text: 'I prefer structured work with clear outcomes and measurable results.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'cognitive'
  },
  {
    id: 'p8',
    text: 'I can work effectively during on-call rotations and irregular hours.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'cognitive'
  },

  // Motivation Assessment
  {
    id: 'p9',
    text: 'I would pursue this role even without external pressure or high salary.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation'
  },
  {
    id: 'p10',
    text: 'I am motivated by preventing problems before they impact users.',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation'
  },

  // Technical & Aptitude Section
  {
    id: 't1',
    text: 'What is the primary purpose of a monitoring system?',
    type: 'multiple-choice',
    options: [
      'To replace manual testing',
      'To track system performance and detect issues proactively',
      'To store application data',
      'To manage user authentication'
    ],
    category: 'technical',
    subcategory: 'domain-knowledge'
  },
  {
    id: 't2',
    text: 'Which metric would be MOST important to monitor for a web application?',
    type: 'multiple-choice',
    options: [
      'Number of code commits per day',
      'Response time and error rate',
      'Number of features deployed',
      'Team meeting frequency'
    ],
    category: 'technical',
    subcategory: 'domain-knowledge'
  },
  {
    id: 't3',
    text: 'In a monitoring alert, what does "false positive" mean?',
    type: 'multiple-choice',
    options: [
      'The alert triggered when there was no actual problem',
      'The alert failed to trigger when there was a problem',
      'The alert was sent to the wrong person',
      'The alert contained incorrect information'
    ],
    category: 'technical',
    subcategory: 'domain-knowledge'
  },
  {
    id: 't4',
    text: 'If CPU usage spikes to 95% for 10 seconds then returns to 20%, what should you do?',
    type: 'multiple-choice',
    options: [
      'Immediately restart the server',
      'Investigate the cause and monitor for patterns',
      'Ignore it since it returned to normal',
      'Scale up the infrastructure immediately'
    ],
    category: 'technical',
    subcategory: 'analytical'
  },
  {
    id: 't5',
    text: 'You notice disk usage growing by 2GB daily. At this rate, when will the 100GB disk be full?',
    type: 'multiple-choice',
    options: [
      '25 days',
      '40 days',
      '50 days',
      'Need more information'
    ],
    category: 'technical',
    subcategory: 'numerical'
  },

  // WISCAR Framework
  {
    id: 'w1',
    text: 'I can consistently pursue technical learning over weeks and months.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will'
  },
  {
    id: 'w2',
    text: 'I have strong willpower to debug complex issues that take hours to solve.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will'
  },
  {
    id: 'w3',
    text: 'I am genuinely curious about system performance and optimization.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest'
  },
  {
    id: 'w4',
    text: 'I enjoy learning about new monitoring tools and technologies.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest'
  },
  {
    id: 'w5',
    text: 'I have experience with command line interfaces and basic scripting.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill'
  },
  {
    id: 'w6',
    text: 'I can read and understand system logs and error messages.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'skill'
  },
  {
    id: 'w7',
    text: 'I can identify patterns and correlations in large datasets.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'cognitive'
  },
  {
    id: 'w8',
    text: 'I think logically about cause-and-effect relationships in systems.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'cognitive'
  },
  {
    id: 'w9',
    text: 'I reflect on my mistakes and actively work to improve my skills.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability'
  },
  {
    id: 'w10',
    text: 'I seek feedback and adapt my approach based on new information.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability'
  },
  {
    id: 'w11',
    text: 'I want to solve real-time IT issues that impact business operations.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'realWorld'
  },
  {
    id: 'w12',
    text: 'I see value in proactive monitoring versus reactive troubleshooting.',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'realWorld'
  }
];

export const sectionTitles = {
  psychometric: 'Psychological Fit Assessment',
  technical: 'Technical & Aptitude Assessment', 
  wiscar: 'WISCAR Framework Analysis'
};

export const likertOptions = [
  'Strongly Disagree',
  'Disagree', 
  'Neutral',
  'Agree',
  'Strongly Agree'
];