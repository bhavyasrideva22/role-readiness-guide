export interface Question {
  id: string;
  text: string;
  type: 'likert' | 'multiple-choice' | 'boolean';
  options?: string[];
  category: string;
  subcategory?: string;
}

export interface AssessmentResponse {
  questionId: string;
  value: number | string;
}

export interface SectionScore {
  name: string;
  score: number;
  maxScore: number;
  interpretation: string;
}

export interface AssessmentResult {
  overallScore: number;
  recommendation: 'yes' | 'no' | 'maybe';
  confidence: number;
  sections: SectionScore[];
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  nextSteps: string[];
  careerPaths: string[];
}

export interface AssessmentState {
  currentSection: number;
  responses: AssessmentResponse[];
  isComplete: boolean;
  result?: AssessmentResult;
}