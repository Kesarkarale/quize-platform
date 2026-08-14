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
  FolderOpen,
  FileQuestion,
  Eye,
  EyeOff,
} from "lucide-react";

type Category = {
  id: number;
  name: string;
  description: string;
  quizzes: number;
  questions: number;
  status: "Active" | "Inactive";
  createdAt: string;
};

const initialCategories: Category[] = [
  {
    id: 1,
    name: "General Knowledge",
    description: "General awareness and everyday knowledge",
    quizzes: 42,
    questions: 860,
    status: "Active",
    createdAt: "Aug 01, 2026",
  },
  {
    id: 2,
    name: "Science",
    description: "Physics, chemistry, biology and scientific concepts",
    quizzes: 36,
    questions: 720,
    status: "Active",
    createdAt: "Jul 28, 2026",
  },
  {
    id: 3,
    name: "Technology",
    description: "Programming, computers and modern technology",
    quizzes: 29,
    questions: 645,
    status: "Active",
    createdAt: "Jul 21, 2026",
  },
  {
    id: 4,
    name: "History",
    description: "World history, civilizations and historical events",
    quizzes: 24,
    questions: 510,
    status: "Active",
    createdAt: "Jul 15, 2026",
  },
  {
    id: 5,
    name: "Mathematics",
    description: "Arithmetic, algebra, geometry and mathematics",
    quizzes: 31,
    questions: 680,
    status: "Active",
    createdAt: "Jul 10, 2026",
  },
  {
    id: 6,
    name: "English",
    description: "Grammar, vocabulary, comprehension and language",
    quizzes: 18,
    questions: 390,
    status: "Inactive",
    createdAt: "Jun 29, 2026",
  },
];

