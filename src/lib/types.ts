export interface User {
  id: string;
  email: string;
  name: string;
  role: 'teacher';
  isPremium: boolean;
  createdAt: string;
}

export interface LessonPlanInput {
  subject: string;
  gradeLevel: string;
  topic: string;
  duration: number; // in minutes
  learningObjective?: string;
}

export interface LessonPlan {
  id: string;
  userId: string;
  input: LessonPlanInput;
  content: {
    objectives: string[];
    warmUp: string;
    coreContent: string[];
    studentActivities: string[];
    assessmentQuestions: string[];
    homeworkTasks: string[];
  };
  createdAt: string;
  isPremium: boolean;
}

export interface PaymentData {
  amount: number;
  currency: string;
  email: string;
  phone_number?: string;
  api_ref: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}