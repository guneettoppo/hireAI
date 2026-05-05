export type FitmentStatus = 'job-ready' | 'near-ready' | 'requires-training' | 'needs-assessment' | 'flagged';
export type IntegrityStatus = 'verified' | 'warning' | 'flagged' | 'pending';

export interface Candidate {
  id: string;
  name: string;
  location: string;
  district: string;
  skillCategory: string;
  audioSNR: number;
  fitmentScore: number;
  fitmentStatus: FitmentStatus;
  integrityStatus: IntegrityStatus;
  timestamp: string;
  featureVector: FeatureVectorScore;
  transcriptionSnippet: string;
  classificationReasons: string[];
  integrityFlags: string[];
}

export interface FeatureVectorScore {
  relevance: number;
  clarity: number;
  confidence: number;
  technicalAccuracy: number;
  communicationSkill: number;
  problemSolving: number;
  safetyAwareness: number;
  toolKnowledge: number;
}

export interface IntegrityAlert {
  id: string;
  candidateId: string;
  candidateName: string;
  alertType: 'replay-attack' | 'duplicate-face' | 'audio-anomaly' | 'face-occlusion' | 'blink-anomaly' | 'lip-sync-mismatch';
  severity: 'critical' | 'high' | 'medium';
  description: string;
  technicalDetails: string;
  timestamp: string;
  confidence: number;
  frameIndex: number;
}

export interface DashboardStats {
  totalScreened: number;
  jobReady: number;
  requiresTraining: number;
  integrityFlags: number;
}

