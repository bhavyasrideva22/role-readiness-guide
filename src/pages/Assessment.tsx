import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { assessmentQuestions, sectionTitles, likertOptions } from '@/data/questions';
import { AssessmentResponse, AssessmentState } from '@/types/assessment';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<AssessmentState>({
    currentSection: 0,
    responses: [],
    isComplete: false
  });
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentResponse, setCurrentResponse] = useState<string>('');

  // Group questions by section
  const sections = Object.keys(sectionTitles) as Array<keyof typeof sectionTitles>;
  const sectionQuestions = sections.map(section => 
    assessmentQuestions.filter(q => q.category === section)
  );
  
  const currentSectionQuestions = sectionQuestions[state.currentSection] || [];
  const currentQuestion = currentSectionQuestions[currentQuestionIndex];
  const totalQuestions = assessmentQuestions.length;
  const answeredQuestions = state.responses.length;
  const progress = (answeredQuestions / totalQuestions) * 100;

  // Get current response if exists
  useEffect(() => {
    if (currentQuestion) {
      const existingResponse = state.responses.find(r => r.questionId === currentQuestion.id);
      setCurrentResponse(existingResponse ? String(existingResponse.value) : '');
    }
  }, [currentQuestion, state.responses]);

  const handleResponse = (value: string) => {
    setCurrentResponse(value);
  };

  const saveResponse = () => {
    if (!currentQuestion || !currentResponse) return;

    const response: AssessmentResponse = {
      questionId: currentQuestion.id,
      value: currentQuestion.type === 'likert' ? parseInt(currentResponse) + 1 : currentResponse
    };

    setState(prev => ({
      ...prev,
      responses: [
        ...prev.responses.filter(r => r.questionId !== currentQuestion.id),
        response
      ]
    }));
  };

  const goToNext = () => {
    saveResponse();
    
    if (currentQuestionIndex < currentSectionQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (state.currentSection < sections.length - 1) {
      setState(prev => ({ ...prev, currentSection: prev.currentSection + 1 }));
      setCurrentQuestionIndex(0);
    } else {
      // Assessment complete
      setState(prev => ({ ...prev, isComplete: true }));
      // Save final response and navigate to results
      setTimeout(() => {
        navigate('/results', { 
          state: { 
            responses: [
              ...state.responses.filter(r => r.questionId !== currentQuestion.id),
              {
                questionId: currentQuestion.id,
                value: currentQuestion.type === 'likert' ? parseInt(currentResponse) + 1 : currentResponse
              }
            ]
          }
        });
      }, 100);
    }
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (state.currentSection > 0) {
      setState(prev => ({ ...prev, currentSection: prev.currentSection - 1 }));
      const prevSectionQuestions = sectionQuestions[state.currentSection - 1];
      setCurrentQuestionIndex(prevSectionQuestions.length - 1);
    }
  };

  const canGoNext = currentResponse !== '';
  const canGoPrevious = state.currentSection > 0 || currentQuestionIndex > 0;

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Assessment</h1>
            <div className="text-sm text-muted-foreground">
              Question {answeredQuestions + 1} of {totalQuestions}
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Section Header */}
        <Card className="mb-6 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl text-primary">
              {sectionTitles[sections[state.currentSection]]}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {currentSectionQuestions.length} in this section
            </div>
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card className="mb-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-4 leading-relaxed">
                {currentQuestion.text}
              </h2>

              {currentQuestion.type === 'likert' && (
                <RadioGroup value={currentResponse} onValueChange={handleResponse}>
                  {likertOptions.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={String(index)} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentQuestion.type === 'multiple-choice' && currentQuestion.options && (
                <RadioGroup value={currentResponse} onValueChange={handleResponse}>
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={goToPrevious}
            disabled={!canGoPrevious}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <Button
            onClick={goToNext}
            disabled={!canGoNext}
            className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          >
            {state.currentSection === sections.length - 1 && currentQuestionIndex === currentSectionQuestions.length - 1
              ? 'Complete Assessment'
              : 'Next'
            }
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;