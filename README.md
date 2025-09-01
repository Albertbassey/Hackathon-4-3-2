# 📚 LessonCraft AI

**Empowering teachers to generate curriculum-aligned lesson plans instantly using AI and low-code tools.**

---

## 🚀 Overview

LessonCraft AI is a web-based tool built for educators, enabling them to create structured, engaging, and curriculum-aligned lesson plans in seconds. Designed for speed, simplicity, and real-world impact, this project supports **SDG 4: Quality Education** and is optimized for deployment in resource-constrained environments.

---

## 🧠 Core Features

- ✏️ **AI Lesson Generator**  
  Teachers input subject, grade level, topic, and duration. The AI generates a complete lesson plan including objectives, activities, assessments, and homework.

- 📤 **Export Options**  
  Copy, email, or save lesson plans to your dashboard.

- 🔐 **User Authentication**  
  Secure login for teachers to manage their lesson history.

- 💳 **Monetization via IntaSend**  
  Premium features unlocked through IntaSend payment gateway.

---

## 🛠️ Tech Stack

| Layer       | Technology Used               |
|-------------|-------------------------------|
| Frontend    | HTML5, CSS3, JavaScript       |
| Backend     | Python (Flask)                |
| Database    | MySQL                         |
| AI Engine   | OpenAI API (GPT-based)        |
| Payments    | IntaSend API                  |

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/Albertbasey/lessoncraft-ai.git
cd lessoncraft-ai

# Set up virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Set up MySQL database
# Create a database named 'lessoncraft'
# Update DB credentials in config.py

# Run the Flask app
flask run

🔐 Environment Variables
Create a .env file and add:

OPENAI_API_KEY=your_openai_key
INTASEND_API_KEY=your_intasend_key
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=lessoncraft

🧠 AI Prompt Used
Here’s the exact prompt used to generate lesson plans via OpenAI:

You are an expert Nigerian educator. Generate a detailed lesson plan for the following inputs:

Subject: [subject]  
Grade Level: [grade level]  
Topic: [topic]  
Duration: [duration in minutes]

Include:
- Lesson objectives  
- Introduction/warm-up activity  
- Core content breakdown  
- Student activities or group work  
- Assessment questions  
- Homework or extension tasks

Ensure the lesson is curriculum-aligned, age-appropriate, and engaging for students in Nigeria.

💰 Monetization Strategy
Freemium Model:

Free: Basic lesson generation

Paid: Curriculum tagging, printable formats, offline access

Pricing:

₦500 per premium lesson

₦3,000 monthly subscription

Payment Gateway: Integrated with IntaSend for secure transactions.


📈 Hackathon Goals
✅ Generate 100+ lesson plans

✅ 10+ premium transactions via IntaSend

✅ Positive feedback from real teachers

✅ Live demo deployed and pitch-ready

📣 Credits
Built by Aniediong for the SDG 4 Hackathon. Mentorship, feedback, and collaboration welcome!

📬 Contact
📧 aniediongetim@gmail.com
linkedin: https://www.linkedin.com/in/aniediong-etim-b6224221b