export const candidates: Candidate[] = [
  {
    id: 'KA-HBL-2024-0847',
    name: 'Rajesh Kumarswamy',
    location: 'Hubli',
    district: 'Dharwad',
    skillCategory: 'Electrical Maintenance',
    audioSNR: 28.4,
    fitmentScore: 0.87,
    fitmentStatus: 'job-ready',
    integrityStatus: 'verified',
    timestamp: '2024-01-15T09:34:22Z',
    featureVector: {
      relevance: 0.89,
      clarity: 0.84,
      confidence: 0.91,
      technicalAccuracy: 0.86,
      communicationSkill: 0.82,
      problemSolving: 0.88,
      safetyAwareness: 0.92,
      toolKnowledge: 0.85
    },
    transcriptionSnippet: 'Naanu electrical wiringu kelasa maadtidde. Safety protocols bagge naanu chennagi tiliyuttene, especially grounding mattu earthing vishayada bagge.',
    classificationReasons: ['Strong technical vocabulary', 'Clear safety awareness', 'Consistent response patterns'],
    integrityFlags: []
  },
  {
    id: 'KA-MYS-2024-1203',
    name: 'Lakshmi Devi',
    location: 'Mysore',
    district: 'Mysuru',
    skillCategory: 'Plumbing',
    audioSNR: 24.1,
    fitmentScore: 0.72,
    fitmentStatus: 'near-ready',
    integrityStatus: 'verified',
    timestamp: '2024-01-15T10:12:45Z',
    featureVector: {
      relevance: 0.74,
      clarity: 0.71,
      confidence: 0.68,
      technicalAccuracy: 0.75,
      communicationSkill: 0.69,
      problemSolving: 0.73,
      safetyAwareness: 0.76,
      toolKnowledge: 0.70
    },
    transcriptionSnippet: 'Pipe fitting kelasa naanu 3 varsha maadiddeene. PVC mattu GI pipes install maadalu gottu.',
    classificationReasons: ['Adequate technical knowledge', 'Some hesitation in complex scenarios', 'Good basic understanding'],
    integrityFlags: []
  },
  {
    id: 'KA-BGM-2024-0592',
    name: 'Venkatesh Gowda',
    location: 'Belgaum',
    district: 'Belagavi',
    skillCategory: 'Masonry',
    audioSNR: 19.2,
    fitmentScore: 0.54,
    fitmentStatus: 'requires-training',
    integrityStatus: 'warning',
    timestamp: '2024-01-15T11:08:33Z',
    featureVector: {
      relevance: 0.52,
      clarity: 0.48,
      confidence: 0.58,
      technicalAccuracy: 0.51,
      communicationSkill: 0.55,
      problemSolving: 0.49,
      safetyAwareness: 0.61,
      toolKnowledge: 0.54
    },
    transcriptionSnippet: 'Godu kattalidda kelasa maadtidde. Cement mixing ratio bagge swalpa confusion ide.',
    classificationReasons: ['Needs reinforcement on mixing ratios', 'Limited exposure to modern techniques', 'Basic safety knowledge present'],
    integrityFlags: ['Eye blink frequency anomaly detected - 2.3 blinks/min below baseline']
  },
  {
    id: 'KA-MLR-2024-0331',
    name: 'Manjunath Shetty',
    location: 'Mangalore',
    district: 'Dakshina Kannada',
    skillCategory: 'Carpentry',
    audioSNR: 31.6,
    fitmentScore: 0.91,
    fitmentStatus: 'job-ready',
    integrityStatus: 'verified',
    timestamp: '2024-01-15T11:45:18Z',
    featureVector: {
      relevance: 0.93,
      clarity: 0.89,
      confidence: 0.94,
      technicalAccuracy: 0.91,
      communicationSkill: 0.88,
      problemSolving: 0.92,
      safetyAwareness: 0.90,
      toolKnowledge: 0.93
    },
    transcriptionSnippet: 'Marada kelasa nanna specialty. Joinery techniques, furniture making ella gottu. Power tools safe aagi use maadtene.',
    classificationReasons: ['Excellent technical proficiency', 'Strong safety protocols', 'Comprehensive tool knowledge'],
    integrityFlags: []
  },
  {
    id: 'KA-DVG-2024-0718',
    name: 'Basavaraj Patil',
    location: 'Davangere',
    district: 'Davanagere',
    skillCategory: 'Welding',
    audioSNR: 22.8,
    fitmentScore: 0.38,
    fitmentStatus: 'flagged',
    integrityStatus: 'flagged',
    timestamp: '2024-01-15T12:22:41Z',
    featureVector: {
      relevance: 0.42,
      clarity: 0.31,
      confidence: 0.35,
      technicalAccuracy: 0.38,
      communicationSkill: 0.41,
      problemSolving: 0.34,
      safetyAwareness: 0.44,
      toolKnowledge: 0.37
    },
    transcriptionSnippet: 'Welding kelasa... hmm... arc welding gottu. MIG TIG bagge... swalpa gottu.',
    classificationReasons: ['Inconsistent response patterns', 'Significant gaps in safety knowledge', 'Potential replay attack detected'],
    integrityFlags: ['Replay attack suspected - Audio phase drift 18.2ms', 'Face occlusion detected - 47% frame coverage']
  },
  {
    id: 'KA-TML-2024-0956',
    name: 'Shivakumar Naik',
    location: 'Tumkur',
    district: 'Tumakuru',
    skillCategory: 'HVAC Technician',
    audioSNR: 26.7,
    fitmentScore: 0.78,
    fitmentStatus: 'job-ready',
    integrityStatus: 'verified',
    timestamp: '2024-01-15T13:05:29Z',
    featureVector: {
      relevance: 0.81,
      clarity: 0.76,
      confidence: 0.79,
      technicalAccuracy: 0.80,
      communicationSkill: 0.74,
      problemSolving: 0.77,
      safetyAwareness: 0.82,
      toolKnowledge: 0.78
    },
    transcriptionSnippet: 'AC service mattu repair kelasa maadtidde. Refrigerant handling rules gottu, EPA certification ide.',
    classificationReasons: ['Good refrigerant handling knowledge', 'Proper certification awareness', 'Meets minimum competency threshold'],
    integrityFlags: []
  },
  {
    id: 'KA-SHP-2024-1102',
    name: 'Nagaraj Desai',
    location: 'Shivamogga',
    district: 'Shimoga',
    skillCategory: 'Painting',
    audioSNR: 20.4,
    fitmentScore: 0.61,
    fitmentStatus: 'needs-assessment',
    integrityStatus: 'pending',
    timestamp: '2024-01-15T14:18:52Z',
    featureVector: {
      relevance: 0.63,
      clarity: 0.58,
      confidence: 0.62,
      technicalAccuracy: 0.59,
      communicationSkill: 0.64,
      problemSolving: 0.57,
      safetyAwareness: 0.65,
      toolKnowledge: 0.60
    },
    transcriptionSnippet: 'Paint kelasa maadtidde. Interior exterior ella gottu. Surface preparation important anta gottu.',
    classificationReasons: ['Adequate basic knowledge', 'Incomplete assessment due to network issues', 'Requires re-evaluation'],
    integrityFlags: ['Session incomplete - Network stability issues detected']
  },
  {
    id: 'KA-CHK-2024-0443',
    name: 'Pradeep Kumar',
    location: 'Chikkamagaluru',
    district: 'Chikmagalur',
    skillCategory: 'Heavy Equipment Operator',
    audioSNR: 29.1,
    fitmentScore: 0.84,
    fitmentStatus: 'job-ready',
    integrityStatus: 'verified',
    timestamp: '2024-01-15T15:02:17Z',
    featureVector: {
      relevance: 0.86,
      clarity: 0.82,
      confidence: 0.85,
      technicalAccuracy: 0.84,
      communicationSkill: 0.80,
      problemSolving: 0.83,
      safetyAwareness: 0.88,
      toolKnowledge: 0.84
    },
    transcriptionSnippet: 'JCB mattu excavator operate maadtidde. Daily inspection checklist follow maadtene. Safety protocols strict aagi follow maadtene.',
    classificationReasons: ['Strong operational knowledge', 'Excellent safety compliance', 'Experienced with multiple machine types'],
    integrityFlags: []
  },
  {
    id: 'KA-BLR-2024-1567',
    name: 'Ravi Shankar',
    location: 'Bangalore Rural',
    district: 'Bengaluru Rural',
    skillCategory: 'Scaffolding',
    audioSNR: 25.3,
    fitmentScore: 0.67,
    fitmentStatus: 'requires-training',
    integrityStatus: 'warning',
    timestamp: '2024-01-15T15:48:39Z',
    featureVector: {
      relevance: 0.69,
      clarity: 0.64,
      confidence: 0.66,
      technicalAccuracy: 0.68,
      communicationSkill: 0.65,
      problemSolving: 0.64,
      safetyAwareness: 0.71,
      toolKnowledge: 0.66
    },
    transcriptionSnippet: 'Scaffolding kelasa gottu. Height work safety important. Harness use maadtene.',
    classificationReasons: ['Basic knowledge present', 'Needs certification training', 'Limited exposure to complex setups'],
    integrityFlags: ['Lip sync mismatch detected - 23ms audio-visual offset']
  },
  {
    id: 'KA-KLB-2024-0289',
    name: 'Suresh Hosamani',
    location: 'Kalaburagi',
    district: 'Gulbarga',
    skillCategory: 'Solar Panel Installation',
    audioSNR: 27.9,
    fitmentScore: 0.82,
    fitmentStatus: 'job-ready',
    integrityStatus: 'verified',
    timestamp: '2024-01-15T16:33:04Z',
    featureVector: {
      relevance: 0.84,
      clarity: 0.80,
      confidence: 0.83,
      technicalAccuracy: 0.82,
      communicationSkill: 0.78,
      problemSolving: 0.81,
      safetyAwareness: 0.85,
      toolKnowledge: 0.82
    },
    transcriptionSnippet: 'Solar panel installation 2 varsha experience ide. Inverter connection, earthing ella gottu. Rooftop safety measures follow maadtene.',
    classificationReasons: ['Good renewable energy knowledge', 'Proper electrical safety awareness', 'Certified installer credentials'],
    integrityFlags: []
  }
];

