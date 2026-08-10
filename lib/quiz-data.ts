export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export type QuizData = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  duration: number;
  passingScore: number;
  questions: QuizQuestion[];
};

export const quizzes: QuizData[] = [
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
        options: ["var", "let", "define", "variable"],
        answer: 1,
        explanation:
          "The let keyword declares a block-scoped variable in JavaScript.",
      },
      {
        id: 2,
        question: "Which method converts a JSON string into a JavaScript object?",
        options: [
          "JSON.parse()",
          "JSON.stringify()",
          "JSON.convert()",
          "JSON.object()",
        ],
        answer: 0,
        explanation:
          "JSON.parse() converts a JSON string into a JavaScript object.",
      },
      {
        id: 3,
        question: "Which operator checks both value and type?",
        options: ["==", "=", "===", "!="],
        answer: 2,
        explanation:
          "The === operator performs strict equality and checks both value and type.",
      },
      {
        id: 4,
        question: "Which method adds an item to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: 0,
        explanation:
          "push() adds one or more elements to the end of an array.",
      },
      {
        id: 5,
        question: "What does typeof null return?",
        options: ["null", "object", "undefined", "boolean"],
        answer: 1,
        explanation:
          "Due to a historical JavaScript behavior, typeof null returns object.",
      },
      {
        id: 6,
        question: "Which function is used to execute code after a delay?",
        options: [
          "setTimeout()",
          "setDelay()",
          "delay()",
          "wait()",
        ],
        answer: 0,
        explanation:
          "setTimeout() executes a function after a specified delay.",
      },
      {
        id: 7,
        question: "Which value represents an intentionally empty value?",
        options: ["undefined", "null", "NaN", "false"],
        answer: 1,
        explanation:
          "null is commonly used to represent an intentional absence of a value.",
      },
      {
        id: 8,
        question: "Which array method creates a new array by transforming each element?",
        options: ["filter()", "map()", "find()", "reduce()"],
        answer: 1,
        explanation:
          "map() creates a new array containing the results of calling a function on each element.",
      },
      {
        id: 9,
        question: "Which keyword is used to define a constant?",
        options: ["constant", "let", "const", "fixed"],
        answer: 2,
        explanation:
          "The const keyword creates a variable binding that cannot be reassigned.",
      },
      {
        id: 10,
        question: "What does NaN stand for?",
        options: [
          "Not a Number",
          "No Assigned Number",
          "New Array Number",
          "Null as Number",
        ],
        answer: 0,
        explanation: "NaN means Not a Number.",
      },
    ],
  },

  {
    id: "python",
    title: "Python Basics",
    description:
      "Test your understanding of Python syntax, data types, functions, lists and programming fundamentals.",
    category: "Python",
    difficulty: "Easy",
    duration: 15,
    passingScore: 50,
    questions: [
      {
        id: 1,
        question: "Which keyword is used to define a function in Python?",
        options: ["function", "def", "func", "define"],
        answer: 1,
        explanation:
          "Python uses the def keyword to define a function.",
      },
      {
        id: 2,
        question: "Which symbol is used for comments in Python?",
        options: ["//", "#", "/*", "--"],
        answer: 1,
        explanation:
          "A # symbol is used to start a single-line comment in Python.",
      },
      {
        id: 3,
        question: "Which data type stores True or False?",
        options: ["String", "Boolean", "Integer", "List"],
        answer: 1,
        explanation:
          "The bool type represents True and False values.",
      },
      {
        id: 4,
        question: "Which method adds an item to a Python list?",
        options: ["add()", "append()", "push()", "insertEnd()"],
        answer: 1,
        explanation:
          "append() adds an item to the end of a list.",
      },
      {
        id: 5,
        question: "Which function returns the length of a list?",
        options: ["length()", "size()", "len()", "count()"],
        answer: 2,
        explanation:
          "The built-in len() function returns the number of items.",
      },
      {
        id: 6,
        question: "Which collection stores key-value pairs?",
        options: ["List", "Tuple", "Dictionary", "Set"],
        answer: 2,
        explanation:
          "A dictionary stores data using key-value pairs.",
      },
      {
        id: 7,
        question: "Which keyword is used for a loop over a sequence?",
        options: ["loop", "foreach", "for", "repeat"],
        answer: 2,
        explanation:
          "Python uses the for keyword to iterate over sequences.",
      },
      {
        id: 8,
        question: "Which operator is used for exponentiation?",
        options: ["^", "**", "//", "^^"],
        answer: 1,
        explanation:
          "Python uses ** for exponentiation.",
      },
      {
        id: 9,
        question: "Which function converts a string to an integer?",
        options: ["integer()", "number()", "int()", "convert()"],
        answer: 2,
        explanation:
          "The int() function converts a compatible value into an integer.",
      },
      {
        id: 10,
        question: "Which keyword exits a loop immediately?",
        options: ["stop", "exit", "break", "end"],
        answer: 2,
        explanation:
          "break immediately terminates the current loop.",
      },
    ],
  },

  {
    id: "react",
    title: "React Development",
    description:
      "Challenge yourself with React components, props, hooks, state and modern React development.",
    category: "React",
    difficulty: "Hard",
    duration: 20,
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
        explanation:
          "React is a JavaScript library primarily used for building user interfaces.",
      },
      {
        id: 2,
        question: "Which hook is commonly used to manage component state?",
        options: ["useState", "useRoute", "useStyle", "useComponent"],
        answer: 0,
        explanation:
          "useState is the standard React hook for managing local component state.",
      },
      {
        id: 3,
        question: "Which hook is commonly used for side effects?",
        options: ["useData", "useEffect", "useSide", "useAction"],
        answer: 1,
        explanation:
          "useEffect is used to perform side effects in React components.",
      },
      {
        id: 4,
        question: "What are props used for?",
        options: [
          "Passing data to components",
          "Creating databases",
          "Styling only",
          "Starting servers",
        ],
        answer: 0,
        explanation:
          "Props allow data to be passed from a parent component to a child component.",
      },
      {
        id: 5,
        question: "What should normally be used as a list item's key?",
        options: [
          "A stable unique identifier",
          "Random number every render",
          "The component color",
          "The CSS class",
        ],
        answer: 0,
        explanation:
          "React recommends stable unique keys for list items.",
      },
      {
        id: 6,
        question: "Can React components receive props?",
        options: ["Yes", "No", "Only classes", "Only hooks"],
        answer: 0,
        explanation:
          "Both function and class components can receive props.",
      },
      {
        id: 7,
        question: "What does JSX allow developers to write?",
        options: [
          "HTML-like syntax inside JavaScript",
          "Only CSS",
          "Only SQL",
          "Only JSON",
        ],
        answer: 0,
        explanation:
          "JSX allows HTML-like syntax to be written within JavaScript code.",
      },
      {
        id: 8,
        question: "Which command is commonly used to start a Vite React development server?",
        options: [
          "npm run dev",
          "npm run start-react",
          "react start",
          "npm react",
        ],
        answer: 0,
        explanation:
          "Vite projects commonly use npm run dev to start the development server.",
      },
      {
        id: 9,
        question: "What is a controlled input?",
        options: [
          "An input whose value is controlled by React state",
          "An input controlled only by CSS",
          "An input without a value",
          "A disabled input",
        ],
        answer: 0,
        explanation:
          "A controlled input gets its value from React state and updates through event handlers.",
      },
      {
        id: 10,
        question: "Which hook can memoize an expensive calculation?",
        options: ["useMemo", "useHTML", "useValue", "useCacheOnly"],
        answer: 0,
        explanation:
          "useMemo can memoize a calculated value between renders.",
      },
    ],
  },

  {
    id: "html-css",
    title: "HTML & CSS",
    description:
      "Test your frontend fundamentals with HTML structure, semantic elements and CSS styling.",
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
        explanation:
          "HTML stands for Hyper Text Markup Language.",
      },
      {
        id: 2,
        question: "Which tag is used for the main heading?",
        options: ["<head>", "<h1>", "<title>", "<heading>"],
        answer: 1,
        explanation:
          "The h1 element represents the highest-level heading.",
      },
      {
        id: 3,
        question: "Which CSS property changes text color?",
        options: ["font-color", "text-color", "color", "foreground"],
        answer: 2,
        explanation:
          "The CSS color property changes the text color.",
      },
      {
        id: 4,
        question: "Which CSS property controls the space inside an element?",
        options: ["margin", "padding", "spacing", "gap"],
        answer: 1,
        explanation:
          "padding controls the space between an element's content and its border.",
      },
      {
        id: 5,
        question: "Which HTML element creates a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1,
        explanation:
          "The anchor element <a> creates hyperlinks.",
      },
      {
        id: 6,
        question: "Which CSS property changes the background color?",
        options: [
          "background-color",
          "bg-color",
          "background",
          "color-background",
        ],
        answer: 0,
        explanation:
          "background-color sets the background color of an element.",
      },
      {
        id: 7,
        question: "Which CSS layout system is useful for one-dimensional layouts?",
        options: ["Flexbox", "SQL", "Canvas", "DOM"],
        answer: 0,
        explanation:
          "Flexbox is designed primarily for one-dimensional layouts.",
      },
      {
        id: 8,
        question: "Which HTML tag is used to create an unordered list?",
        options: ["<ol>", "<list>", "<ul>", "<li>"],
        answer: 2,
        explanation:
          "The ul element creates an unordered list.",
      },
      {
        id: 9,
        question: "Which CSS property makes text bold?",
        options: ["font-style", "font-weight", "text-bold", "weight"],
        answer: 1,
        explanation:
          "font-weight controls the thickness of text.",
      },
      {
        id: 10,
        question: "Which CSS unit is relative to the root font size?",
        options: ["px", "em", "rem", "%"],
        answer: 2,
        explanation:
          "rem is relative to the root element's font size.",
      },
    ],
  },
];

export function getQuizById(id: string) {
  return quizzes.find((quiz) => quiz.id === id);
}
