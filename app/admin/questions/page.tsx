"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Brain,
  CheckCircle2,
  ChevronDown,
  Edit3,
  FileQuestion,
  Filter,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

type QuestionType = "MCQ" | "TRUE_FALSE";

type Question = {
  id: number;
  question: string;
  quiz: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  type: QuestionType;
  options: string[];
  answer: string;
  status: "Active" | "Inactive";
};

const initialQuestions: Question[] = [
  {
    id: 1,
    question: "Which planet is known as the Red Planet?",
    quiz: "Science Challenge",
    category: "Science",
    difficulty: "Easy",
    type: "MCQ",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: "Mars",
    status: "Active",
  },
  {
    id: 2,
    question: "Who developed the JavaScript language?",
    quiz: "Advanced JavaScript",
    category: "Technology",
    difficulty: "Medium",
    type: "MCQ",
    options: [
      "James Gosling",
      "Brendan Eich",
      "Dennis Ritchie",
      "Guido van Rossum",
    ],
    answer: "Brendan Eich",
    status: "Active",
  },
  {
    id: 3,
    question: "The Earth revolves around the Sun.",
    quiz: "General Knowledge",
    category: "General Knowledge",
    difficulty: "Easy",
    type: "TRUE_FALSE",
    options: ["True", "False"],
    answer: "True",
    status: "Active",
  },
  {
    id: 4,
    question: "Which empire built the Taj Mahal?",
    quiz: "World History",
    category: "History",
    difficulty: "Medium",
    type: "MCQ",
    options: [
      "Mughal Empire",
      "Roman Empire",
      "Ottoman Empire",
      "Maurya Empire",
    ],
    answer: "Mughal Empire",
    status: "Active",
  },
  {
    id: 5,
    question: "What is the chemical symbol for Gold?",
    quiz: "Science Challenge",
    category: "Science",
    difficulty: "Hard",
    type: "MCQ",
    options: ["Ag", "Au", "Fe", "Cu"],
    answer: "Au",
    status: "Inactive",
  },
  {
    id: 6,
    question: "HTML stands for Hyper Text Markup Language.",
    quiz: "Web Development",
    category: "Technology",
    difficulty: "Easy",
    type: "TRUE_FALSE",
    options: ["True", "False"],
    answer: "True",
    status: "Active",
  },
];

const emptyForm = {
  question: "",
  quiz: "Science Challenge",
  category: "Science",
  difficulty: "Easy" as Question["difficulty"],
  type: "MCQ" as QuestionType,
  option1: "",
  option2: "",
  option3: "",
  option4: "",
  answer: "",
};

