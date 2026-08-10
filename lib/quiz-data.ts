export type QuizDifficulty = "Easy" | "Medium" | "Hard";

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
};

export type Quiz = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: QuizDifficulty;
  duration: number;
  questions: QuizQuestion[];
  passingScore: number;
};

export type QuizLevel = {
  level: number;
  questionsCount: number;
  duration: number;
  difficulty: QuizDifficulty;
};

/* =========================================================
   QUESTION BANKS
========================================================= */

const javascriptQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var", "define", "int", "string"],
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
    question: "Which method converts JSON string into a JavaScript object?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.object()",
    ],
    answer: 0,
  },
  {
    id: 4,
    question: "Which of these is a JavaScript array?",
    options: [
      '{ name: "John" }',
      "[1, 2, 3]",
      '"Hello"',
      "42",
    ],
    answer: 1,
  },
  {
    id: 5,
    question: "Which keyword creates a block-scoped variable?",
    options: ["var", "let", "define", "variable"],
    answer: 1,
  },
  {
    id: 6,
    question: "Which method adds an item to the end of an array?",
    options: ["push()", "pop()", "shift()", "slice()"],
    answer: 0,
  },
  {
    id: 7,
    question: "What does typeof null return?",
    options: ["null", "object", "undefined", "boolean"],
    answer: 1,
  },
  {
    id: 8,
    question: "Which function is used to delay execution?",
    options: [
      "setTimeout()",
      "delay()",
      "wait()",
      "setDelay()",
    ],
    answer: 0,
  },
  {
    id: 9,
    question: "Which method removes the last element from an array?",
    options: ["push()", "pop()", "remove()", "delete()"],
    answer: 1,
  },
  {
    id: 10,
    question: "Which keyword is used to define a function?",
    options: ["function", "func", "define", "method"],
    answer: 0,
  },
  {
    id: 11,
    question: "What does NaN stand for?",
    options: [
      "Not a Number",
      "New and Null",
      "No assigned Number",
      "Negative Number",
    ],
    answer: 0,
  },
  {
    id: 12,
    question: "Which operator is used for logical AND?",
    options: ["||", "&&", "!", "&"],
    answer: 1,
  },
  {
    id: 13,
    question: "Which method creates a new array by transforming every element?",
    options: ["map()", "filter()", "find()", "reduce()"],
    answer: 0,
  },
  {
    id: 14,
    question: "Which method returns elements that satisfy a condition?",
    options: ["map()", "filter()", "join()", "push()"],
    answer: 1,
  },
  {
    id: 15,
    question: "Which keyword refers to the current object context?",
    options: ["self", "this", "current", "object"],
    answer: 1,
  },
];

const reactQuestions: QuizQuestion[] = [
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
    question: "Which syntax is commonly used to write React components?",
    options: ["JSX", "JQuery", "XML only", "SQL"],
    answer: 0,
  },
  {
    id: 3,
    question: "Which hook is used to manage state?",
    options: ["useState", "useRoute", "useClass", "useData"],
    answer: 0,
  },
  {
    id: 4,
    question: "Which hook is used for side effects?",
    options: ["useEffect", "useSide", "useAction", "useEvent"],
    answer: 0,
  },
  {
    id: 5,
    question: "What prop is commonly used as a unique identifier when rendering lists?",
    options: ["id", "key", "unique", "indexKey"],
    answer: 1,
  },
  {
    id: 6,
    question: "What does JSX allow developers to write?",
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
    question: "Can React state be changed directly?",
    options: [
      "Yes, always",
      "No, use state setter",
      "Only with CSS",
      "Only with HTML",
    ],
    answer: 1,
  },
  {
    id: 8,
    question: "Which command creates a React project with Vite?",
    options: [
      "npm create vite@latest",
      "npm react start",
      "react create vite",
      "vite react install",
    ],
    answer: 0,
  },
  {
    id: 9,
    question: "What is a React component?",
    options: [
      "Reusable UI building block",
      "Database table",
      "CSS file",
      "Server",
    ],
    answer: 0,
  },
  {
    id: 10,
    question: "Which hook can memoize a calculated value?",
    options: ["useMemo", "useValue", "useCacheOnly", "useStore"],
    answer: 0,
  },
];

const pythonQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which keyword prints output in Python?",
    options: ["print", "echo", "console", "write"],
    answer: 0,
  },
  {
    id: 2,
    question: "Which symbol starts a comment in Python?",
    options: ["//", "#", "/*", "--"],
    answer: 1,
  },
  {
    id: 3,
    question: "Which data type stores multiple ordered values?",
    options: ["list", "int", "bool", "float"],
    answer: 0,
  },
  {
    id: 4,
    question: "Which keyword defines a function?",
    options: ["function", "def", "func", "define"],
    answer: 1,
  },
  {
    id: 5,
    question: "Which extension is commonly used for Python files?",
    options: [".java", ".py", ".js", ".python"],
    answer: 1,
  },
  {
    id: 6,
    question: "Which value represents Boolean true?",
    options: ["true", "TRUE", "True", "1"],
    answer: 2,
  },
  {
    id: 7,
    question: "Which method adds an item to a Python list?",
    options: ["push()", "append()", "add()", "insertEnd()"],
    answer: 1,
  },
  {
    id: 8,
    question: "Which keyword is used for a loop over a sequence?",
    options: ["for", "loop", "repeat", "each"],
    answer: 0,
  },
  {
    id: 9,
    question: "Which collection stores key-value pairs?",
    options: ["list", "tuple", "dictionary", "set"],
    answer: 2,
  },
  {
    id: 10,
    question: "Which function returns the length of an object?",
    options: ["size()", "length()", "len()", "count()"],
    answer: 2,
  },
];

const htmlQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlink Text Management Language",
      "Home Tool Markup Language",
    ],
    answer: 0,
  },
  {
    id: 2,
    question: "Which tag creates a paragraph?",
    options: ["<p>", "<para>", "<text>", "<paragraph>"],
    answer: 0,
  },
  {
    id: 3,
    question: "Which tag creates a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1,
  },
  {
    id: 4,
    question: "Which tag displays an image?",
    options: ["<image>", "<img>", "<picture>", "<src>"],
    answer: 1,
  },
  {
    id: 5,
    question: "Which tag is used for the largest heading?",
    options: ["<heading>", "<h6>", "<h1>", "<head>"],
    answer: 2,
  },
  {
    id: 6,
    question: "Which attribute specifies an image URL?",
    options: ["href", "src", "url", "link"],
    answer: 1,
  },
  {
    id: 7,
    question: "Which element contains metadata?",
    options: ["<body>", "<meta>", "<main>", "<footer>"],
    answer: 1,
  },
  {
    id: 8,
    question: "Which tag creates an unordered list?",
    options: ["<ol>", "<ul>", "<list>", "<li>"],
    answer: 1,
  },
  {
    id: 9,
    question: "Which tag defines a table row?",
    options: ["<td>", "<th>", "<tr>", "<table-row>"],
    answer: 2,
  },
  {
    id: 10,
    question: "Which semantic element represents navigation?",
    options: ["<navigate>", "<nav>", "<navigation>", "<menu-nav>"],
    answer: 1,
  },
];

const cssQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style System",
      "Creative Style Syntax",
      "Colorful Style Sheets",
    ],
    answer: 0,
  },
  {
    id: 2,
    question: "Which property changes text color?",
    options: ["font-color", "color", "text-color", "foreground"],
    answer: 1,
  },
  {
    id: 3,
    question: "Which property changes background color?",
    options: ["background-color", "bg-color", "color-background", "background"],
    answer: 0,
  },
  {
    id: 4,
    question: "Which CSS property controls spacing inside an element?",
    options: ["margin", "padding", "spacing", "inside"],
    answer: 1,
  },
  {
    id: 5,
    question: "Which property controls spacing outside an element?",
    options: ["padding", "margin", "gap-outside", "space"],
    answer: 1,
  },
  {
    id: 6,
    question: "Which display value enables Flexbox?",
    options: ["display: flex", "display: box", "flex: true", "layout: flex"],
    answer: 0,
  },
  {
    id: 7,
    question: "Which CSS unit is relative to the root font size?",
    options: ["px", "em", "rem", "vh"],
    answer: 2,
  },
  {
    id: 8,
    question: "Which property makes text bold?",
    options: ["font-weight", "text-bold", "font-bold", "weight"],
    answer: 0,
  },
  {
    id: 9,
    question: "Which property rounds corners?",
    options: ["corner-radius", "border-radius", "radius", "round"],
    answer: 1,
  },
  {
    id: 10,
    question: "Which property controls element transparency?",
    options: ["transparent", "opacity", "visibility", "alpha"],
    answer: 1,
  },
];

const typescriptQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is TypeScript?",
    options: [
      "A typed superset of JavaScript",
      "A database",
      "A CSS framework",
      "A browser",
    ],
    answer: 0,
  },
  {
    id: 2,
    question: "Which extension is commonly used for TypeScript?",
    options: [".ts", ".type", ".typescript", ".tsxonly"],
    answer: 0,
  },
  {
    id: 3,
    question: "Which keyword defines a type alias?",
    options: ["type", "typedef", "alias", "interfaceOnly"],
    answer: 0,
  },
  {
    id: 4,
    question: "Which extension is used for TypeScript + JSX?",
    options: [".jsx", ".tsx", ".tsjsx", ".react"],
    answer: 1,
  },
  {
    id: 5,
    question: "Which type represents text?",
    options: ["text", "String", "string", "char"],
    answer: 2,
  },
  {
    id: 6,
    question: "Which type represents true or false?",
    options: ["bool", "boolean", "BooleanValue", "truth"],
    answer: 1,
  },
  {
    id: 7,
    question: "Which keyword defines an interface?",
    options: ["interface", "contract", "shape", "struct"],
    answer: 0,
  },
  {
    id: 8,
    question: "Does TypeScript run directly in browsers?",
    options: [
      "Yes, always",
      "No, it is generally compiled to JavaScript",
      "Only in Chrome",
      "Only in Next.js",
    ],
    answer: 1,
  },
  {
    id: 9,
    question: "Which type represents any value?",
    options: ["unknown", "any", "all", "value"],
    answer: 1,
  },
  {
    id: 10,
    question: "Which type is safer than any for unknown values?",
    options: ["unknown", "safe", "object", "mixed"],
    answer: 0,
  },
];

const sqlQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which SQL command retrieves data?",
    options: ["SELECT", "GET", "FETCH", "READ"],
    answer: 0,
  },
  {
    id: 2,
    question: "Which command adds a new row?",
    options: ["ADD", "INSERT", "CREATE ROW", "PUSH"],
    answer: 1,
  },
  {
    id: 3,
    question: "Which command modifies existing data?",
    options: ["CHANGE", "UPDATE", "MODIFY", "EDIT"],
    answer: 1,
  },
  {
    id: 4,
    question: "Which command removes rows?",
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
    question: "Which keyword sorts results?",
    options: ["SORT BY", "ORDER BY", "ARRANGE", "GROUP SORT"],
    answer: 1,
  },
  {
    id: 7,
    question: "Which clause groups rows?",
    options: ["GROUP BY", "COLLECT BY", "ORDER GROUP", "JOIN BY"],
    answer: 0,
  },
  {
    id: 8,
    question: "Which command creates a table?",
    options: ["MAKE TABLE", "CREATE TABLE", "NEW TABLE", "BUILD TABLE"],
    answer: 1,
  },
  {
    id: 9,
    question: "Which function counts rows?",
    options: ["COUNT()", "TOTAL()", "ROWS()", "NUMBER()"],
    answer: 0,
  },
  {
    id: 10,
    question: "Which keyword combines rows from related tables?",
    options: ["COMBINE", "JOIN", "MERGE ROW", "CONNECT"],
    answer: 1,
  },
];

const gitQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which command initializes a Git repository?",
    options: ["git start", "git init", "git create", "git new"],
    answer: 1,
  },
  {
    id: 2,
    question: "Which command shows repository status?",
    options: ["git check", "git status", "git info", "git state"],
    answer: 1,
  },
  {
    id: 3,
    question: "Which command stages files?",
    options: ["git stage", "git add", "git push", "git prepare"],
    answer: 1,
  },
  {
    id: 4,
    question: "Which command creates a commit?",
    options: ["git save", "git commit", "git store", "git record"],
    answer: 1,
  },
  {
    id: 5,
    question: "Which command uploads commits to a remote repository?",
    options: ["git upload", "git push", "git send", "git publish"],
    answer: 1,
  },
  {
    id: 6,
    question: "Which command downloads remote changes?",
    options: ["git pull", "git download", "git fetch-all", "git receive"],
    answer: 0,
  },
  {
    id: 7,
    question: "Which platform is commonly used for Git repositories?",
    options: ["GitHub", "Photoshop", "Figma", "MySQL"],
    answer: 0,
  },
  {
    id: 8,
    question: "Which command creates a new branch?",
    options: ["git branch", "git newbranch", "git create", "git fork"],
    answer: 0,
  },
  {
    id: 9,
    question: "Which command changes branches?",
    options: ["git move", "git checkout", "git switcher", "git change"],
    answer: 1,
  },
  {
    id: 10,
    question: "What is a Git commit?",
    options: [
      "A saved snapshot of changes",
      "A database",
      "A branch",
      "A remote server",
    ],
    answer: 0,
  },
];

