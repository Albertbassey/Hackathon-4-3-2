import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AuthState } from '@/lib/types';
import { authManager } from '@/lib/auth';
import Header from '@/components/Header';
import AuthForm from '@/components/AuthForm';
import PaymentModal from '@/components/PaymentModal';
import Dashboard from './Dashboard';
import { ArrowRight, Clock, Target, Users, BookOpen, Star, CheckCircle } from 'lucide-react';

export default function Index() {
  const [authState, setAuthState] = useState<AuthState>(authManager.getAuthState());
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    const unsubscribe = authManager.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  const handleGetStarted = () => {
    if (authState.isAuthenticated) {
      setShowDashboard(true);
    } else {
      setShowAuthForm(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthForm(false);
    setShowDashboard(true);
  };

  if (showDashboard) {
    return <Dashboard />;
  }

  const testimonials = [
    {
      name: "Mrs. Adebayo",
      school: "Lagos State Primary School",
      text: "LessonCraft AI has reduced my planning time from 6 hours to 30 minutes per week. The quality is outstanding!",
      rating: 5
    },
    {
      name: "Mr. Okafor",
      school: "Federal Government College",
      text: "The curriculum alignment is perfect. My students are more engaged with the structured activities.",
      rating: 5
    },
    {
      name: "Miss Fatima",
      school: "Kano International School",
      text: "As a new teacher, this tool has been a lifesaver. Professional lesson plans in seconds!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header 
        onAuthClick={() => setShowAuthForm(true)}
        onPremiumClick={() => setShowPaymentModal(true)}
      />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <Badge variant="secondary" className="mb-4">
            🇳🇬 Built for Nigerian Teachers
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Create Brilliant Lesson Plans in Seconds
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Empower your teaching with AI-generated, curriculum-aligned lesson plans. 
            Save time, improve quality, and transform your classroom experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-gray-500">No credit card required</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">6+ Hours</div>
              <p className="text-gray-600">Saved per week</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <p className="text-gray-600">Curriculum aligned</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">30 Seconds</div>
              <p className="text-gray-600">Generation time</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need for Perfect Lesson Plans
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI understands Nigerian curriculum standards and creates comprehensive, 
            engaging lesson plans tailored to your students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Target className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Clear Objectives</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Well-defined learning objectives aligned with curriculum standards
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Engaging Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Interactive student activities that promote active learning
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Structured Content</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Organized lesson flow from warm-up to homework assignments
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <CardTitle className="text-lg">Time Efficient</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm">
                Generate complete lesson plans in under 30 seconds
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Loved by Teachers Across Nigeria
            </h2>
            <p className="text-gray-600">
              Join thousands of teachers who are already transforming their classrooms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription>{testimonial.school}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple, Affordable Pricing
          </h2>
          <p className="text-gray-600">
            Start free, upgrade when you need more advanced features
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>Perfect for trying out</CardDescription>
              <div className="text-3xl font-bold">₦0</div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Basic lesson generation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Copy & save locally</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">5 plans per month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-blue-500 relative">
            <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              Most Popular
            </Badge>
            <CardHeader>
              <CardTitle>Premium Lesson</CardTitle>
              <CardDescription>One-time premium plan</CardDescription>
              <div className="text-3xl font-bold">₦500</div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Curriculum alignment</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Printable format</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Advanced activities</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Monthly Unlimited</CardTitle>
              <CardDescription>Best value for active teachers</CardDescription>
              <div className="text-3xl font-bold">₦3,000<span className="text-sm font-normal">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Unlimited generation</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">All premium features</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Priority support</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of Nigerian teachers who are saving time and creating better lessons with LessonCraft AI
          </p>
          <Button 
            onClick={handleGetStarted}
            size="lg" 
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
          >
            Start Creating Lesson Plans
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Modals */}
      {showAuthForm && (
        <AuthForm onClose={handleAuthSuccess} />
      )}
      
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSuccess={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}