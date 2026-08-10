export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: number;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: number;
  passingScore: number;
  questions: QuizQuestion[];
};

export const quizzes: Quiz[] = [
  // =====================================================
  // JAVASCRIPT - BASIC
  // =====================================================

  {
    id: "javascript-basics",
    title: "JavaScript Basics",
    description:
      "Learn and test your knowledge of JavaScript fundamentals, variables, data types and operators.",
    category: "JavaScript",
    difficulty: "Easy",
    duration: 10,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "define"],
        answer: 0,
      },
      {
        id: 2,
        question: "Which symbol is used for strict equality?",
        options: ["=", "==", "===", "!="],
        answer: 2,
      },
      {
        id: 3,
        question: "Which data type represents true or false?",
        options: ["String", "Boolean", "Number", "Object"],
        answer: 1,
      },
      {
        id: 4,
        question: "Which method converts JSON text into a JavaScript object?",
        options: [
          "JSON.parse()",
          "JSON.stringify()",
          "JSON.convert()",
          "JSON.object()",
        ],
        answer: 0,
      },
      {
        id: 5,
        question: "Which keyword creates a block-scoped variable?",
        options: ["var", "let", "define", "global"],
        answer: 1,
      },
      {
        id: 6,
        question: "What does typeof 10 return?",
        options: ["integer", "number", "float", "numeric"],
        answer: 1,
      },
      {
        id: 7,
        question: "Which method adds an item to the end of an array?",
        options: ["push()", "pop()", "shift()", "add()"],
        answer: 0,
      },
      {
        id: 8,
        question: "Which method removes the last item from an array?",
        options: ["push()", "remove()", "pop()", "delete()"],
        answer: 2,
      },
      {
        id: 9,
        question: "Which keyword is used to define a function?",
        options: ["function", "func", "method", "define"],
        answer: 0,
      },
      {
        id: 10,
        question: "Which value represents an intentional absence of a value?",
        options: ["undefined", "null", "empty", "false"],
        answer: 1,
      },
    ],
  },

  // =====================================================
  // JAVASCRIPT - ADVANCED
  // =====================================================

  {
    id: "javascript-advanced",
    title: "JavaScript Advanced",
    description:
      "Challenge yourself with closures, promises, async programming, scope and modern JavaScript.",
    category: "JavaScript",
    difficulty: "Hard",
    duration: 15,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "What is a closure in JavaScript?",
        options: [
          "A function with access to its outer scope",
          "A closed browser window",
          "A type of loop",
          "A JavaScript class",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which keyword is used to handle asynchronous promises?",
        options: ["async", "await", "Both A and B", "promise"],
        answer: 2,
      },
      {
        id: 3,
        question: "What does Promise.all() return?",
        options: [
          "A single value",
          "A promise resolving when all promises resolve",
          "An array immediately",
          "A callback",
        ],
        answer: 1,
      },
      {
        id: 4,
        question: "Which statement creates a constant?",
        options: ["let", "var", "const", "static"],
        answer: 2,
      },
      {
        id: 5,
        question: "What does the spread operator look like?",
        options: ["...", "***", "=>", "??"],
        answer: 0,
      },
      {
        id: 6,
        question: "Which method creates a new array by transforming each element?",
        options: ["filter()", "map()", "reduce()", "find()"],
        answer: 1,
      },
      {
        id: 7,
        question: "Which method returns elements that satisfy a condition?",
        options: ["map()", "filter()", "reduce()", "join()"],
        answer: 1,
      },
      {
        id: 8,
        question: "What is event bubbling?",
        options: [
          "Event moving from child toward parent",
          "Event being deleted",
          "Event running twice",
          "Event being paused",
        ],
        answer: 0,
      },
    ],
  },

  // =====================================================
  // REACT
  // =====================================================

  {
    id: "react-development",
    title: "React Development",
    description:
      "Test your React knowledge including components, props, state, hooks and rendering.",
    category: "React",
    difficulty: "Medium",
    duration: 15,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "What is React primarily used for?",
        options: [
          "Building user interfaces",
          "Managing databases",
          "Creating operating systems",
          "Writing SQL queries",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which hook is used to manage state?",
        options: ["useEffect", "useState", "useMemo", "useRef"],
        answer: 1,
      },
      {
        id: 3,
        question: "Which hook is commonly used for side effects?",
        options: ["useState", "useEffect", "useContext", "useId"],
        answer: 1,
      },
      {
        id: 4,
        question: "What are props?",
        options: [
          "Data passed from parent to child",
          "Database records",
          "CSS properties",
          "React packages",
        ],
        answer: 0,
      },
      {
        id: 5,
        question: "What should be used as a unique identifier when rendering lists?",
        options: ["key", "idName", "indexOnly", "unique"],
        answer: 0,
      },
      {
        id: 6,
        question: "JSX allows you to write:",
        options: [
          "HTML-like syntax inside JavaScript",
          "SQL inside CSS",
          "Python inside HTML",
          "Only CSS",
        ],
        answer: 0,
      },
      {
        id: 7,
        question: "Which command is commonly used to create a React project with Vite?",
        options: [
          "npm create vite",
          "npm create react-project",
          "react start vite",
          "vite new react",
        ],
        answer: 0,
      },
      {
        id: 8,
        question: "Which hook is used to store a mutable reference?",
        options: ["useRef", "useState", "useMemo", "useEffect"],
        answer: 0,
      },
    ],
  },

  // =====================================================
  // PYTHON
  // =====================================================

  {
    id: "python-basics",
    title: "Python Basics",
    description:
      "Test your Python fundamentals including variables, lists, functions, loops and conditions.",
    category: "Python",
    difficulty: "Easy",
    duration: 12,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "fun", "define"],
        answer: 1,
      },
      {
        id: 2,
        question: "Which symbol is used to create a comment?",
        options: ["//", "#", "/*", "--"],
        answer: 1,
      },
      {
        id: 3,
        question: "Which data structure stores ordered items?",
        options: ["List", "Set", "Dictionary", "None"],
        answer: 0,
      },
      {
        id: 4,
        question: "Which keyword is used for a loop over a sequence?",
        options: ["foreach", "for", "loop", "repeat"],
        answer: 1,
      },
      {
        id: 5,
        question: "What is the extension of a Python file?",
        options: [".java", ".py", ".python", ".pt"],
        answer: 1,
      },
      {
        id: 6,
        question: "Which function prints output?",
        options: ["console.log()", "print()", "echo()", "write()"],
        answer: 1,
      },
      {
        id: 7,
        question: "Which value represents no value in Python?",
        options: ["null", "undefined", "None", "empty"],
        answer: 2,
      },
      {
        id: 8,
        question: "Which operator is used for exponentiation?",
        options: ["^", "**", "//", "%%"],
        answer: 1,
      },
    ],
  },

  // =====================================================
  // HTML
  // =====================================================

  {
    id: "html-basics",
    title: "HTML Fundamentals",
    description:
      "Test your knowledge of HTML elements, structure, forms, links and semantic tags.",
    category: "HTML",
    difficulty: "Easy",
    duration: 10,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Text Machine Language",
          "Hyper Tool Multi Language",
          "Home Tool Markup Language",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which tag is used for the largest heading?",
        options: ["<heading>", "<h6>", "<h1>", "<head>"],
        answer: 2,
      },
      {
        id: 3,
        question: "Which tag creates a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1,
      },
      {
        id: 4,
        question: "Which tag is used to display an image?",
        options: ["<image>", "<img>", "<picture>", "<src>"],
        answer: 1,
      },
      {
        id: 5,
        question: "Which attribute provides alternative text for an image?",
        options: ["title", "alt", "src", "text"],
        answer: 1,
      },
      {
        id: 6,
        question: "Which tag creates an unordered list?",
        options: ["<ol>", "<list>", "<ul>", "<li>"],
        answer: 2,
      },
      {
        id: 7,
        question: "Which tag is used to create a form?",
        options: ["<input>", "<form>", "<field>", "<submit>"],
        answer: 1,
      },
      {
        id: 8,
        question: "Which HTML tag represents navigation links?",
        options: ["<navigation>", "<nav>", "<menu>", "<links>"],
        answer: 1,
      },
    ],
  },

  // =====================================================
  // CSS
  // =====================================================

  {
    id: "css-fundamentals",
    title: "CSS Fundamentals",
    description:
      "Learn and test CSS concepts including selectors, Flexbox, Grid, spacing and responsive design.",
    category: "CSS",
    difficulty: "Easy",
    duration: 10,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "What does CSS stand for?",
        options: [
          "Cascading Style Sheets",
          "Creative Style System",
          "Computer Style Sheets",
          "Colorful Style Syntax",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which property changes text color?",
        options: ["font-color", "text-color", "color", "foreground"],
        answer: 2,
      },
      {
        id: 3,
        question: "Which property changes the background color?",
        options: ["bg-color", "background-color", "color-bg", "background"],
        answer: 1,
      },
      {
        id: 4,
        question: "Which CSS layout system is designed for one-dimensional layouts?",
        options: ["Grid", "Flexbox", "Float", "Position"],
        answer: 1,
      },
      {
        id: 5,
        question: "Which property controls space inside an element?",
        options: ["margin", "padding", "spacing", "gap"],
        answer: 1,
      },
      {
        id: 6,
        question: "Which property controls space outside an element?",
        options: ["padding", "margin", "border", "outside"],
        answer: 1,
      },
      {
        id: 7,
        question: "Which unit is relative to the root font size?",
        options: ["px", "em", "rem", "%"],
        answer: 2,
      },
      {
        id: 8,
        question: "Which property makes an element a flex container?",
        options: [
          "display: flex",
          "position: flex",
          "flex: display",
          "layout: flex",
        ],
        answer: 0,
      },
    ],
  },

  // =====================================================
  // TYPESCRIPT
  // =====================================================

  {
    id: "typescript-basics",
    title: "TypeScript Basics",
    description:
      "Test your knowledge of types, interfaces, functions, unions and TypeScript fundamentals.",
    category: "TypeScript",
    difficulty: "Medium",
    duration: 12,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "TypeScript is a superset of which language?",
        options: ["Python", "JavaScript", "Java", "C++"],
        answer: 1,
      },
      {
        id: 2,
        question: "Which keyword defines an interface?",
        options: ["type", "interface", "struct", "object"],
        answer: 1,
      },
      {
        id: 3,
        question: "Which type represents text?",
        options: ["text", "string", "char", "StringText"],
        answer: 1,
      },
      {
        id: 4,
        question: "Which type represents true or false?",
        options: ["bool", "boolean", "BooleanValue", "bit"],
        answer: 1,
      },
      {
        id: 5,
        question: "What does a union type allow?",
        options: [
          "Multiple possible types",
          "Only strings",
          "Only objects",
          "No types",
        ],
        answer: 0,
      },
      {
        id: 6,
        question: "Which symbol is commonly used for a union?",
        options: ["&", "|", "||", "+"],
        answer: 1,
      },
      {
        id: 7,
        question: "Which file extension is commonly used for TypeScript?",
        options: [".ts", ".typescript", ".tsxonly", ".type"],
        answer: 0,
      },
      {
        id: 8,
        question: "Which extension is used for TypeScript with JSX?",
        options: [".jsx", ".tsx", ".tsjsx", ".react"],
        answer: 1,
      },
    ],
  },

  // =====================================================
  // SQL
  // =====================================================

  {
    id: "sql-basics",
    title: "SQL Fundamentals",
    description:
      "Test your database knowledge with SELECT, INSERT, UPDATE, DELETE, JOIN and filtering.",
    category: "SQL",
    difficulty: "Medium",
    duration: 15,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "Which SQL statement is used to retrieve data?",
        options: ["GET", "SELECT", "FETCH", "READ"],
        answer: 1,
      },
      {
        id: 2,
        question: "Which command adds new records?",
        options: ["ADD", "INSERT", "CREATE", "PUSH"],
        answer: 1,
      },
      {
        id: 3,
        question: "Which command modifies existing records?",
        options: ["CHANGE", "UPDATE", "MODIFY", "ALTER"],
        answer: 1,
      },
      {
        id: 4,
        question: "Which command removes records?",
        options: ["REMOVE", "DELETE", "DROP ROW", "CLEAR"],
        answer: 1,
      },
      {
        id: 5,
        question: "Which clause filters records?",
        options: ["FILTER", "WHERE", "WHEN", "HAVING ONLY"],
        answer: 1,
      },
      {
        id: 6,
        question: "Which keyword sorts query results?",
        options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE"],
        answer: 1,
      },
      {
        id: 7,
        question: "Which JOIN returns matching rows from both tables?",
        options: ["INNER JOIN", "OUTER JOIN", "FULL JOIN", "MATCH JOIN"],
        answer: 0,
      },
      {
        id: 8,
        question: "Which command creates a table?",
        options: ["NEW TABLE", "CREATE TABLE", "MAKE TABLE", "BUILD TABLE"],
        answer: 1,
      },
    ],
  },

  // =====================================================
  // GIT
  // =====================================================

  {
    id: "git-github",
    title: "Git & GitHub",
    description:
      "Test your knowledge of Git commands, repositories, commits, branches and GitHub workflows.",
    category: "Git",
    difficulty: "Medium",
    duration: 12,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "Which command initializes a Git repository?",
        options: ["git start", "git init", "git create", "git new"],
        answer: 1,
      },
      {
        id: 2,
        question: "Which command checks the current repository status?",
        options: ["git check", "git status", "git state", "git info"],
        answer: 1,
      },
      {
        id: 3,
        question: "Which command creates a commit?",
        options: ["git save", "git commit", "git push", "git record"],
        answer: 1,
      },
      {
        id: 4,
        question: "Which command sends commits to a remote repository?",
        options: ["git send", "git push", "git upload", "git publish"],
        answer: 1,
      },
      {
        id: 5,
        question: "Which command downloads changes from a remote repository?",
        options: ["git pull", "git download", "git fetch-all", "git receive"],
        answer: 0,
      },
      {
        id: 6,
        question: "Which command creates a new branch?",
        options: [
          "git branch branch-name",
          "git new branch-name",
          "git create branch-name",
          "git make branch-name",
        ],
        answer: 0,
      },
      {
        id: 7,
        question: "What is GitHub?",
        options: [
          "A database",
          "A cloud platform for Git repositories",
          "A programming language",
          "A CSS framework",
        ],
        answer: 1,
      },
      {
        id: 8,
        question: "Which command stages files?",
        options: ["git stage", "git add", "git prepare", "git include"],
        answer: 1,
      },
    ],
  },

  // =====================================================
  // NEXT.JS
  // =====================================================

  {
    id: "nextjs-basics",
    title: "Next.js Fundamentals",
    description:
      "Test your Next.js knowledge including App Router, pages, routing, server components and layouts.",
    category: "Next.js",
    difficulty: "Medium",
    duration: 15,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "Next.js is built on top of which library?",
        options: ["Vue", "React", "Angular", "Svelte"],
        answer: 1,
      },
      {
        id: 2,
        question: "Which folder is used by the App Router?",
        options: ["pages", "app", "routes", "src/pages"],
        answer: 1,
      },
      {
        id: 3,
        question: "Which file defines a page in the App Router?",
        options: ["index.tsx", "page.tsx", "route.tsx", "screen.tsx"],
        answer: 1,
      },
      {
        id: 4,
        question: "Which file defines a shared layout?",
        options: ["layout.tsx", "main.tsx", "wrapper.tsx", "app.tsx"],
        answer: 0,
      },
      {
        id: 5,
        question: "What directive creates a Client Component?",
        options: [
          '"use client"',
          '"client"',
          '"use browser"',
          '"client component"',
        ],
        answer: 0,
      },
      {
        id: 6,
        question: "Which component is commonly used for internal navigation?",
        options: ["Navigate", "Link", "RouterLink", "NextLinkOnly"],
        answer: 1,
      },
      {
        id: 7,
        question: "Which framework feature can optimize images?",
        options: ["next/image", "next/photo", "next/img", "next/media"],
        answer: 0,
      },
      {
        id: 8,
        question: "Which hook is commonly used to access the current route parameters?",
        options: ["useParams", "useRoute", "usePath", "usePage"],
        answer: 0,
      },
    ],
  },

  // =====================================================
  // NODE.JS
  // =====================================================

  {
    id: "nodejs-basics",
    title: "Node.js Fundamentals",
    description:
      "Learn Node.js fundamentals including modules, npm, APIs, server concepts and asynchronous programming.",
    category: "Node.js",
    difficulty: "Medium",
    duration: 15,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "Node.js is built on which JavaScript engine?",
        options: ["SpiderMonkey", "V8", "Chakra", "JavaScriptCore"],
        answer: 1,
      },
      {
        id: 2,
        question: "What is npm?",
        options: [
          "Node Package Manager",
          "Node Programming Method",
          "New Package Module",
          "Node Process Manager",
        ],
        answer: 0,
      },
      {
        id: 3,
        question: "Which file usually contains npm project information?",
        options: ["project.json", "package.json", "npm.json", "node.json"],
        answer: 1,
      },
      {
        id: 4,
        question: "Which command installs dependencies?",
        options: ["npm get", "npm install", "npm add-all", "npm dependencies"],
        answer: 1,
      },
      {
        id: 5,
        question: "Node.js is commonly used for:",
        options: [
          "Backend development",
          "Only CSS",
          "Only databases",
          "Image editing",
        ],
        answer: 0,
      },
      {
        id: 6,
        question: "Which module is used for working with files?",
        options: ["file", "fs", "files", "storage"],
        answer: 1,
      },
      {
        id: 7,
        question: "Node.js uses which model heavily for I/O?",
        options: [
          "Blocking only",
          "Event-driven asynchronous",
          "Manual threading only",
          "Static execution",
        ],
        answer: 1,
      },
      {
        id: 8,
        question: "Which command runs a package script named dev?",
        options: ["npm dev", "npm run dev", "node dev", "npm start-dev"],
        answer: 1,
      },
    ],
  },

  // =====================================================
  // WEB DEVELOPMENT
  // =====================================================

  {
    id: "web-development-basics",
    title: "Web Development Basics",
    description:
      "A complete beginner-friendly quiz covering HTML, CSS, JavaScript, browsers and web fundamentals.",
    category: "Web Development",
    difficulty: "Easy",
    duration: 12,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "Which language structures a web page?",
        options: ["HTML", "CSS", "SQL", "Python"],
        answer: 0,
      },
      {
        id: 2,
        question: "Which language styles a web page?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: 1,
      },
      {
        id: 3,
        question: "Which language adds interactivity to websites?",
        options: ["CSS", "HTML", "JavaScript", "SQL"],
        answer: 2,
      },
      {
        id: 4,
        question: "What does URL stand for?",
        options: [
          "Uniform Resource Locator",
          "Universal Resource Link",
          "Uniform Routing Language",
          "User Resource Location",
        ],
        answer: 0,
      },
      {
        id: 5,
        question: "Which protocol is commonly used for secure web communication?",
        options: ["FTP", "HTTP", "HTTPS", "SMTP"],
        answer: 2,
      },
      {
        id: 6,
        question: "Which tool is commonly used to inspect a webpage?",
        options: [
          "Browser DevTools",
          "Photoshop",
          "Excel",
          "Notepad only",
        ],
        answer: 0,
      },
      {
        id: 7,
        question: "What does API stand for?",
        options: [
          "Application Programming Interface",
          "Application Page Internet",
          "Advanced Programming Input",
          "Application Process Integration",
        ],
        answer: 0,
      },
      {
        id: 8,
        question: "Which HTTP method is commonly used to retrieve data?",
        options: ["POST", "GET", "DELETE", "PATCH"],
        answer: 1,
      },
    ],
  },
];

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === id);
}
