# LessonCraft AI - MVP Development Plan

## Core Files to Create/Modify

### 1. Frontend Components (src/components/)
- **LessonPlanForm.tsx** - Main form for lesson plan inputs (subject, grade, topic, duration, objectives)
- **LessonPlanDisplay.tsx** - Display generated lesson plan with export options
- **AuthForm.tsx** - Login/signup form component
- **PaymentModal.tsx** - IntaSend payment integration modal
- **Header.tsx** - Navigation with auth status and premium features

### 2. Pages (src/pages/)
- **Index.tsx** - Landing page with hero section and demo
- **Dashboard.tsx** - Main app interface for authenticated users
- **Login.tsx** - Authentication page
- **Premium.tsx** - Premium features and pricing page

### 3. Utilities (src/lib/)
- **api.ts** - API calls to backend (lesson generation, auth, payments)
- **auth.ts** - Authentication state management
- **types.ts** - TypeScript interfaces for lesson plans, users, etc.

### 4. Backend Integration
- Mock API responses for MVP demo (will integrate with Flask backend later)
- OpenAI API integration simulation
- IntaSend payment flow simulation

## MVP Features Implementation Priority

1. **Lesson Plan Generator** (Core feature)
   - Form inputs: subject, grade level, topic, duration, learning objective
   - AI-powered lesson plan generation (mocked for demo)
   - Structured output: objectives, warm-up, content, activities, assessment, homework

2. **Export Options**
   - Copy to clipboard functionality
   - Email lesson plan (basic implementation)
   - Save to local storage (database simulation)

3. **User Authentication**
   - Simple login/signup forms
   - Session management with localStorage
   - Role-based access (teacher role)

4. **Payment Integration**
   - IntaSend payment modal
   - Freemium model: free basic generation, premium features locked
   - Payment success/failure handling

5. **UI/UX Polish**
   - Professional teacher-focused design
   - Mobile-responsive layout
   - Loading states and error handling

## File Relationships
- Index.tsx → LessonPlanForm.tsx → LessonPlanDisplay.tsx
- AuthForm.tsx ↔ auth.ts (state management)
- PaymentModal.tsx → api.ts (payment processing)
- All components use types.ts for TypeScript interfaces
- api.ts handles all external integrations (OpenAI, IntaSend)

## Success Criteria
- Generate structured lesson plans with realistic AI-like content
- Functional authentication flow
- Working payment integration demo
- Export functionality (copy, email, save)
- Professional UI suitable for teachers
- Mobile-responsive design