export default function CategoriesPage() {
  const [categories, setCategories] =
    useState<Category[]>(initialCategories);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");

  const [openMenu, setOpenMenu] =
    useState<number | null>(null);

  const filteredCategories = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return categories;

    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(query) ||
        category.description
          .toLowerCase()
          .includes(query)
    );
  }, [categories, search]);

  const activeCount = categories.filter(
    (category) => category.status === "Active"
  ).length;

  const totalQuizzes = categories.reduce(
    (sum, category) => sum + category.quizzes,
    0
  );

  const totalQuestions = categories.reduce(
    (sum, category) => sum + category.questions,
    0
  );

  const openAddModal = () => {
    setEditingCategory(null);
    setName("");
    setDescription("");
    setShowModal(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description);
    setShowModal(true);
    setOpenMenu(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setName("");
    setDescription("");
  };

  const handleSubmit = () => {
    const cleanName = name.trim();
    const cleanDescription =
      description.trim();

    if (!cleanName) {
      alert("Please enter category name.");
      return;
    }

    if (!cleanDescription) {
      alert("Please enter category description.");
      return;
    }

    if (editingCategory) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === editingCategory.id
            ? {
                ...category,
                name: cleanName,
                description: cleanDescription,
              }
            : category
        )
      );
    } else {
      const newCategory: Category = {
        id: Date.now(),
        name: cleanName,
        description: cleanDescription,
        quizzes: 0,
        questions: 0,
        status: "Active",
        createdAt: new Date().toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }
        ),
      };

      setCategories((prev) => [
        newCategory,
        ...prev,
      ]);
    }

    closeModal();
  };

  const deleteCategory = (id: number) => {
    const category = categories.find(
      (item) => item.id === id
    );

    if (!category) return;

    const confirmed = window.confirm(
      `Delete "${category.name}" category?`
    );

    if (!confirmed) return;

    setCategories((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setOpenMenu(null);
  };

  const toggleStatus = (id: number) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              status:
                category.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : category
      )
    );

    setOpenMenu(null);
  };

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">

        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
              <FolderOpen size={17} />
              Quiz Management
            </div>

            <h1 className="mt-2 text-3xl font-black tracking-tight">
              Categories
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Create and manage quiz categories for
              your platform.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Add Category
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={<FolderOpen size={21} />}
            title="Total Categories"
            value={categories.length.toString()}
          />

          <StatCard
            icon={<CheckCircle2 size={21} />}
            title="Active Categories"
            value={activeCount.toString()}
          />

          <StatCard
            icon={<FileQuestion size={21} />}
            title="Total Quizzes"
            value={totalQuizzes.toLocaleString()}
          />

          <StatCard
            icon={<FileQuestion size={21} />}
            title="Total Questions"
            value={totalQuestions.toLocaleString()}
          />
        </div>

        {/* Main Card */}
        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

          {/* Toolbar */}
          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 p-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-black">
                All Categories
              </h2>

              <p className="mt-1 text-sm text-gray-400">
                Manage categories used across quizzes.
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
                  setSearch(e.target.value)
                }
                placeholder="Search categories..."
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
                    Category
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

                {filteredCategories.map(
                  (category) => (
                    <tr
                      key={category.id}
                      className="transition hover:bg-gray-50"
                    >

                      {/* Category */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <FolderOpen size={20} />
                          </div>

                          <div>
                            <p className="font-bold">
                              {category.name}
                            </p>

                            <p className="mt-1 max-w-[320px] truncate text-xs text-gray-400">
                              {category.description}
                            </p>
                          </div>

                        </div>
                      </td>

                      {/* Quizzes */}
                      <td className="px-6 py-5">
                        <span className="font-bold text-gray-700">
                          {category.quizzes}
                        </span>
                      </td>

                      {/* Questions */}
                      <td className="px-6 py-5">
                        <span className="font-bold text-gray-700">
                          {category.questions}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${
                            category.status ===
                            "Active"
                              ? "bg-green-50 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {category.status ===
                          "Active" ? (
                            <CheckCircle2
                              size={13}
                            />
                          ) : (
                            <EyeOff
                              size={13}
                            />
                          )}

                          {category.status}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-sm font-medium text-gray-500">
                        {category.createdAt}
                      </td>

                      {/* Actions */}
                      <td className="relative px-6 py-5 text-right">

                        <button
                          onClick={() =>
                            setOpenMenu(
                              openMenu ===
                                category.id
                                ? null
                                : category.id
                            )
                          }
                          className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                        >
                          <MoreHorizontal
                            size={20}
                          />
                        </button>

                        {openMenu ===
                          category.id && (
                          <div className="absolute right-6 top-14 z-30 w-48 rounded-xl border border-gray-100 bg-white p-1.5 text-left shadow-xl">

                            <button
                              onClick={() =>
                                openEditModal(
                                  category
                                )
                              }
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                            >
                              <Pencil
                                size={16}
                              />
                              Edit Category
                            </button>

                            <button
                              onClick={() =>
                                toggleStatus(
                                  category.id
                                )
                              }
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
                            >
                              {category.status ===
                              "Active" ? (
                                <EyeOff
                                  size={16}
                                />
                              ) : (
                                <Eye
                                  size={16}
                                />
                              )}

                              {category.status ===
                              "Active"
                                ? "Deactivate"
                                : "Activate"}
                            </button>

                            <div className="my-1 border-t border-gray-100" />

                            <button
                              onClick={() =>
                                deleteCategory(
                                  category.id
                                )
                              }
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                            >
                              <Trash2
                                size={16}
                              />
                              Delete Category
                            </button>

                          </div>
                        )}

                      </td>

                    </tr>
                  )
                )}

                {filteredCategories.length ===
                  0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-16 text-center"
                    >
                      <div className="flex flex-col items-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                          <FolderOpen
                            size={25}
                          />
                        </div>

                        <p className="mt-4 font-bold text-gray-600">
                          No categories found
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          Try another search or create
                          a new category.
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
                {filteredCategories.length}
              </span>{" "}
              of{" "}
              <span className="font-bold text-gray-600">
                {categories.length}
              </span>{" "}
              categories
            </p>
          </div>

        </section>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5 backdrop-blur-sm">

          <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

              <div>
                <h3 className="text-lg font-black">
                  {editingCategory
                    ? "Edit Category"
                    : "Create Category"}
                </h3>

                <p className="mt-1 text-xs text-gray-400">
                  {editingCategory
                    ? "Update category information."
                    : "Add a new category to your platform."}
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
                  Category Name
                </label>

                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="e.g. Computer Science"
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
                  placeholder="Describe this category..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

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
                  {editingCategory
                    ? "Save Changes"
                    : "Create Category"}
                </button>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* Click outside menu */}
      {openMenu !== null && (
        <button
          aria-label="Close menu"
          onClick={() => setOpenMenu(null)}
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