/* =========================================================
   QUIZ LIST
========================================================= */

export const quizzes: Quiz[] = [
  {
    id: "javascript",
    title: "JavaScript Fundamentals",
    description:
      "Master JavaScript from basic syntax to advanced concepts.",
    category: "JavaScript",
    difficulty: "Easy",
    duration: 3,
    questions: javascriptQuestions,
    passingScore: 60,
  },
  {
    id: "react",
    title: "React Development",
    description:
      "Learn React components, hooks, props and state management.",
    category: "React",
    difficulty: "Medium",
    duration: 3,
    questions: reactQuestions,
    passingScore: 60,
  },
  {
    id: "python",
    title: "Python Programming",
    description:
      "Build your Python knowledge from beginner to advanced level.",
    category: "Python",
    difficulty: "Easy",
    duration: 3,
    questions: pythonQuestions,
    passingScore: 60,
  },
  {
    id: "html",
    title: "HTML Fundamentals",
    description:
      "Test your knowledge of HTML structure and semantic elements.",
    category: "HTML",
    difficulty: "Easy",
    duration: 3,
    questions: htmlQuestions,
    passingScore: 60,
  },
  {
    id: "css",
    title: "CSS Mastery",
    description:
      "Practice CSS layouts, styling, responsive design and more.",
    category: "CSS",
    difficulty: "Easy",
    duration: 3,
    questions: cssQuestions,
    passingScore: 60,
  },
  {
    id: "typescript",
    title: "TypeScript",
    description:
      "Test your TypeScript knowledge including types and interfaces.",
    category: "TypeScript",
    difficulty: "Medium",
    duration: 3,
    questions: typescriptQuestions,
    passingScore: 60,
  },
  {
    id: "sql",
    title: "SQL & Databases",
    description:
      "Practice SQL queries, filtering, joins, grouping and databases.",
    category: "SQL",
    difficulty: "Medium",
    duration: 3,
    questions: sqlQuestions,
    passingScore: 60,
  },
  {
    id: "git",
    title: "Git & GitHub",
    description:
      "Learn Git commands, branches, commits and GitHub workflow.",
    category: "Git",
    difficulty: "Easy",
    duration: 3,
    questions: gitQuestions,
    passingScore: 60,
  },
];

/* =========================================================
   GET QUIZ
========================================================= */

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find((quiz) => quiz.id === id);
}

/* =========================================================
   LEVEL CONFIG
========================================================= */

export function getLevelDifficulty(level: number): QuizDifficulty {
  if (level <= 10) return "Easy";
  if (level <= 30) return "Medium";
  return "Hard";
}

export function getLevelQuestionsCount(level: number): number {
  if (level <= 5) return 5;
  if (level <= 10) return 7;
  if (level <= 20) return 10;
  if (level <= 50) return 15;
  return 20;
}

export function getLevelDuration(level: number): number {
  /*
    Level 1 = 3 min
    Level 2 = 6 min
    Level 3 = 9 min
    Level 4 = 12 min
    Level 5 = 15 min

    After level 5 timer slowly increases.
  */

  if (level <= 5) {
    return level * 3;
  }

  return Math.min(30, 15 + Math.floor((level - 5) / 5) * 2);
}

export function getQuizLevel(level: number): QuizLevel {
  return {
    level,
    questionsCount: getLevelQuestionsCount(level),
    duration: getLevelDuration(level),
    difficulty: getLevelDifficulty(level),
  };
}

/* =========================================================
   CREATE QUESTIONS FOR LEVEL
========================================================= */

export function getQuestionsForLevel(
  quiz: Quiz,
  level: number
): QuizQuestion[] {
  const count = getLevelQuestionsCount(level);

  const difficulty = getLevelDifficulty(level);

  /*
    We use the existing question bank and rotate it.
    Later you can add 100+ unique questions per subject.
  */

  const bank = quiz.questions;

  const startIndex = ((level - 1) * count) % bank.length;

  const questions: QuizQuestion[] = [];

  for (let i = 0; i < count; i++) {
    const question = bank[(startIndex + i) % bank.length];

    if (!question) continue;

    questions.push({
      ...question,
      id: i + 1,
    });
  }

  /*
    Difficulty is controlled by level.
    Questions can later be separated into
    Easy / Medium / Hard question banks.
  */

  void difficulty;

  return questions;
}
