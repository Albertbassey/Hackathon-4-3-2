import { useState, useEffect } from 'react';
import { LessonPlan, LessonPlanInput, AuthState } from '@/lib/types';
import { generateLessonPlan } from '@/lib/api';
import { authManager } from '@/lib/auth';
import Header from '@/components/Header';
import LessonPlanForm from '@/components/LessonPlanForm';
import LessonPlanDisplay from '@/components/LessonPlanDisplay';
import AuthForm from '@/components/AuthForm';
import PaymentModal from '@/components/PaymentModal';
import { toast } from 'sonner';

export default function Dashboard() {
  const [authState, setAuthState] = useState<AuthState>(authManager.getAuthState());
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const unsubscribe = authManager.subscribe(setAuthState);
    return unsubscribe;
  }, []);

  const handleGenerateLessonPlan = async (input: LessonPlanInput) => {
    if (!authState.isAuthenticated) {
      setShowAuthForm(true);
      return;
    }

    setIsGenerating(true);
    try {
      const plan = await generateLessonPlan(input);
      setLessonPlan(plan);
      toast.success('Lesson plan generated successfully!');
    } catch (error) {
      toast.error('Failed to generate lesson plan. Please try again.');
    }
    setIsGenerating(false);
  };

  const handleNewPlan = () => {
    setLessonPlan(null);
  };

  const handlePaymentSuccess = () => {
    toast.success('Welcome to Premium! You now have access to all advanced features.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header 
        onAuthClick={() => setShowAuthForm(true)}
        onPremiumClick={() => setShowPaymentModal(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        {lessonPlan ? (
          <LessonPlanDisplay
            lessonPlan={lessonPlan}
            userEmail={authState.user?.email}
            onNewPlan={handleNewPlan}
          />
        ) : (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome to LessonCraft AI
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Generate structured, curriculum-aligned lesson plans in seconds using AI. 
                Save time, improve quality, and transform your classroom.
              </p>
            </div>
            
            <LessonPlanForm
              onSubmit={handleGenerateLessonPlan}
              isLoading={isGenerating}
            />

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-gray-600 text-sm">Generate comprehensive lesson plans in under 30 seconds</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2">Curriculum Aligned</h3>
                <p className="text-gray-600 text-sm">All plans follow Nigerian curriculum standards and best practices</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📚</span>
                </div>
                <h3 className="font-semibold mb-2">Complete Plans</h3>
                <p className="text-gray-600 text-sm">Includes objectives, activities, assessments, and homework</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {showAuthForm && (
        <AuthForm onClose={() => setShowAuthForm(false)} />
      )}
      
      {showPaymentModal && (
        <PaymentModal
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}