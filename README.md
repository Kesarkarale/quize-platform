# 🎯 QuizMaster – Online Quiz & Assessment Platform

**QuizMaster** is a modern, web-based online quiz and assessment platform designed to help students learn, practice, evaluate their knowledge and track their performance.

The platform provides separate **Student** and **Admin** roles with role-based access and dashboards.

---

## 🚀 Features

### 🎓 Student Features

* Student Registration & Login
* Student Dashboard
* Browse Available Quizzes
* Search and Filter Quizzes
* Category-based Quizzes
* Level-based Quiz System
* Progressive Level Unlocking
* Easy to Advanced Difficulty
* Timed Assessments
* Multiple Choice Questions
* Question Navigation
* Automatic Score Calculation
* Pass / Fail Evaluation
* Level Completion Popup 🎉
* Success & Failure Sounds
* Retry Quiz Option
* Quiz Results
* Performance Tracking
* Leaderboard

### 🛡️ Admin Features

* Admin Authentication
* Admin Dashboard
* Student/User Management
* Quiz Management
* Create Quizzes
* Edit Quizzes
* Delete Quizzes
* Question Management
* Category Management
* Difficulty Management
* Quiz Attempt Monitoring
* Student Results
* Performance Analytics
* Leaderboard Management
* User Activation / Deactivation
* Admin Settings

---

## 🎮 Level-Based Quiz System

QuizMaster includes a progressive level-based learning system.

Initially, only **Level 1** is unlocked.

After successfully completing a level, the next level becomes available.

### Example

```text
Level 1  ✅
Level 2  🔒
Level 3  🔒
Level 4  🔒
Level 5  🔒
...
Level 100+ 🔒
```

As the student progresses:

* Question count gradually increases
* Difficulty increases
* Timer duration increases
* Questions become more challenging

This creates a structured learning experience instead of a simple quiz system.

---

## ⏱️ Timed Assessments

Each quiz level has a countdown timer.

For example:

```text
Level 1 → 3 Minutes
Level 5 → Increased Difficulty
Level 10 → More Questions
Level 15 → Advanced Difficulty
```

The timer automatically submits the assessment when it reaches zero.

---

## 🏆 Scoring System

After completing a level, the system automatically calculates:

* Correct Answers
* Total Questions
* Score Percentage
* Passing Score
* Pass / Fail Status

### Pass

The student receives a level completion notification:

```text
🎉 Level Completed!
Congratulations!
You unlocked the next level.
```

### Fail

The student receives:

```text
Keep Practicing! 💪
Review the concepts and try again.
```

The student can retry the level.

---

## 🔐 Authentication & Authorization

QuizMaster uses role-based authentication.

There are two main roles:

| Role       | Access                                        |
| ---------- | --------------------------------------------- |
| 🎓 Student | Quizzes, Attempts, Results, Progress          |
| 🛡️ Admin  | Users, Quizzes, Questions, Results, Analytics |

Students cannot access protected Admin functionality.

---

## 🧑‍💻 Quiz Categories

The platform supports multiple technical categories, including:

* JavaScript
* React
* Python
* HTML & CSS
* Database
* Cyber Security
* Programming
* Web Development

Additional categories can be added through the Admin Dashboard.

---

## 🛠️ Technology Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**

### Backend & Database

* **Supabase**
* **PostgreSQL**
* **Supabase Authentication**

### UI & Animation

* **Lucide React**
* **Framer Motion**

### Development & Deployment

* **Git**
* **GitHub**
* **Vercel**

---

## 📁 Project Structure

```text
quizmaster/
│
├── app/
│   ├── admin/
│   │   └── dashboard/
│   │
│   ├── student/
│   │   └── dashboard/
│   │
│   ├── quiz/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   │
│   ├── login/
│   │
│   ├── register/
│   │
│   └── page.tsx
│
├── components/
│   ├── layout/
│   └── ui/
│
├── lib/
│   ├── quiz-data.ts
│   └── supabase/
│
├── public/
│   └── sounds/
│
├── middleware.ts
│
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/quizmaster.git
```

### 2. Navigate to the Project

```bash
cd quizmaster
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Never commit secret keys or `.env.local` to GitHub.

---

## ▶️ Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🗄️ Database

QuizMaster uses **Supabase PostgreSQL** for storing application data.

Main data includes:

* User Profiles
* Roles
* Quizzes
* Questions
* Categories
* Quiz Attempts
* Results
* Performance Data

Example user roles:

```text
STUDENT
ADMIN
```

---

## 🔒 Security

The application uses:

* Supabase Authentication
* Role-based authorization
* Protected routes
* Middleware
* Database Row Level Security
* Secure environment variables

Admin functionality is protected from normal student accounts.

---

## 📊 Main Pages

### Public

```text
/
 /login
 /register
```

### Student

```text
/student/dashboard
/quiz
/quiz/[id]
/leaderboard
```

### Admin

```text
/admin/dashboard
/admin/quizzes
/admin/questions
/admin/categories
/admin/difficulty
/admin/attempts
/admin/results
/admin/analytics
/admin/leaderboard
/admin/settings
```

---

## 🎨 UI Design

QuizMaster follows a modern dark-themed interface with:

* Responsive layout
* Glassmorphism cards
* Smooth animations
* Interactive buttons
* Progress indicators
* Modern dashboards
* Mobile-friendly design

---

## 📈 Future Improvements

Planned improvements include:

* Real-time leaderboard
* Advanced performance analytics
* Question explanations
* Certificate generation
* Email notifications
* More programming categories
* Randomized questions
* Difficulty-based question selection
* Achievement badges
* Streak system
* Cloud deployment improvements

---

## 👩‍💻 Developer

**Kesar Karale**

Developed as an academic/project-based **Online Quiz & Assessment Platform**.

---

## 📄 License

This project is developed for educational and academic purposes.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**QuizMaster — Learn • Practice • Master 🚀**
