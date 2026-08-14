"use client";

import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  CheckCircle2,
  Gauge,
  FileQuestion,
  Brain,
  Eye,
  EyeOff,
  Target,
} from "lucide-react";

type Difficulty = {
  id: number;
  name: string;
  description: string;
  quizzes: number;
  questions: number;
  status: "Active" | "Inactive";
  createdAt: string;
};

const initialDifficulties: Difficulty[] = [
  {
    id: 1,
    name: "Easy",
    description:
      "Basic questions suitable for beginners and introductory assessments.",
    quizzes: 38,
    questions: 720,
    status: "Active",
    createdAt: "Aug 01, 2026",
  },
  {
    id: 2,
    name: "Medium",
    description:
      "Moderate questions requiring understanding and basic problem solving.",
    quizzes: 56,
    questions: 1240,
    status: "Active",
    createdAt: "Jul 28, 2026",
  },
  {
    id: 3,
    name: "Hard",
    description:
      "Advanced questions requiring deeper knowledge and reasoning.",
    quizzes: 31,
    questions: 680,
    status: "Active",
    createdAt: "Jul 21, 2026",
  },
  {
    id: 4,
    name: "Expert",
    description:
      "Highly challenging questions designed for advanced learners.",
    quizzes: 14,
    questions: 315,
    status: "Active",
    createdAt: "Jul 15, 2026",
  },
];

