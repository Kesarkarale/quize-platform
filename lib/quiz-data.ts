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
  questions: QuizQuestion[];
  passingScore: number;
};

export const quizzes: Quiz[] = [
  // =====================================================
  // JAVASCRIPT
  // =====================================================
  {
    id: "javascript",
    title: "JavaScript Fundamentals",
    description:
      "Test your knowledge of JavaScript fundamentals, syntax, variables, functions and modern concepts.",
    category: "JavaScript",
    difficulty: "Medium",
    duration: 20,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "Which keyword is used to declare a block-scoped variable?",
        options: ["var", "let", "define", "constant"],
        answer: 1,
      },
      {
        id: 2,
        question: "Which method is used to add an item to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: 0,
      },
      {
        id: 3,
        question: "What does === check in JavaScript?",
        options: [
          "Only value",
          "Only type",
          "Value and type",
          "Variable name",
        ],
        answer: 2,
      },
      {
        id: 4,
        question: "Which function converts JSON string into a JavaScript object?",
        options: [
          "JSON.parse()",
          "JSON.stringify()",
          "JSON.object()",
          "JSON.convert()",
        ],
        answer: 0,
      },
      {
        id: 5,
        question: "Which array method creates a new array by transforming every element?",
        options: ["filter()", "map()", "find()", "reduce()"],
        answer: 1,
      },
      {
        id: 6,
        question: "What is the result of typeof null?",
        options: ["null", "object", "undefined", "boolean"],
        answer: 1,
      },
      {
        id: 7,
        question: "Which symbol is used for an arrow function?",
        options: ["->", "=>", "::", "<-"],
        answer: 1,
      },
      {
        id: 8,
        question: "Which keyword stops a loop immediately?",
        options: ["stop", "exit", "break", "return"],
        answer: 2,
      },
      {
        id: 9,
        question: "Which method removes the last element from an array?",
        options: ["shift()", "remove()", "delete()", "pop()"],
        answer: 3,
      },
      {
        id: 10,
        question: "Which value represents an intentional absence of a value?",
        options: ["undefined", "null", "empty", "NaN"],
        answer: 1,
      },
    ],
  },

  // =====================================================
  // REACT
  // =====================================================
  {
    id: "react",
    title: "React Development",
    description:
      "Challenge yourself with React components, hooks, props, state and modern React development.",
    category: "React",
    difficulty: "Hard",
    duration: 25,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "What is React primarily used for?",
        options: [
          "Database management",
          "Building user interfaces",
          "Operating systems",
          "Server hardware",
        ],
        answer: 1,
      },
      {
        id: 2,
        question: "Which hook is used to manage state in a functional component?",
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
        question: "What are props used for?",
        options: [
          "Passing data to components",
          "Creating databases",
          "Styling only",
          "Installing packages",
        ],
        answer: 0,
      },
      {
        id: 5,
        question: "Which syntax is commonly used to return multiple elements from a component without a wrapper?",
        options: ["Fragments", "Arrays only", "Classes", "Modules"],
        answer: 0,
      },
      {
        id: 6,
        question: "What is JSX?",
        options: [
          "A database",
          "A JavaScript syntax extension",
          "A CSS framework",
          "A testing library",
        ],
        answer: 1,
      },
      {
        id: 7,
        question: "Why is the key prop used when rendering lists?",
        options: [
          "For styling",
          "To identify list elements",
          "For authentication",
          "For routing",
        ],
        answer: 1,
      },
      {
        id: 8,
        question: "Which hook can be used to access a DOM element directly?",
        options: ["useRef", "useState", "useEffect", "useReducer"],
        answer: 0,
      },
      {
        id: 9,
        question: "What happens when React state changes?",
        options: [
          "The page always reloads",
          "The component can re-render",
          "The browser closes",
          "The database resets",
        ],
        answer: 1,
      },
      {
        id: 10,
        question: "Which library is commonly used for routing in React applications?",
        options: ["React Router", "React SQL", "React DB", "React Server"],
        answer: 0,
      },
    ],
  },

  // =====================================================
  // PYTHON
  // =====================================================
  {
    id: "python",
    title: "Python Basics",
    description:
      "Test your Python programming knowledge including variables, lists, functions and loops.",
    category: "Python",
    difficulty: "Easy",
    duration: 15,
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
        question: "Which data type stores an ordered collection of items?",
        options: ["list", "bool", "int", "float"],
        answer: 0,
      },
      {
        id: 3,
        question: "Which symbol is used for comments in Python?",
        options: ["//", "/*", "#", "--"],
        answer: 2,
      },
      {
        id: 4,
        question: "What is the output type of input()?",
        options: ["integer", "string", "boolean", "float"],
        answer: 1,
      },
      {
        id: 5,
        question: "Which keyword is used for a loop over a sequence?",
        options: ["loop", "foreach", "for", "repeat"],
        answer: 2,
      },
      {
        id: 6,
        question: "Which data structure stores key-value pairs?",
        options: ["List", "Tuple", "Dictionary", "Set"],
        answer: 2,
      },
      {
        id: 7,
        question: "Which operator is used for exponentiation?",
        options: ["^", "**", "//", "%%"],
        answer: 1,
      },
      {
        id: 8,
        question: "Which value represents no value in Python?",
        options: ["null", "undefined", "None", "empty"],
        answer: 2,
      },
      {
        id: 9,
        question: "Which function returns the number of items in a collection?",
        options: ["size()", "count()", "len()", "length()"],
        answer: 2,
      },
      {
        id: 10,
        question: "Which keyword is used to import a module?",
        options: ["include", "require", "import", "module"],
        answer: 2,
      },
    ],
  },

  // =====================================================
  // HTML & CSS
  // =====================================================
  {
    id: "html-css",
    title: "HTML & CSS",
    description:
      "Test your frontend fundamentals with HTML structure, CSS styling and responsive design.",
    category: "HTML",
    difficulty: "Easy",
    duration: 15,
    passingScore: 60,
    questions: [
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
        question: "Which tag is used for the largest heading?",
        options: ["<head>", "<h6>", "<h1>", "<title>"],
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
        question: "Which CSS property changes text color?",
        options: ["font-color", "text-color", "color", "foreground"],
        answer: 2,
      },
      {
        id: 5,
        question: "Which CSS property controls the space inside an element?",
        options: ["margin", "padding", "spacing", "gap"],
        answer: 1,
      },
      {
        id: 6,
        question: "Which CSS layout system is designed for one-dimensional layouts?",
        options: ["Grid", "Flexbox", "Float", "Position"],
        answer: 1,
      },
      {
        id: 7,
        question: "Which property makes an element a flex container?",
        options: [
          "position: flex",
          "display: flex",
          "flex: display",
          "layout: flex",
        ],
        answer: 1,
      },
      {
        id: 8,
        question: "Which HTML tag is used to display an image?",
        options: ["<picture>", "<image>", "<img>", "<src>"],
        answer: 2,
      },
      {
        id: 9,
        question: "Which CSS unit is relative to the root font size?",
        options: ["px", "em", "rem", "%"],
        answer: 2,
      },
      {
        id: 10,
        question: "Which HTML attribute provides alternative text for an image?",
        options: ["title", "alt", "text", "description"],
        answer: 1,
      },
    ],
  },

  // =====================================================
  // TYPESCRIPT
  // =====================================================
  {
    id: "typescript",
    title: "TypeScript Essentials",
    description:
      "Test your knowledge of TypeScript types, interfaces, functions and modern development.",
    category: "TypeScript",
    difficulty: "Medium",
    duration: 20,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "TypeScript is a superset of which language?",
        options: ["Python", "Java", "JavaScript", "C++"],
        answer: 2,
      },
      {
        id: 2,
        question: "Which keyword defines an interface?",
        options: ["type", "interface", "struct", "schema"],
        answer: 1,
      },
      {
        id: 3,
        question: "Which type represents true or false?",
        options: ["bool", "boolean", "BooleanValue", "logic"],
        answer: 1,
      },
      {
        id: 4,
        question: "Which symbol is commonly used for optional properties?",
        options: ["!", "?", "#", "&"],
        answer: 1,
      },
      {
        id: 5,
        question: "Which type allows any value?",
        options: ["unknown", "any", "never", "void"],
        answer: 1,
      },
      {
        id: 6,
        question: "Which type is safer than any when the type is unknown?",
        options: ["unknown", "never", "void", "object"],
        answer: 0,
      },
      {
        id: 7,
        question: "Which file extension is commonly used for TypeScript?",
        options: [".js", ".jsx", ".ts", ".css"],
        answer: 2,
      },
      {
        id: 8,
        question: "Which extension is used for TypeScript with JSX?",
        options: [".tsx", ".ts", ".jsx", ".react"],
        answer: 0,
      },
      {
        id: 9,
        question: "What does a union type allow?",
        options: [
          "Only one fixed type",
          "Multiple possible types",
          "Only objects",
          "Only strings",
        ],
        answer: 1,
      },
      {
        id: 10,
        question: "Which type represents a function that returns nothing?",
        options: ["null", "void", "empty", "none"],
        answer: 1,
      },
    ],
  },

  // =====================================================
  // NODE.JS
  // =====================================================
  {
    id: "nodejs",
    title: "Node.js Fundamentals",
    description:
      "Learn and test your knowledge of Node.js, modules, APIs and server-side JavaScript.",
    category: "Node.js",
    difficulty: "Medium",
    duration: 20,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "What is Node.js?",
        options: [
          "A JavaScript runtime",
          "A CSS framework",
          "A database",
          "A browser",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which engine does Node.js use to execute JavaScript?",
        options: ["SpiderMonkey", "V8", "JavaScriptCore", "Chakra"],
        answer: 1,
      },
      {
        id: 3,
        question: "Which command initializes a Node.js project?",
        options: ["node init", "npm init", "npm start", "node create"],
        answer: 1,
      },
      {
        id: 4,
        question: "What is npm?",
        options: [
          "Node Package Manager",
          "New Programming Module",
          "Node Project Manager",
          "Network Package Module",
        ],
        answer: 0,
      },
      {
        id: 5,
        question: "Which module is used to work with files?",
        options: ["http", "fs", "pathway", "file"],
        answer: 1,
      },
      {
        id: 6,
        question: "Which object provides information about the current Node process?",
        options: ["node", "process", "runtime", "system"],
        answer: 1,
      },
      {
        id: 7,
        question: "Which module can create an HTTP server?",
        options: ["server", "http", "web", "network"],
        answer: 1,
      },
      {
        id: 8,
        question: "Which file commonly contains npm project configuration?",
        options: ["project.json", "package.json", "node.json", "config.json"],
        answer: 1,
      },
      {
        id: 9,
        question: "Which command installs a package?",
        options: ["npm add", "npm install", "node install", "package get"],
        answer: 1,
      },
      {
        id: 10,
        question: "Node.js is commonly used for which type of development?",
        options: [
          "Server-side applications",
          "Only graphic design",
          "Only spreadsheets",
          "Operating system drivers",
        ],
        answer: 0,
      },
    ],
  },

  // =====================================================
  // NEXT.JS
  // =====================================================
  {
    id: "nextjs",
    title: "Next.js Development",
    description:
      "Test your knowledge of Next.js routing, components, server rendering and modern web development.",
    category: "Next.js",
    difficulty: "Hard",
    duration: 25,
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
        question: "Which folder is commonly used for the App Router?",
        options: ["pages", "src", "app", "routes"],
        answer: 2,
      },
      {
        id: 3,
        question: "What directive is used to create a Client Component?",
        options: [
          '"use client"',
          '"client component"',
          '"use browser"',
          '"client"',
        ],
        answer: 0,
      },
      {
        id: 4,
        question: "Which component is used for optimized images?",
        options: ["Image", "NextImage", "OptimizedImage", "Img"],
        answer: 0,
      },
      {
        id: 5,
        question: "Which component is used for internal navigation?",
        options: ["Router", "Link", "Navigate", "NextLink"],
        answer: 1,
      },
      {
        id: 6,
        question: "What is a dynamic route example?",
        options: [
          "/products/id",
          "/products/[id]",
          "/products/:id",
          "/products/{id}",
        ],
        answer: 1,
      },
      {
        id: 7,
        question: "Which file can define a page in the App Router?",
        options: ["index.tsx", "page.tsx", "route.tsx", "screen.tsx"],
        answer: 1,
      },
      {
        id: 8,
        question: "Which file is commonly used for shared UI layout?",
        options: ["layout.tsx", "wrapper.tsx", "main.tsx", "root.tsx"],
        answer: 0,
      },
      {
        id: 9,
        question: "Which command starts a Next.js development server?",
        options: ["npm run dev", "npm run next", "next start-dev", "node dev"],
        answer: 0,
      },
      {
        id: 10,
        question: "Next.js can support which rendering strategies?",
        options: [
          "Only CSR",
          "Only SSR",
          "SSR, SSG and CSR",
          "Only static HTML",
        ],
        answer: 2,
      },
    ],
  },

  // =====================================================
  // GIT & GITHUB
  // =====================================================
  {
    id: "git-github",
    title: "Git & GitHub",
    description:
      "Learn version control, Git commands, branches, commits and GitHub workflows.",
    category: "Git",
    difficulty: "Easy",
    duration: 15,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "What is Git?",
        options: [
          "A version control system",
          "A database",
          "A programming language",
          "A browser",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which command initializes a Git repository?",
        options: ["git start", "git init", "git create", "git repo"],
        answer: 1,
      },
      {
        id: 3,
        question: "Which command stages files?",
        options: ["git stage", "git add", "git save", "git prepare"],
        answer: 1,
      },
      {
        id: 4,
        question: "Which command creates a commit?",
        options: ["git save", "git commit", "git push", "git record"],
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
        question: "Which command creates a new branch?",
        options: [
          "git branch feature",
          "git new feature",
          "git create feature",
          "git branch-new feature",
        ],
        answer: 0,
      },
      {
        id: 8,
        question: "What is GitHub?",
        options: [
          "A platform for hosting and collaborating on Git repositories",
          "A programming language",
          "A database",
          "A text editor",
        ],
        answer: 0,
      },
      {
        id: 9,
        question: "Which command shows the current repository status?",
        options: ["git check", "git status", "git info", "git state"],
        answer: 1,
      },
      {
        id: 10,
        question: "Which command shows commit history?",
        options: ["git history", "git commits", "git log", "git records"],
        answer: 2,
      },
    ],
  },

  // =====================================================
  // SQL
  // =====================================================
  {
    id: "sql",
    title: "SQL & Database",
    description:
      "Test your knowledge of SQL queries, tables, filtering, joins and database fundamentals.",
    category: "SQL",
    difficulty: "Medium",
    duration: 20,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "What does SQL stand for?",
        options: [
          "Structured Query Language",
          "Simple Query Language",
          "System Query Logic",
          "Structured Question Language",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which command retrieves data from a table?",
        options: ["GET", "SELECT", "FETCH", "READ"],
        answer: 1,
      },
      {
        id: 3,
        question: "Which command adds new records?",
        options: ["ADD", "INSERT", "CREATE", "APPEND"],
        answer: 1,
      },
      {
        id: 4,
        question: "Which command modifies existing records?",
        options: ["CHANGE", "MODIFY", "UPDATE", "EDIT"],
        answer: 2,
      },
      {
        id: 5,
        question: "Which command removes records?",
        options: ["REMOVE", "DELETE", "DROP", "CLEAR"],
        answer: 1,
      },
      {
        id: 6,
        question: "Which clause filters rows?",
        options: ["FILTER", "WHERE", "HAVING", "SELECT"],
        answer: 1,
      },
      {
        id: 7,
        question: "Which keyword sorts query results?",
        options: ["SORT BY", "ORDER BY", "GROUP BY", "ARRANGE"],
        answer: 1,
      },
      {
        id: 8,
        question: "Which SQL command creates a table?",
        options: ["MAKE TABLE", "CREATE TABLE", "NEW TABLE", "TABLE CREATE"],
        answer: 1,
      },
      {
        id: 9,
        question: "What is a primary key?",
        options: [
          "A unique identifier for a row",
          "A password",
          "A table name",
          "A database server",
        ],
        answer: 0,
      },
      {
        id: 10,
        question: "Which JOIN returns matching rows from both tables?",
        options: ["INNER JOIN", "OUTER JOIN", "LEFT JOIN", "CROSS JOIN"],
        answer: 0,
      },
    ],
  },

  // =====================================================
  // C PROGRAMMING
  // =====================================================
  {
    id: "c-programming",
    title: "C Programming",
    description:
      "Test your knowledge of C programming, variables, loops, functions, arrays and pointers.",
    category: "C",
    difficulty: "Medium",
    duration: 20,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "Who developed the C programming language?",
        options: ["James Gosling", "Dennis Ritchie", "Bjarne Stroustrup", "Guido van Rossum"],
        answer: 1,
      },
      {
        id: 2,
        question: "Which function is the entry point of a C program?",
        options: ["start()", "main()", "run()", "execute()"],
        answer: 1,
      },
      {
        id: 3,
        question: "Which format specifier is used for an integer?",
        options: ["%c", "%f", "%d", "%s"],
        answer: 2,
      },
      {
        id: 4,
        question: "Which symbol ends a C statement?",
        options: [".", ":", ";", ","],
        answer: 2,
      },
      {
        id: 5,
        question: "Which header is commonly used for printf()?",
        options: ["stdlib.h", "stdio.h", "string.h", "math.h"],
        answer: 1,
      },
      {
        id: 6,
        question: "Which loop executes while a condition is true?",
        options: ["while", "repeat", "loop", "iterate"],
        answer: 0,
      },
      {
        id: 7,
        question: "Which operator gets the address of a variable?",
        options: ["*", "&", "#", "@"],
        answer: 1,
      },
      {
        id: 8,
        question: "Which data type stores a single character?",
        options: ["string", "char", "character", "text"],
        answer: 1,
      },
      {
        id: 9,
        question: "Which keyword is used to return a value from a function?",
        options: ["send", "return", "output", "give"],
        answer: 1,
      },
      {
        id: 10,
        question: "An array stores what?",
        options: [
          "Multiple values of the same type",
          "Only one value",
          "Only functions",
          "Only characters",
        ],
        answer: 0,
      },
    ],
  },

  // =====================================================
  // JAVA
  // =====================================================
  {
    id: "java",
    title: "Java Programming",
    description:
      "Test your Java knowledge including OOP, classes, objects, variables and exceptions.",
    category: "Java",
    difficulty: "Medium",
    duration: 20,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "Java is primarily known as which type of language?",
        options: [
          "Object-oriented programming language",
          "Markup language",
          "Database language",
          "Styling language",
        ],
        answer: 0,
      },
      {
        id: 2,
        question: "Which keyword creates a new object?",
        options: ["create", "new", "object", "instance"],
        answer: 1,
      },
      {
        id: 3,
        question: "Which method is the entry point of a Java application?",
        options: ["start()", "main()", "run()", "execute()"],
        answer: 1,
      },
      {
        id: 4,
        question: "Which keyword is used to inherit a class?",
        options: ["inherits", "extends", "implements", "super"],
        answer: 1,
      },
      {
        id: 5,
        question: "Which keyword is used to implement an interface?",
        options: ["extends", "implements", "interface", "inherits"],
        answer: 1,
      },
      {
        id: 6,
        question: "Which data type stores true or false?",
        options: ["bool", "boolean", "BooleanValue", "logic"],
        answer: 1,
      },
      {
        id: 7,
        question: "Which keyword prevents a class from being inherited?",
        options: ["static", "final", "private", "sealed"],
        answer: 1,
      },
      {
        id: 8,
        question: "Which concept allows the same method name with different parameters?",
        options: ["Inheritance", "Overloading", "Encapsulation", "Abstraction"],
        answer: 1,
      },
      {
        id: 9,
        question: "Which keyword refers to the current object?",
        options: ["self", "this", "current", "object"],
        answer: 1,
      },
      {
        id: 10,
        question: "Which block is commonly used to handle exceptions?",
        options: ["try-catch", "if-else", "switch-case", "for-loop"],
        answer: 0,
      },
    ],
  },

  // =====================================================
  // DATA STRUCTURES & ALGORITHMS
  // =====================================================
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description:
      "Challenge yourself with arrays, stacks, queues, searching, sorting and algorithm complexity.",
    category: "DSA",
    difficulty: "Hard",
    duration: 30,
    passingScore: 60,
    questions: [
      {
        id: 1,
        question: "Which data structure follows LIFO?",
        options: ["Queue", "Stack", "Array", "Graph"],
        answer: 1,
      },
      {
        id: 2,
        question: "Which data structure follows FIFO?",
        options: ["Stack", "Queue", "Tree", "Heap"],
        answer: 1,
      },
      {
        id: 3,
        question: "What is the average time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
        answer: 1,
      },
      {
        id: 4,
        question: "Binary search requires the data to be:",
        options: ["Random", "Sorted", "Duplicated", "Reversed"],
        answer: 1,
      },
      {
        id: 5,
        question: "Which sorting algorithm repeatedly swaps adjacent elements?",
        options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Heap Sort"],
        answer: 1,
      },
      {
        id: 6,
        question: "Which structure is made of nodes connected by edges?",
        options: ["Array", "Graph", "Stack", "Queue"],
        answer: 1,
      },
      {
        id: 7,
        question: "Which traversal visits root before its subtrees?",
        options: ["Inorder", "Preorder", "Postorder", "Level order"],
        answer: 1,
      },
      {
        id: 8,
        question: "What is the worst-case complexity of linear search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        answer: 2,
      },
      {
        id: 9,
        question: "Which data structure is commonly used for BFS?",
        options: ["Stack", "Queue", "Heap", "Tree"],
        answer: 1,
      },
      {
        id: 10,
        question: "Which data structure is commonly used for DFS?",
        options: ["Queue", "Stack", "Hash table", "Array only"],
        answer: 1,
      },
    ],
  },
];

// =====================================================
// GET ALL QUIZZES
// =====================================================

export function getAllQuizzes(): Quiz[] {
  return quizzes;
}

// =====================================================
// GET QUIZ BY ID
// =====================================================

export function getQuizById(
  id: string | undefined
): Quiz | undefined {
  if (!id) return undefined;

  return quizzes.find((quiz) => quiz.id === id);
}

// =====================================================
// GET QUIZZES BY CATEGORY
// =====================================================

export function getQuizzesByCategory(
  category: string
): Quiz[] {
  return quizzes.filter(
    (quiz) =>
      quiz.category.toLowerCase() ===
      category.toLowerCase()
  );
}

