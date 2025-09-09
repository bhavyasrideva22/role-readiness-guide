import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Monitor, Brain, Target, Clock, Users, TrendingUp } from 'lucide-react';

const AssessmentIntro = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  const traits = [
    { icon: Brain, label: 'Analytical Thinking', description: 'Logical problem-solving mindset' },
    { icon: Target, label: 'Attention to Detail', description: 'Spotting anomalies and patterns' },
    { icon: Clock, label: 'Calm Under Pressure', description: 'Managing alerts and incidents' },
    { icon: Users, label: 'Systems Thinking', description: 'Understanding interconnected systems' }
  ];

  const careers = [
    'Monitoring System Analyst',
    'Site Reliability Engineer',
    'DevOps Support Engineer', 
    'NOC Engineer',
    'IT Infrastructure Analyst',
    'Network Monitoring Engineer'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-primary to-accent rounded-2xl shadow-lg">
              <Monitor className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-info bg-clip-text text-transparent">
            Should I Learn Monitoring System Analysis?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Discover if you have the psychological, technical, and practical fit for a career in monitoring and 
            infrastructure analysis with our comprehensive assessment.
          </p>
        </div>

        {/* What is MSA Section */}
        <Card className="mb-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              What is a Monitoring System Analyst?
            </CardTitle>
            <CardDescription className="text-base">
              MSAs set up, maintain, and interpret systems that monitor IT infrastructure, applications, 
              and security layers to ensure optimal performance and proactively address issues.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-lg">Key Responsibilities</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Configure monitoring dashboards and alerts</li>
                  <li>• Analyze system performance metrics</li>
                  <li>• Investigate and resolve infrastructure issues</li>
                  <li>• Optimize system performance and reliability</li>
                  <li>• Collaborate with DevOps and development teams</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-lg">Career Opportunities</h4>
                <div className="flex flex-wrap gap-2">
                  {careers.map((career, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {career}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ideal Traits Section */}
        <Card className="mb-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Ideal Traits for Success</CardTitle>
            <CardDescription>
              Key characteristics that predict success in monitoring system analysis roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {traits.map((trait, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-muted/50">
                  <trait.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">{trait.label}</h4>
                  <p className="text-sm text-muted-foreground">{trait.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Info */}
        <Card className="mb-8 shadow-lg border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Assessment Overview</CardTitle>
            <CardDescription>
              This comprehensive assessment evaluates your fit across multiple dimensions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary mb-2">25-30</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
                <div className="text-sm mt-2">Complete assessment duration</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-accent mb-2">6</div>
                <div className="text-sm text-muted-foreground">Dimensions</div>
                <div className="text-sm mt-2">WISCAR framework analysis</div>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-info mb-2">3</div>
                <div className="text-sm text-muted-foreground">Sections</div>
                <div className="text-sm mt-2">Psychological, Technical, Career</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="text-center">
          <Button 
            onClick={handleStartAssessment} 
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Assessment
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Get personalized recommendations and a detailed career roadmap
          </p>
        </div>
      </div>
    </div>
  );
};

export default AssessmentIntro;