export default function DifficultyPage() {
  const [difficulties, setDifficulties] =
    useState<Difficulty[]>(initialDifficulties);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] =
    useState(false);

  const [editingDifficulty, setEditingDifficulty] =
    useState<Difficulty | null>(null);

  const [name, setName] = useState("");

  const [description, setDescription] =
    useState("");

  const [openMenu, setOpenMenu] =
    useState<number | null>(null);

  const filteredDifficulties = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return difficulties;
    }

    return difficulties.filter(
      (difficulty) =>
        difficulty.name
          .toLowerCase()
          .includes(query) ||
        difficulty.description
          .toLowerCase()
          .includes(query)
    );
  }, [difficulties, search]);

  const activeCount = difficulties.filter(
    (difficulty) =>
      difficulty.status === "Active"
  ).length;

  const totalQuizzes = difficulties.reduce(
    (sum, difficulty) =>
      sum + difficulty.quizzes,
    0
  );

  const totalQuestions = difficulties.reduce(
    (sum, difficulty) =>
      sum + difficulty.questions,
    0
  );

  const openAddModal = () => {
    setEditingDifficulty(null);
    setName("");
    setDescription("");
    setShowModal(true);
  };

  const openEditModal = (
    difficulty: Difficulty
  ) => {
    setEditingDifficulty(difficulty);

    setName(difficulty.name);

    setDescription(
      difficulty.description
    );

    setShowModal(true);

    setOpenMenu(null);
  };

  const closeModal = () => {
    setShowModal(false);

    setEditingDifficulty(null);

    setName("");

    setDescription("");
  };

  const handleSubmit = () => {
    const cleanName = name.trim();

    const cleanDescription =
      description.trim();

    if (!cleanName) {
      alert("Please enter difficulty name.");
      return;
    }

    if (!cleanDescription) {
      alert(
        "Please enter difficulty description."
      );
      return;
    }

    /*
     * Edit existing difficulty
     */
    if (editingDifficulty) {
      setDifficulties((prev) =>
        prev.map((difficulty) =>
          difficulty.id ===
          editingDifficulty.id
            ? {
                ...difficulty,
                name: cleanName,
                description:
                  cleanDescription,
              }
            : difficulty
        )
      );

      closeModal();

      return;
    }

    /*
     * Create new difficulty
     */
    const newDifficulty: Difficulty = {
      id: Date.now(),

      name: cleanName,

      description: cleanDescription,

      quizzes: 0,

      questions: 0,

      status: "Active",

      createdAt:
        new Date().toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        ),
    };

    setDifficulties((prev) => [
      ...prev,
      newDifficulty,
    ]);

    closeModal();
  };

  const deleteDifficulty = (
    id: number
  ) => {
    const difficulty =
      difficulties.find(
        (item) => item.id === id
      );

    if (!difficulty) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${difficulty.name}" difficulty level?`
    );

    if (!confirmed) {
      return;
    }

    setDifficulties((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    setOpenMenu(null);
  };

  const toggleStatus = (id: number) => {
    setDifficulties((prev) =>
      prev.map((difficulty) =>
        difficulty.id === id
          ? {
              ...difficulty,
              status:
                difficulty.status ===
                "Active"
                  ? "Inactive"
                  : "Active",
            }
          : difficulty
      )
    );

    setOpenMenu(null);
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

          <div>

            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
              <Gauge size={17} />

              Quiz Configuration
            </div>

            <h1 className="mt-2 text-3xl font-black tracking-tight">
              Difficulty Levels
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Manage difficulty levels used when
              creating quizzes and questions.
            </p>

          </div>

          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
          >
            <Plus size={18} />

            Add Difficulty
          </button>

        </div>

        {/* =====================================
            STATS
        ===================================== */}

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

          <StatCard
            icon={<Gauge size={21} />}
            title="Total Levels"
            value={difficulties.length.toString()}
          />

          <StatCard
            icon={<CheckCircle2 size={21} />}
            title="Active Levels"
            value={activeCount.toString()}
          />

          <StatCard
            icon={<Brain size={21} />}
            title="Total Quizzes"
            value={totalQuizzes.toLocaleString()}
          />

          <StatCard
            icon={<FileQuestion size={21} />}
            title="Total Questions"
            value={totalQuestions.toLocaleString()}
          />

        </div>

        {/* =====================================
            DIFFICULTY LEVEL CARDS
        ===================================== */}

        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          {difficulties.map(
            (difficulty) => (
              <DifficultyCard
                key={difficulty.id}
                difficulty={difficulty}
                onEdit={() =>
                  openEditModal(
                    difficulty
                  )
                }
                onDelete={() =>
                  deleteDifficulty(
                    difficulty.id
                  )
                }
                onToggle={() =>
                  toggleStatus(
                    difficulty.id
                  )
                }
              />
            )
          )}

        </div>

        {/* =====================================
            TABLE
        ===================================== */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Toolbar */}

          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-6 lg:flex-row lg:items-center">

            <div>

              <h2 className="font-black">
                All Difficulty Levels
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Configure and manage assessment
                difficulty.
              </p>

            </div>

            <div className="relative">

              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search difficulty..."
                className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 lg:w-72"
              />

            </div>

          </div>

          {/* Table */}

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px] text-left">

              <thead className="bg-gray-50">

                <tr className="text-xs uppercase tracking-wider text-gray-400">

                  <th className="px-6 py-4">
                    Difficulty
                  </th>

                  <th className="px-6 py-4">
                    Quizzes
                  </th>

                  <th className="px-6 py-4">
                    Questions
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Created
                  </th>

                  <th className="px-6 py-4 text-right">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-gray-100">

                {filteredDifficulties.map(
                  (difficulty) => (
                    <tr
                      key={difficulty.id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* Difficulty */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <DifficultyIcon
                            name={
                              difficulty.name
                            }
                          />

                          <div>

                            <p className="font-bold">
                              {difficulty.name}
                            </p>

                            <p className="mt-1 max-w-[360px] truncate text-xs text-gray-400">
                              {
                                difficulty.description
                              }
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Quizzes */}

                      <td className="px-6 py-5">

                        <span className="font-bold text-gray-700">
                          {
                            difficulty.quizzes
                          }
                        </span>

                      </td>

                      {/* Questions */}

                      <td className="px-6 py-5">

                        <span className="font-bold text-gray-700">
                          {
                            difficulty.questions
                          }
                        </span>

                      </td>

                      {/* Status */}

                      <td className="px-6 py-5">

                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                            difficulty.status ===
                            "Active"
                              ? "bg-green-50 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >

                          {difficulty.status ===
                          "Active" ? (
                            <CheckCircle2
                              size={13}
                            />
                          ) : (
                            <EyeOff
                              size={13}
                            />
                          )}

                          {
                            difficulty.status
                          }

                        </span>

                      </td>

                      {/* Created */}

                      <td className="px-6 py-5 text-sm font-medium text-gray-500">
                        {
                          difficulty.createdAt
                        }
                      </td>

                      {/* Action */}

                      <td className="relative px-6 py-5 text-right">

                        <button
                          onClick={() =>
                            setOpenMenu(
                              openMenu ===
                                difficulty.id
                                ? null
                                : difficulty.id
                            )
                          }
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        >
                          <MoreHorizontal
                            size={20}
                          />
                        </button>

                        {openMenu ===
                          difficulty.id && (
                          <div className="absolute right-6 top-14 z-30 w-48 rounded-xl border border-gray-100 bg-white p-1.5 text-left shadow-xl">

                            <button
                              onClick={() =>
                                openEditModal(
                                  difficulty
                                )
                              }
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                            >
                              <Pencil
                                size={16}
                              />

                              Edit Level
                            </button>

                            <button
                              onClick={() =>
                                toggleStatus(
                                  difficulty.id
                                )
                              }
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                            >

                              {difficulty.status ===
                              "Active" ? (
                                <EyeOff
                                  size={16}
                                />
                              ) : (
                                <Eye
                                  size={16}
                                />
                              )}

                              {difficulty.status ===
                              "Active"
                                ? "Deactivate"
                                : "Activate"}

                            </button>

                            <div className="my-1 border-t border-gray-100" />

                            <button
                              onClick={() =>
                                deleteDifficulty(
                                  difficulty.id
                                )
                              }
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                            >
                              <Trash2
                                size={16}
                              />

                              Delete Level
                            </button>

                          </div>
                        )}

                      </td>

                    </tr>
                  )
                )}

                {filteredDifficulties.length ===
                  0 && (
                  <tr>

                    <td
                      colSpan={6}
                      className="px-6 py-16 text-center"
                    >

                      <div className="flex flex-col items-center">

                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                          <Gauge
                            size={25}
                          />
                        </div>

                        <p className="mt-4 font-bold text-gray-600">
                          No difficulty levels found
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          Try another search or add
                          a new difficulty level.
                        </p>

                      </div>

                    </td>

                  </tr>
                )}

              </tbody>

            </table>

          </div>

          {/* Footer */}

          <div className="border-t border-gray-100 px-6 py-4">

            <p className="text-xs font-medium text-gray-400">

              Showing{" "}

              <span className="font-bold text-gray-600">
                {
                  filteredDifficulties.length
                }
              </span>

              {" "}of{" "}

              <span className="font-bold text-gray-600">
                {difficulties.length}
              </span>

              {" "}difficulty levels

            </p>

          </div>

        </section>

      </div>

      {/* =====================================
          ADD / EDIT MODAL
      ===================================== */}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm">

          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

              <div>

                <h3 className="text-lg font-black">
                  {editingDifficulty
                    ? "Edit Difficulty Level"
                    : "Create Difficulty Level"}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  {editingDifficulty
                    ? "Update difficulty information."
                    : "Add a new difficulty level."}
                </p>

              </div>

              <button
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={19} />
              </button>

            </div>

            {/* Form */}

            <div className="space-y-5 p-6">

              <div>

                <label className="mb-2 block text-xs font-bold text-gray-600">
                  Difficulty Name
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Beginner"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />

              </div>

              <div>

                <label className="mb-2 block text-xs font-bold text-gray-600">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) =>
                    setDescription(
                      e.target.value
                    )
                  }
                  rows={4}
                  placeholder="Describe this difficulty level..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />

              </div>

              {/* Preview */}

              {name.trim() && (
                <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-4">

                  <p className="text-[10px] font-bold uppercase tracking-wider text-indigo-500">
                    Preview
                  </p>

                  <div className="mt-3 flex items-center gap-3">

                    <DifficultyIcon
                      name={name}
                    />

                    <div>

                      <p className="font-bold text-gray-800">
                        {name}
                      </p>

                      <p className="text-xs text-gray-400">
                        {description ||
                          "Difficulty description"}
                      </p>

                    </div>

                  </div>

                </div>
              )}

              {/* Buttons */}

              <div className="flex justify-end gap-3 pt-2">

                <button
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
                >
                  {editingDifficulty
                    ? "Save Changes"
                    : "Create Level"}
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Close dropdown */}

      {openMenu !== null && (
        <button
          aria-label="Close menu"
          onClick={() =>
            setOpenMenu(null)
          }
          className="fixed inset-0 z-20 cursor-default"
        />
      )}

    </main>
  );
}

