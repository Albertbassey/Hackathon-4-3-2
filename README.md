# 📚 LessonCraft AI

**AI-powered lesson plan generator for Nigerian teachers - Built with React, TypeScript, and Shadcn-UI**

---

## 🚀 Overview

LessonCraft AI is a modern web application that empowers Nigerian teachers to generate curriculum-aligned lesson plans instantly using AI. Built for the SDG 4 hackathon, this tool combines cutting-edge technology with educational expertise to support **Quality Education** goals.

---

## 🧠 Core Features

- ✏️ **AI Lesson Generator**  
  Teachers input subject, grade level, topic, and duration. The AI generates complete lesson plans including objectives, activities, assessments, and homework.

- 📤 **Export Options**  
  Copy, email, or save lesson plans to your dashboard.

- 🔐 **User Authentication**  
  Secure login system for teachers to manage their lesson history.

- 💳 **Premium Features**  
  Advanced features unlocked through IntaSend payment integration.

---

## 🛠️ Tech Stack

| Layer       | Technology Used               |
|-------------|-------------------------------|
| Frontend    | React, TypeScript, Vite       |
| UI Library  | Shadcn-UI, Tailwind CSS       |
| AI Engine   | OpenAI API (GPT-based)        |
| Payments    | IntaSend API                  |
| Routing     | React Router                  |

---

## 📦 Installation & Setup

```bash
# Install dependencies
pnpm i

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Run linting
pnpm run lint
```

## 🔐 Environment Variables
Create a `.env` file and add:

```
VITE_OPENAI_API_KEY=your_openai_key
VITE_INTASEND_API_KEY=your_intasend_key
```

## 🏗️ Project Structure

- `src/components/` - React components including UI components from Shadcn-UI
- `src/pages/` - Main application pages (Landing, Dashboard)
- `src/lib/` - Utilities, types, authentication, and API integrations
- `src/hooks/` - Custom React hooks
- `public/` - Static assets

## 💰 Monetization Strategy

**Freemium Model:**
- **Free:** Basic lesson generation (3 lessons/day)
- **Premium:** Unlimited lessons, advanced features, export options

**Pricing:**
- ₦500 per premium lesson pack
- ₦3,000 monthly unlimited subscription

**Payment Gateway:** Integrated with IntaSend for secure Nigerian payments.

## 🎯 AI Prompt Engineering

The system uses carefully crafted prompts to generate curriculum-aligned lesson plans:

```
You are an expert Nigerian educator. Generate a detailed lesson plan for:
Subject: [subject]
Grade Level: [grade level]  
Topic: [topic]
Duration: [duration in minutes]

Include: objectives, introduction, core content, activities, assessment, homework.
Ensure curriculum alignment and age-appropriate content for Nigerian students.
```

## 📈 Hackathon Goals

✅ Complete MVP with all core features  
✅ Professional UI/UX with modern design  
✅ IntaSend payment integration  
✅ AI-powered lesson generation  
✅ Export and sharing capabilities  
✅ Mobile-responsive design  

## 🚀 Deployment

The application is built with Vite and can be deployed to:
- Vercel (recommended)
- Netlify
- Any static hosting service

## 📣 Credits

Built by **Aniediong Etim** for the SDG 4 Hackathon.  
Empowering Nigerian teachers with AI-powered educational tools.

## 📬 Contact

📧 aniediongetim@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/aniediong-etim-b6224221b)

---

*Supporting SDG 4: Quality Education through innovative technology solutions.*