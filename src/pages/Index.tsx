import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Brain, Target, TrendingUp, Users, Clock, ArrowRight, CheckCircle } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/intro');
  };

  const features = [
    {
      icon: Brain,
      title: 'Psychological Assessment',
      description: 'Evaluate your natural fit and personality alignment'
    },
    {
      icon: Target,
      title: 'Technical Evaluation', 
      description: 'Test your current skills and learning readiness'
    },
    {
      icon: TrendingUp,
      title: 'WISCAR Analysis',
      description: 'Comprehensive 6-dimension career fit framework'
    },
    {
      icon: Users,
      title: 'Career Guidance',
      description: 'Personalized roadmap and next steps'
    }
  ];

  const benefits = [
    'Get a personalized career recommendation with confidence score',
    'Understand your strengths and areas for development',
    'Receive a tailored learning path and resource list',
    'Discover related career opportunities that match your profile',
    'Access detailed WISCAR framework analysis'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-accent/20">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-6 bg-gradient-to-r from-primary to-accent rounded-3xl shadow-xl">
              <Monitor className="h-16 w-16 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-info bg-clip-text text-transparent">
            Career Assessment Platform
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            Discover if you're meant for a career in <span className="font-semibold text-foreground">Monitoring System Analysis</span> with 
            our scientifically-backed assessment framework.
          </p>
          <Button 
            onClick={handleStartAssessment}
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-12 py-6 text-xl font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Start Your Assessment
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-lg border-0 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto p-3 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl w-fit mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <Card className="mb-16 shadow-xl border-0 bg-card/50 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-4">What You'll Discover</CardTitle>
            <CardDescription className="text-lg">
              Our comprehensive assessment provides actionable insights for your career journey
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <p className="text-sm leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6">
                <h4 className="text-xl font-semibold mb-4">Assessment Highlights</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <Badge variant="secondary">25-30 minutes</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Questions</span>
                    <Badge variant="secondary">25+ questions</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Framework</span>
                    <Badge variant="secondary">WISCAR Model</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Result</span>
                    <Badge variant="secondary">Detailed Report</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto shadow-xl border-0 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
            <CardContent className="pt-8 pb-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Discover Your Career Path?</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Take the first step towards understanding your fit for Monitoring System Analysis. 
                Get personalized insights and a clear roadmap for your career development.
              </p>
              <Button 
                onClick={handleStartAssessment}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Begin Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