/* =========================================
   STAT CARD
========================================= */

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
        {icon}
      </div>

      <p className="mt-5 text-sm font-medium text-gray-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value}
      </p>

    </div>
  );
}

/* =========================================
   DIFFICULTY CARD
========================================= */

function DifficultyCard({
  difficulty,
  onEdit,
  onDelete,
  onToggle,
}: {
  difficulty: Difficulty;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

      <div className="flex items-start justify-between">

        <DifficultyIcon
          name={difficulty.name}
        />

        <button
          onClick={onEdit}
          className="rounded-lg p-2 text-gray-400 opacity-0 transition hover:bg-gray-100 group-hover:opacity-100"
        >
          <Pencil size={16} />
        </button>

      </div>

      <h3 className="mt-5 text-lg font-black">
        {difficulty.name}
      </h3>

      <p className="mt-2 min-h-[40px] text-xs leading-5 text-gray-400">
        {difficulty.description}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2">

        <div className="rounded-xl bg-gray-50 p-3">

          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Quizzes
          </p>

          <p className="mt-1 font-black">
            {difficulty.quizzes}
          </p>

        </div>

        <div className="rounded-xl bg-gray-50 p-3">

          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Questions
          </p>

          <p className="mt-1 font-black">
            {difficulty.questions}
          </p>

        </div>

      </div>

      <div className="mt-4 flex items-center justify-between">

        <span
          className={`inline-flex items-center gap-1.5 text-xs font-bold ${
            difficulty.status ===
            "Active"
              ? "text-green-600"
              : "text-gray-400"
          }`}
        >

          <span
            className={`h-2 w-2 rounded-full ${
              difficulty.status ===
              "Active"
                ? "bg-green-500"
                : "bg-gray-400"
            }`}
          />

          {difficulty.status}

        </span>

        <button
          onClick={onToggle}
          className="text-xs font-bold text-indigo-500 hover:text-indigo-700"
        >
          {difficulty.status ===
          "Active"
            ? "Deactivate"
            : "Activate"}
        </button>

      </div>

    </div>
  );
}

/* =========================================
   DIFFICULTY ICON
========================================= */

function DifficultyIcon({
  name,
}: {
  name: string;
}) {
  const normalized =
    name.toLowerCase();

  let wrapper =
    "bg-indigo-50 text-indigo-600";

  if (
    normalized.includes("easy") ||
    normalized.includes("beginner")
  ) {
    wrapper =
      "bg-green-50 text-green-600";
  } else if (
    normalized.includes("medium") ||
    normalized.includes("intermediate")
  ) {
    wrapper =
      "bg-yellow-50 text-yellow-600";
  } else if (
    normalized.includes("hard") ||
    normalized.includes("advanced")
  ) {
    wrapper =
      "bg-orange-50 text-orange-600";
  } else if (
    normalized.includes("expert")
  ) {
    wrapper =
      "bg-red-50 text-red-600";
  }

  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${wrapper}`}
    >
      <Target size={20} />
    </div>
  );
}
