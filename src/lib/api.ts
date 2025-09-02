import { LessonPlanInput, LessonPlan, PaymentData } from './types';

// Mock lesson plan generation - simulates OpenAI API response
export async function generateLessonPlan(input: LessonPlanInput): Promise<LessonPlan> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const mockContent = {
    objectives: [
      `Students will understand the key concepts of ${input.topic}`,
      `Students will be able to apply ${input.topic} in practical scenarios`,
      `Students will demonstrate knowledge through interactive activities`
    ],
    warmUp: `Begin with a 5-minute discussion about students' prior knowledge of ${input.topic}. Ask open-ended questions to gauge understanding and create engagement.`,
    coreContent: [
      `Introduction to ${input.topic} - Definition and key terminology`,
      `Core principles and concepts related to ${input.topic}`,
      `Real-world applications and examples`,
      `Interactive demonstration or explanation`,
      `Q&A session to clarify understanding`
    ],
    studentActivities: [
      `Group discussion: Students share their thoughts on ${input.topic}`,
      `Hands-on activity: Practice exercise related to the lesson`,
      `Pair work: Students explain concepts to each other`,
      `Individual reflection: Write key takeaways in their notebooks`
    ],
    assessmentQuestions: [
      `What are the main concepts we learned about ${input.topic}?`,
      `How would you explain ${input.topic} to someone who has never heard of it?`,
      `Give an example of how ${input.topic} is used in everyday life`,
      `What questions do you still have about ${input.topic}?`
    ],
    homeworkTasks: [
      `Read textbook pages related to ${input.topic}`,
      `Complete practice worksheet on ${input.topic}`,
      `Find one real-world example of ${input.topic} and write a short paragraph`,
      `Prepare for next class by reviewing today's notes`
    ]
  };

  return {
    id: Date.now().toString(),
    userId: 'current-user',
    input,
    content: mockContent,
    createdAt: new Date().toISOString(),
    isPremium: false
  };
}

// Mock payment processing - simulates IntaSend API
export async function processPayment(paymentData: PaymentData): Promise<{ success: boolean; transactionId?: string; error?: string }> {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Mock successful payment (90% success rate)
  if (Math.random() > 0.1) {
    return {
      success: true,
      transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  return {
    success: false,
    error: 'Payment failed. Please try again.'
  };
}

// Mock email sending
export async function emailLessonPlan(email: string, lessonPlan: LessonPlan): Promise<{ success: boolean; error?: string }> {
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock successful email sending
  return {
    success: true
  };
}

// Save lesson plan to local storage (simulates database)
export function saveLessonPlan(lessonPlan: LessonPlan): void {
  const savedPlans = JSON.parse(localStorage.getItem('lessoncraft_plans') || '[]');
  savedPlans.push(lessonPlan);
  localStorage.setItem('lessoncraft_plans', JSON.stringify(savedPlans));
}

// Get saved lesson plans from local storage
export function getSavedLessonPlans(): LessonPlan[] {
  return JSON.parse(localStorage.getItem('lessoncraft_plans') || '[]');
}