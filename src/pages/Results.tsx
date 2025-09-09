import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AssessmentResponse, AssessmentResult } from '@/types/assessment';
import { calculateAssessmentResult } from '@/utils/assessmentLogic';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  TrendingUp, 
  Brain, 
  Target,
  Lightbulb,
  BookOpen,
  Users,
  ArrowRight,
  Download,
  Share
} from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const responses = location.state?.responses as AssessmentResponse[];
    if (responses && responses.length > 0) {
      const calculatedResult = calculateAssessmentResult(responses);
      setResult(calculatedResult);
    } else {
      navigate('/');
    }
  }, [location.state, navigate]);

  if (!result) {
    return <div>Loading results...</div>;
  }

  const getRecommendationIcon = () => {
    switch (result.recommendation) {
      case 'yes': return <CheckCircle className="h-8 w-8 text-success" />;
      case 'no': return <XCircle className="h-8 w-8 text-destructive" />;
      case 'maybe': return <AlertCircle className="h-8 w-8 text-warning" />;
      default: return null;
    }
  };

  const getRecommendationColor = () => {
    switch (result.recommendation) {
      case 'yes': return 'from-success to-success/80';
      case 'no': return 'from-destructive to-destructive/80';
      case 'maybe': return 'from-warning to-warning/80';
      default: return 'from-primary to-accent';
    }
  };

  const getRecommendationText = () => {
    switch (result.recommendation) {
      case 'yes': return 'Yes, Monitoring System Analysis is a great fit for you!';
      case 'no': return 'Consider exploring alternative career paths that better match your strengths.';
      case 'maybe': return 'You have potential, but may need additional preparation.';
      default: return '';
    }
  };

  const wiscarData = [
    { name: 'Will', value: result.wiscarScores.will, icon: Target },
    { name: 'Interest', value: result.wiscarScores.interest, icon: Brain },
    { name: 'Skill', value: result.wiscarScores.skill, icon: TrendingUp },
    { name: 'Cognitive', value: result.wiscarScores.cognitive, icon: Lightbulb },
    { name: 'Ability to Learn', value: result.wiscarScores.ability, icon: BookOpen },
    { name: 'Real-World Alignment', value: result.wiscarScores.realWorld, icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Assessment Results</h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive analysis of your fit for Monitoring System Analysis
          </p>
        </div>

        {/* Main Recommendation */}
        <Card className={`mb-8 shadow-xl border-0 bg-gradient-to-r ${getRecommendationColor()}`}>
          <CardContent className="pt-8 pb-8 text-center text-white">
            <div className="flex justify-center mb-4">
              {getRecommendationIcon()}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {getRecommendationText()}
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div>
                <div className="text-4xl font-bold mb-2">{result.overallScore}%</div>
                <div className="text-lg opacity-90">Overall Fit Score</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{result.confidence}%</div>
                <div className="text-lg opacity-90">Confidence Level</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section Scores */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {result.sections.map((section, index) => (
            <Card key={index} className="shadow-lg border-0 bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">{section.name}</CardTitle>
                <CardDescription>{section.interpretation}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Score</span>
                    <span className="font-semibold">{section.score}/{section.maxScore}</span>
                  </div>
                  <Progress value={section.score} className="h-3" />
                </div>
                <Badge 
                  variant={section.score >= 80 ? "default" : section.score >= 60 ? "secondary" : "destructive"}
                  className="w-full justify-center"
                >
                  {section.score >= 80 ? 'Excellent' : section.score >= 60 ? 'Good' : section.score >= 40 ? 'Fair' : 'Needs Work'}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* WISCAR Analysis */}
        <Card className="mb-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Brain className="h-6 w-6 text-primary" />
              WISCAR Framework Analysis
            </CardTitle>
            <CardDescription>
              Detailed breakdown of your fit across six key dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wiscarData.map((item, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-muted/50">
                  <item.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">{item.name}</h4>
                  <div className="text-2xl font-bold text-primary mb-2">{item.value}%</div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <ArrowRight className="h-6 w-6 text-primary" />
              Recommended Next Steps
            </CardTitle>
            <CardDescription>
              Personalized action plan based on your assessment results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Paths */}
        <Card className="mb-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Potential Career Paths
            </CardTitle>
            <CardDescription>
              Roles that align with your assessment profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {result.careerPaths.map((path, index) => (
                <Badge key={index} variant="outline" className="p-3 text-center justify-center">
                  {path}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            Take Another Assessment
          </Button>
          <Button 
            size="lg"
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            <Download className="h-4 w-4" />
            Download Report
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <Share className="h-4 w-4" />
            Share Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;