export const integrityAlerts: IntegrityAlert[] = [
  {
    id: 'ALERT-001',
    candidateId: 'KA-DVG-2024-0718',
    candidateName: 'Basavaraj Patil',
    alertType: 'replay-attack',
    severity: 'critical',
    description: 'Suspected replay attack detected during video assessment',
    technicalDetails: 'Audio phase drift detected at 18.2ms, exceeding 15ms threshold. Frame-to-audio synchronization anomaly confirmed.',
    timestamp: '2024-01-15T12:24:15Z',
    confidence: 0.92,
    frameIndex: 182
  },
  {
    id: 'ALERT-002',
    candidateId: 'KA-DVG-2024-0718',
    candidateName: 'Basavaraj Patil',
    alertType: 'face-occlusion',
    severity: 'high',
    description: 'Face occlusion exceeds acceptable threshold',
    technicalDetails: 'Face visibility dropped to 53% across 47% of assessment frames. Minimum required visibility: 85%.',
    timestamp: '2024-01-15T12:25:02Z',
    confidence: 0.88,
    frameIndex: 240
  },
  {
    id: 'ALERT-003',
    candidateId: 'KA-BGM-2024-0592',
    candidateName: 'Venkatesh Gowda',
    alertType: 'blink-anomaly',
    severity: 'medium',
    description: 'Abnormal eye blink pattern detected',
    technicalDetails: 'Eye blink frequency: 4.2 blinks/min. Expected baseline: 6.5-8.0 blinks/min. Deviation: -2.3 blinks/min.',
    timestamp: '2024-01-15T11:12:48Z',
    confidence: 0.67,
    frameIndex: 96
  },
  {
    id: 'ALERT-004',
    candidateId: 'KA-BLR-2024-1567',
    candidateName: 'Ravi Shankar',
    alertType: 'lip-sync-mismatch',
    severity: 'medium',
    description: 'Audio-visual synchronization anomaly detected',
    technicalDetails: 'Lip movement to audio offset: 23ms. Acceptable threshold: 15ms. Possible pre-recorded audio injection.',
    timestamp: '2024-01-15T15:52:21Z',
    confidence: 0.71,
    frameIndex: 214
  },
  {
    id: 'ALERT-005',
    candidateId: 'KA-MYS-2024-1458',
    candidateName: 'Unknown Candidate',
    alertType: 'duplicate-face',
    severity: 'critical',
    description: 'Potential duplicate identity detected',
    technicalDetails: 'Facial embedding cosine similarity: 0.94 with candidate KA-MYS-2024-0892. Threshold for duplicate flag: 0.85.',
    timestamp: '2024-01-15T17:08:33Z',
    confidence: 0.95,
    frameIndex: 332
  },
  {
    id: 'ALERT-006',
    candidateId: 'KA-HBL-2024-0912',
    candidateName: 'Prashanth Rao',
    alertType: 'audio-anomaly',
    severity: 'high',
    description: 'Audio quality degradation pattern detected',
    technicalDetails: 'SNR dropped from 28dB to 12dB during technical questions. Spectral analysis indicates possible audio switching.',
    timestamp: '2024-01-15T18:15:47Z',
    confidence: 0.83,
    frameIndex: 156
  }
];

export const dashboardStats: DashboardStats = {
  totalScreened: 2847,
  jobReady: 1423,
  requiresTraining: 892,
  integrityFlags: 156
};

export const skillCategories = [
  'All Categories',
  'Electrical Maintenance',
  'Plumbing',
  'Masonry',
  'Carpentry',
  'Welding',
  'HVAC Technician',
  'Painting',
  'Heavy Equipment Operator',
  'Scaffolding',
  'Solar Panel Installation'
];

export const interviewQuestions = [
  {
    id: 1,
    questionKannada: 'Nimma kelasada anubhavada bagge heli. Yaava tools use maadtira?',
    questionEnglish: 'Tell us about your work experience. What tools do you use?',
    duration: 60
  },
  {
    id: 2,
    questionKannada: 'Safety protocols bagge nim tiluvallke enu? Yaava precautions tegedukolltira?',
    questionEnglish: 'What is your knowledge about safety protocols? What precautions do you take?',
    duration: 45
  },
  {
    id: 3,
    questionKannada: 'Kelasada samayada problem ondanna solve maadida udaaharane kodi.',
    questionEnglish: 'Give an example of a problem you solved during work.',
    duration: 60
  }
];
