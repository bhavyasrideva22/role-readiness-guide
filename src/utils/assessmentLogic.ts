import { AssessmentResponse, AssessmentResult, SectionScore } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export function calculateAssessmentResult(responses: AssessmentResponse[]): AssessmentResult {
  const responseMap = new Map(responses.map(r => [r.questionId, r.value]));
  
  // Calculate section scores
  const psychometricScore = calculatePsychometricScore(responseMap);
  const technicalScore = calculateTechnicalScore(responseMap);
  const wiscarScores = calculateWiscarScores(responseMap);
  
  // Calculate overall score (weighted average)
  const overallScore = Math.round(
    (psychometricScore.score * 0.3) + 
    (technicalScore.score * 0.3) + 
    (Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6 * 0.4)
  );
  
  // Determine recommendation
  let recommendation: 'yes' | 'no' | 'maybe';
  let confidence: number;
  
  if (overallScore >= 75) {
    recommendation = 'yes';
    confidence = Math.min(95, overallScore + 10);
  } else if (overallScore >= 55) {
    recommendation = 'maybe';
    confidence = Math.max(60, overallScore);
  } else {
    recommendation = 'no';
    confidence = Math.max(70, 100 - overallScore);
  }
  
  const sections: SectionScore[] = [
    psychometricScore,
    technicalScore,
    {
      name: 'WISCAR Analysis',
      score: Math.round(Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6),
      maxScore: 100,
      interpretation: getWiscarInterpretation(wiscarScores)
    }
  ];
  
  return {
    overallScore,
    recommendation,
    confidence,
    sections,
    wiscarScores,
    nextSteps: generateNextSteps(recommendation, sections),
    careerPaths: generateCareerPaths(recommendation, overallScore)
  };
}

function calculatePsychometricScore(responseMap: Map<string, number | string>): SectionScore {
  const psychQuestions = assessmentQuestions.filter(q => q.category === 'psychometric');
  const totalResponses = psychQuestions.length;
  let totalScore = 0;
  
  psychQuestions.forEach(q => {
    const response = responseMap.get(q.id) as number;
    if (response !== undefined) {
      totalScore += response;
    }
  });
  
  const score = Math.round((totalScore / (totalResponses * 5)) * 100);
  
  return {
    name: 'Psychological Fit',
    score,
    maxScore: 100,
    interpretation: score >= 80 ? 'Excellent natural fit for the role' :
                   score >= 60 ? 'Good alignment with role requirements' :
                   score >= 40 ? 'Some compatibility, needs development' :
                   'Limited natural fit, consider alternatives'
  };
}

function calculateTechnicalScore(responseMap: Map<string, number | string>): SectionScore {
  const techQuestions = assessmentQuestions.filter(q => q.category === 'technical');
  const correctAnswers = {
    't1': 'To track system performance and detect issues proactively',
    't2': 'Response time and error rate',
    't3': 'The alert triggered when there was no actual problem',
    't4': 'Investigate the cause and monitor for patterns',
    't5': '40 days' // (100GB - 20GB already used) / 2GB per day = 40 days
  };
  
  let correctCount = 0;
  techQuestions.forEach(q => {
    const response = responseMap.get(q.id) as string;
    if (response === correctAnswers[q.id as keyof typeof correctAnswers]) {
      correctCount++;
    }
  });
  
  const score = Math.round((correctCount / techQuestions.length) * 100);
  
  return {
    name: 'Technical Readiness',
    score,
    maxScore: 100,
    interpretation: score >= 80 ? 'Ready to start advanced training' :
                   score >= 60 ? 'Good foundation, some gaps to fill' :
                   score >= 40 ? 'Beginner level, needs foundational work' :
                   'Requires significant technical preparation'
  };
}

function calculateWiscarScores(responseMap: Map<string, number | string>) {
  const wiscarQuestions = assessmentQuestions.filter(q => q.category === 'wiscar');
  const subcategories = ['will', 'interest', 'skill', 'cognitive', 'ability', 'realWorld'];
  
  const scores: Record<string, number> = {};
  
  subcategories.forEach(sub => {
    const subQuestions = wiscarQuestions.filter(q => q.subcategory === sub);
    let totalScore = 0;
    
    subQuestions.forEach(q => {
      const response = responseMap.get(q.id) as number;
      if (response !== undefined) {
        totalScore += response;
      }
    });
    
    scores[sub] = Math.round((totalScore / (subQuestions.length * 5)) * 100);
  });
  
  return scores as {
    will: number;
    interest: number; 
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
}

function getWiscarInterpretation(wiscarScores: Record<string, number>): string {
  const avgScore = Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6;
  
  if (avgScore >= 80) return 'Exceptional fit across all dimensions';
  if (avgScore >= 60) return 'Strong overall fit with some areas for growth';
  if (avgScore >= 40) return 'Mixed results, focus on developing weaker areas';
  return 'Significant development needed across multiple dimensions';
}

function generateNextSteps(recommendation: string, sections: SectionScore[]): string[] {
  const steps: string[] = [];
  
  if (recommendation === 'yes') {
    steps.push('Start with OS basics and networking fundamentals');
    steps.push('Learn monitoring tools: Grafana, Prometheus, Zabbix');
    steps.push('Practice with real monitoring scenarios');
    steps.push('Build a home lab for hands-on experience');
  } else if (recommendation === 'maybe') {
    steps.push('Complete foundational IT courses');
    steps.push('Try a beginner monitoring project');
    steps.push('Shadow a systems administrator');
    steps.push('Reassess after 3-6 months of preparation');
  } else {
    steps.push('Consider alternative IT paths more aligned with your strengths');
    steps.push('If still interested, start with basic computer science concepts');
    steps.push('Explore related fields: Data Analysis, IT Support, QA');
  }
  
  return steps;
}

function generateCareerPaths(recommendation: string, overallScore: number): string[] {
  const paths: string[] = [];
  
  if (recommendation === 'yes') {
    paths.push('Monitoring System Analyst');
    paths.push('Site Reliability Engineer (Junior)');
    paths.push('DevOps Support Engineer');
    paths.push('NOC Engineer');
    paths.push('IT Infrastructure Analyst');
  } else if (recommendation === 'maybe') {
    paths.push('IT Support Specialist');
    paths.push('Systems Administrator');
    paths.push('Junior DevOps Engineer');
    paths.push('Technical Support Analyst');
  } else {
    if (overallScore > 30) {
      paths.push('Data Analyst');
      paths.push('QA Engineer');
      paths.push('Technical Writer');
      paths.push('Product Support');
    } else {
      paths.push('Explore non-technical roles');
      paths.push('Consider other IT fields');
      paths.push('Focus on skill development');
    }
  }
  
  return paths;
}