export default function AdminQuestionsPage() {
  const [questions, setQuestions] =
    useState<Question[]>(initialQuestions);

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState("All Categories");
  const [difficultyFilter, setDifficultyFilter] =
    useState("All Difficulties");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [menuId, setMenuId] =
    useState<number | null>(null);

  const [form, setForm] = useState(emptyForm);

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesSearch =
        question.question
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        question.quiz
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "All Categories" ||
        question.category === categoryFilter;

      const matchesDifficulty =
        difficultyFilter === "All Difficulties" ||
        question.difficulty === difficultyFilter;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesDifficulty
      );
    });
  }, [
    questions,
    searchQuery,
    categoryFilter,
    difficultyFilter,
  ]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (question: Question) => {
    setEditingId(question.id);

    setForm({
      question: question.question,
      quiz: question.quiz,
      category: question.category,
      difficulty: question.difficulty,
      type: question.type,
      option1: question.options[0] || "",
      option2: question.options[1] || "",
      option3: question.options[2] || "",
      option4: question.options[3] || "",
      answer: question.answer,
    });

    setMenuId(null);
    setModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );

    if (!confirmed) return;

    setQuestions((prev) =>
      prev.filter((question) => question.id !== id)
    );

    setMenuId(null);

    toast.success("Question deleted successfully.");
  };

  const toggleStatus = (id: number) => {
    setQuestions((prev) =>
      prev.map((question) =>
        question.id === id
          ? {
              ...question,
              status:
                question.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : question
      )
    );

    setMenuId(null);

    toast.success("Question status updated.");
  };

  const handleSaveQuestion = () => {
    if (!form.question.trim()) {
      toast.error("Please enter the question.");
      return;
    }

    if (!form.quiz) {
      toast.error("Please select a quiz.");
      return;
    }

    if (
      form.type === "MCQ" &&
      (!form.option1 ||
        !form.option2 ||
        !form.option3 ||
        !form.option4)
    ) {
      toast.error("Please fill all four options.");
      return;
    }

    if (
      form.type === "MCQ" &&
      !form.answer
    ) {
      toast.error("Please select the correct answer.");
      return;
    }

    if (
      form.type === "TRUE_FALSE" &&
      !form.answer
    ) {
      toast.error("Please select the correct answer.");
      return;
    }

    const options =
      form.type === "MCQ"
        ? [
            form.option1,
            form.option2,
            form.option3,
            form.option4,
          ]
        : ["True", "False"];

    if (editingId) {
      setQuestions((prev) =>
        prev.map((question) =>
          question.id === editingId
            ? {
                ...question,
                question: form.question.trim(),
                quiz: form.quiz,
                category: form.category,
                difficulty: form.difficulty,
                type: form.type,
                options,
                answer: form.answer,
              }
            : question
        )
      );

      toast.success("Question updated successfully.");
    } else {
      const newQuestion: Question = {
        id:
          questions.length > 0
            ? Math.max(
                ...questions.map((question) => question.id)
              ) + 1
            : 1,
        question: form.question.trim(),
        quiz: form.quiz,
        category: form.category,
        difficulty: form.difficulty,
        type: form.type,
        options,
        answer: form.answer,
        status: "Active",
      };

      setQuestions((prev) => [
        newQuestion,
        ...prev,
      ]);

      toast.success("Question created successfully.");
    }

    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const updateForm = (
    field: keyof typeof emptyForm,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <main
      onClick={() => setMenuId(null)}
      className="min-h-screen bg-[#f7f8fc] text-gray-900"
    >
      {/* ================= MOBILE HEADER ================= */}

      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-5 lg:hidden">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(true);
          }}
          className="rounded-xl p-2 hover:bg-gray-100"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Brain size={18} />
          </div>

          <span className="font-extrabold">
            Quiz
            <span className="text-indigo-600">
              Master
            </span>
          </span>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-black text-indigo-600">
          A
        </div>
      </header>

      {/* ================= OVERLAY ================= */}

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Brain size={21} />
            </div>

            <div>
              <p className="font-extrabold">
                Quiz
                <span className="text-indigo-600">
                  Master
                </span>
              </p>

              <p className="text-[10px] font-semibold text-gray-400">
                ADMIN PANEL
              </p>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6">
          <p className="px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            Main Menu
          </p>

          <nav className="mt-4 space-y-1">
            <SidebarLink
              href="/admin/dashboard"
              icon={<Brain size={18} />}
              label="Dashboard"
            />

            <SidebarLink
              href="/admin/quizzes"
              icon={<FileQuestion size={18} />}
              label="Quizzes"
            />

            <SidebarLink
              href="/admin/questions"
              icon={<FileQuestion size={18} />}
              label="Questions"
              active
            />

            <SidebarLink
              href="/admin/categories"
              icon={<Filter size={18} />}
              label="Categories"
            />

            <SidebarLink
              href="/admin/difficulty"
              icon={<Brain size={18} />}
              label="Difficulty Levels"
            />

            <SidebarLink
              href="/admin/attempts"
              icon={<CheckCircle2 size={18} />}
              label="Quiz Attempts"
            />

            <SidebarLink
              href="/admin/results"
              icon={<CheckCircle2 size={18} />}
              label="Student Results"
            />

            <SidebarLink
              href="/admin/analytics"
              icon={<Brain size={18} />}
              label="Analytics"
            />

            <SidebarLink
              href="/admin/leaderboard"
              icon={<TrophyIcon />}
              label="Leaderboard"
            />
          </nav>

          <p className="mt-8 px-3 text-xs font-bold uppercase tracking-widest text-gray-400">
            System
          </p>

          <nav className="mt-4 space-y-1">
            <SidebarLink
              href="/admin/settings"
              icon={<Brain size={18} />}
              label="Settings"
            />
          </nav>
        </div>

        <div className="border-t border-gray-100 p-4">
          <button
            onClick={() =>
              toast.info("Logout functionality can be connected to Supabase auth.")
            }
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
          >
            <XCircle size={19} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}

      <div className="lg:ml-64">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

          {/* HEADER */}

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-gray-400">
                <Link
                  href="/admin/dashboard"
                  className="hover:text-indigo-600"
                >
                  Dashboard
                </Link>

                <span>/</span>

                <span className="text-indigo-600">
                  Questions
                </span>
              </div>

              <h1 className="mt-3 text-3xl font-black">
                Question Management
              </h1>

              <p className="mt-1 text-gray-400">
                Create, edit and manage questions for your quizzes.
              </p>
            </div>

            <button
              onClick={openAddModal}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
            >
              <Plus size={18} />
              Add Question
            </button>
          </div>

          {/* ================= STATS ================= */}

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <QuestionStat
              label="Total Questions"
              value={questions.length.toString()}
              icon={<FileQuestion size={20} />}
            />

            <QuestionStat
              label="Active Questions"
              value={questions
                .filter((q) => q.status === "Active")
                .length.toString()}
              icon={<CheckCircle2 size={20} />}
            />

            <QuestionStat
              label="Inactive"
              value={questions
                .filter((q) => q.status === "Inactive")
                .length.toString()}
              icon={<XCircle size={20} />}
            />

            <QuestionStat
              label="Hard Questions"
              value={questions
                .filter((q) => q.difficulty === "Hard")
                .length.toString()}
              icon={<Brain size={20} />}
            />
          </div>

          {/* ================= TABLE ================= */}

          <section className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

            {/* Toolbar */}

            <div className="flex flex-col gap-4 border-b border-gray-100 p-6 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h2 className="font-black">
                  All Questions
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  {filteredQuestions.length} questions found
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">

                {/* Search */}

                <div className="relative">
                  <Search
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                    placeholder="Search questions..."
                    className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 sm:w-64"
                  />
                </div>

                {/* Category */}

                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) =>
                      setCategoryFilter(e.target.value)
                    }
                    className="appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-semibold outline-none focus:border-indigo-500"
                  >
                    <option>
                      All Categories
                    </option>

                    <option>
                      Science
                    </option>

                    <option>
                      Technology
                    </option>

                    <option>
                      History
                    </option>

                    <option>
                      General Knowledge
                    </option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>

                {/* Difficulty */}

                <div className="relative">
                  <select
                    value={difficultyFilter}
                    onChange={(e) =>
                      setDifficultyFilter(e.target.value)
                    }
                    className="appearance-none rounded-xl border border-gray-200 bg-white py-2.5 pl-4 pr-10 text-sm font-semibold outline-none focus:border-indigo-500"
                  >
                    <option>
                      All Difficulties
                    </option>

                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>

                  <ChevronDown
                    size={15}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Table */}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left">
                <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-400">
                  <tr>
                    <th className="px-6 py-4">
                      Question
                    </th>

                    <th className="px-6 py-4">
                      Quiz
                    </th>

                    <th className="px-6 py-4">
                      Category
                    </th>

                    <th className="px-6 py-4">
                      Difficulty
                    </th>

                    <th className="px-6 py-4">
                      Type
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredQuestions.map(
                    (question) => (
                      <tr
                        key={question.id}
                        className="transition hover:bg-gray-50"
                      >
                        {/* Question */}

                        <td className="max-w-[350px] px-6 py-5">
                          <div className="flex gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-black text-indigo-600">
                              Q
                            </div>

                            <div>
                              <p className="line-clamp-2 font-bold">
                                {question.question}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                Question #
                                {question.id
                                  .toString()
                                  .padStart(3, "0")}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Quiz */}

                        <td className="px-6 py-5">
                          <span className="font-semibold text-gray-600">
                            {question.quiz}
                          </span>
                        </td>

                        {/* Category */}

                        <td className="px-6 py-5">
                          <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                            {question.category}
                          </span>
                        </td>

                        {/* Difficulty */}

                        <td className="px-6 py-5">
                          <DifficultyBadge
                            difficulty={
                              question.difficulty
                            }
                          />
                        </td>

                        {/* Type */}

                        <td className="px-6 py-5">
                          <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
                            {question.type ===
                            "MCQ"
                              ? "Multiple Choice"
                              : "True / False"}
                          </span>
                        </td>

                        {/* Status */}

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                              question.status ===
                              "Active"
                                ? "bg-green-50 text-green-600"
                                : "bg-red-50 text-red-500"
                            }`}
                          >
                            {question.status ===
                            "Active" ? (
                              <CheckCircle2
                                size={13}
                              />
                            ) : (
                              <XCircle
                                size={13}
                              />
                            )}

                            {question.status}
                          </span>
                        </td>

                        {/* Actions */}

                        <td className="relative px-6 py-5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();

                              setMenuId(
                                menuId ===
                                  question.id
                                  ? null
                                  : question.id
                              );
                            }}
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                          >
                            <MoreHorizontal
                              size={20}
                            />
                          </button>

                          {menuId ===
                            question.id && (
                            <div
                              onClick={(e) =>
                                e.stopPropagation()
                              }
                              className="absolute right-6 top-14 z-20 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-xl"
                            >
                              <button
                                onClick={() =>
                                  openEditModal(
                                    question
                                  )
                                }
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                              >
                                <Edit3
                                  size={16}
                                />
                                Edit Question
                              </button>

                              <button
                                onClick={() =>
                                  toggleStatus(
                                    question.id
                                  )
                                }
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                              >
                                {question.status ===
                                "Active" ? (
                                  <XCircle
                                    size={16}
                                  />
                                ) : (
                                  <CheckCircle2
                                    size={16}
                                  />
                                )}

                                {question.status ===
                                "Active"
                                  ? "Deactivate"
                                  : "Activate"}
                              </button>

                              <button
                                onClick={() =>
                                  handleDelete(
                                    question.id
                                  )
                                }
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50"
                              >
                                <Trash2
                                  size={16}
                                />
                                Delete Question
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  )}

                  {filteredQuestions.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-6 py-16 text-center"
                      >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                          <Search size={22} />
                        </div>

                        <p className="mt-4 font-bold">
                          No questions found
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          Try changing your search or filters.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {/* ================= ADD / EDIT MODAL ================= */}

      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
          >
            {/* Modal Header */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
                  Question Management
                </p>

                <h2 className="mt-1 text-xl font-black">
                  {editingId
                    ? "Edit Question"
                    : "Create New Question"}
                </h2>
              </div>

              <button
                onClick={() => setModalOpen(false)}
                className="rounded-xl p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}

            <div className="space-y-6 p-6">

              {/* Question */}

              <div>
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Question
                </label>

                <textarea
                  value={form.question}
                  onChange={(e) =>
                    updateForm(
                      "question",
                      e.target.value
                    )
                  }
                  placeholder="Enter your question..."
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                />
              </div>

              {/* Quiz / Category */}

              <div className="grid gap-4 md:grid-cols-2">
                <SelectField
                  label="Quiz"
                  value={form.quiz}
                  onChange={(value) =>
                    updateForm("quiz", value)
                  }
                  options={[
                    "Science Challenge",
                    "Advanced JavaScript",
                    "General Knowledge",
                    "World History",
                    "Web Development",
                  ]}
                />

                <SelectField
                  label="Category"
                  value={form.category}
                  onChange={(value) =>
                    updateForm(
                      "category",
                      value
                    )
                  }
                  options={[
                    "Science",
                    "Technology",
                    "General Knowledge",
                    "History",
                  ]}
                />
              </div>

              {/* Difficulty / Type */}

              <div className="grid gap-4 md:grid-cols-2">
                <SelectField
                  label="Difficulty"
                  value={form.difficulty}
                  onChange={(value) =>
                    updateForm(
                      "difficulty",
                      value
                    )
                  }
                  options={[
                    "Easy",
                    "Medium",
                    "Hard",
                  ]}
                />

                <SelectField
                  label="Question Type"
                  value={form.type}
                  onChange={(value) => {
                    updateForm("type", value);

                    if (
                      value === "TRUE_FALSE"
                    ) {
                      setForm((prev) => ({
                        ...prev,
                        type: "TRUE_FALSE",
                        answer: "",
                      }));
                    }
                  }}
                  options={[
                    "MCQ",
                    "TRUE_FALSE",
                  ]}
                />
              </div>

              {/* Options */}

              {form.type === "MCQ" ? (
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <label className="text-sm font-bold text-gray-700">
                      Answer Options
                    </label>

                    <span className="text-xs text-gray-400">
                      Select correct answer below
                    </span>
                  </div>

                  <div className="space-y-3">
                    {[
                      ["option1", "Option A"],
                      ["option2", "Option B"],
                      ["option3", "Option C"],
                      ["option4", "Option D"],
                    ].map(
                      ([field, label]) => (
                        <div
                          key={field}
                          className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                            form.answer ===
                            form[
                              field as keyof typeof form
                            ]
                              ? "border-green-300 bg-green-50"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name="correctAnswer"
                            checked={
                              form.answer ===
                              form[
                                field as keyof typeof form
                              ]
                            }
                            onChange={() =>
                              updateForm(
                                "answer",
                                String(
                                  form[
                                    field as keyof typeof form
                                  ]
                                )
                              )
                            }
                            className="h-4 w-4 accent-green-600"
                          />

                          <input
                            value={
                              form[
                                field as keyof typeof form
                              ] as string
                            }
                            onChange={(e) =>
                              updateForm(
                                field as keyof typeof form,
                                e.target.value
                              )
                            }
                            placeholder={label}
                            className="w-full bg-transparent text-sm font-medium outline-none"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="mb-3 block text-sm font-bold text-gray-700">
                    Correct Answer
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {["True", "False"].map(
                      (answer) => (
                        <button
                          key={answer}
                          type="button"
                          onClick={() =>
                            updateForm(
                              "answer",
                              answer
                            )
                          }
                          className={`rounded-xl border px-4 py-3 text-sm font-bold transition ${
                            form.answer === answer
                              ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                              : "border-gray-200 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {answer}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Footer */}

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
                <button
                  onClick={() =>
                    setModalOpen(false)
                  }
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveQuestion}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700"
                >
                  <CheckCircle2 size={17} />

                  {editingId
                    ? "Update Question"
                    : "Create Question"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* =====================================================
   SIDEBAR LINK
===================================================== */

function SidebarLink({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
        active
          ? "bg-indigo-50 text-indigo-600"
          : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

/* =====================================================
   STAT
===================================================== */

function QuestionStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          {icon}
        </div>

        <span className="text-xs font-semibold text-gray-400">
          Questions
        </span>
      </div>

      <p className="mt-5 text-sm font-medium text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>
    </div>
  );
}

/* =====================================================
   DIFFICULTY
===================================================== */

function DifficultyBadge({
  difficulty,
}: {
  difficulty: Question["difficulty"];
}) {
  const styles = {
    Easy: "bg-green-50 text-green-600",
    Medium: "bg-orange-50 text-orange-600",
    Hard: "bg-red-50 text-red-500",
  };

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-bold ${styles[difficulty]}`}
    >
      {difficulty}
    </span>
  );
}

/* =====================================================
   SELECT
===================================================== */

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
        >
          {options.map((option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}

/* =====================================================
   TROPHY ICON
===================================================== */

function TrophyIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 6H4a3 3 0 0 0 3 3" />
      <path d="M17 6h3a3 3 0 0 1-3 3" />
    </svg>
  );
}
