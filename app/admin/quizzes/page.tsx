"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  MoreHorizontal,
  X,
  CheckCircle2,
  Clock3,
  Eye,
  EyeOff,
  Brain,
  Users,
  FileQuestion,
  Timer,
  Filter,
  RefreshCw,
  AlertCircle,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";

type Category = {
  id: string;
  name: string;
};

type Difficulty = {
  id: string;
  name: string;
};

type Quiz = {
  id: string;
  title: string;
  description: string | null;
  category_id: string | null;
  difficulty_id: string | null;
  duration: number;
  passing_score: number;
  status: "DRAFT" | "PUBLISHED" | "UNPUBLISHED";
  created_by: string | null;
  created_at: string;
  updated_at: string;

  categories?: {
    name: string;
  } | null;

  difficulty_levels?: {
    name: string;
  } | null;

  questions?: {
    count: number;
  }[];

  quiz_attempts?: {
    count: number;
  }[];
};

type QuizForm = {
  title: string;
  description: string;
  category_id: string;
  difficulty_id: string;
  duration: string;
  passing_score: string;
  status: "DRAFT" | "PUBLISHED" | "UNPUBLISHED";
};

const emptyForm: QuizForm = {
  title: "",
  description: "",
  category_id: "",
  difficulty_id: "",
  duration: "30",
  passing_score: "40",
  status: "DRAFT",
};

export default function AdminQuizzesPage() {
  const supabase = createClient();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const [showModal, setShowModal] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

  const [form, setForm] = useState<QuizForm>(emptyForm);

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [deleteQuiz, setDeleteQuiz] = useState<Quiz | null>(null);

  /*
   * =========================================================
   * LOAD DATA
   * =========================================================
   */

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);

      const [
        quizzesResponse,
        categoriesResponse,
        difficultyResponse,
      ] = await Promise.all([
        supabase
          .from("quizzes")
          .select(`
            *,
            categories (
              name
            ),
            difficulty_levels (
              name
            ),
            questions (
              count
            ),
            quiz_attempts (
              count
            )
          `)
          .order("created_at", {
            ascending: false,
          }),

        supabase
          .from("categories")
          .select("id,name")
          .eq("is_active", true)
          .order("name"),

        supabase
          .from("difficulty_levels")
          .select("id,name")
          .eq("is_active", true)
          .order("name"),
      ]);

      if (quizzesResponse.error) {
        console.error(
          "Quiz loading error:",
          quizzesResponse.error
        );

        toast.error(
          "Unable to load quizzes."
        );

        return;
      }

      if (categoriesResponse.error) {
        console.error(
          "Category loading error:",
          categoriesResponse.error
        );
      }

      if (difficultyResponse.error) {
        console.error(
          "Difficulty loading error:",
          difficultyResponse.error
        );
      }

      setQuizzes(
        (quizzesResponse.data || []) as Quiz[]
      );

      setCategories(
        categoriesResponse.data || []
      );

      setDifficulties(
        difficultyResponse.data || []
      );
    } catch (error) {
      console.error(
        "Load admin quiz data error:",
        error
      );

      toast.error(
        "Something went wrong while loading quizzes."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * =========================================================
   * FILTERED QUIZZES
   * =========================================================
   */

  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((quiz) => {
      const matchesSearch =
        quiz.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        quiz.description
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        quiz.categories?.name
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        quiz.status === statusFilter;

      const matchesCategory =
        categoryFilter === "ALL" ||
        quiz.category_id === categoryFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    quizzes,
    search,
    statusFilter,
    categoryFilter,
  ]);

  /*
   * =========================================================
   * STATS
   * =========================================================
   */

  const stats = useMemo(() => {
    const published = quizzes.filter(
      (q) => q.status === "PUBLISHED"
    ).length;

    const drafts = quizzes.filter(
      (q) => q.status === "DRAFT"
    ).length;

    const unpublished = quizzes.filter(
      (q) => q.status === "UNPUBLISHED"
    ).length;

    const totalQuestions = quizzes.reduce(
      (total, quiz) =>
        total +
        (quiz.questions?.[0]?.count || 0),
      0
    );

    return {
      total: quizzes.length,
      published,
      drafts,
      unpublished,
      totalQuestions,
    };
  }, [quizzes]);

  /*
   * =========================================================
   * OPEN CREATE MODAL
   * =========================================================
   */

  function openCreateModal() {
    setEditingQuiz(null);

    setForm({
      ...emptyForm,
      category_id:
        categories.length > 0
          ? categories[0].id
          : "",
      difficulty_id:
        difficulties.length > 0
          ? difficulties[0].id
          : "",
    });

    setShowModal(true);
  }

  /*
   * =========================================================
   * OPEN EDIT MODAL
   * =========================================================
   */

  function openEditModal(quiz: Quiz) {
    setEditingQuiz(quiz);

    setForm({
      title: quiz.title,
      description: quiz.description || "",
      category_id: quiz.category_id || "",
      difficulty_id: quiz.difficulty_id || "",
      duration: String(
        quiz.duration || 30
      ),
      passing_score: String(
        quiz.passing_score || 40
      ),
      status: quiz.status,
    });

    setShowModal(true);

    setOpenMenu(null);
  }

  /*
   * =========================================================
   * UPDATE FORM
   * =========================================================
   */

  function updateForm(
    field: keyof QuizForm,
    value: string
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  /*
   * =========================================================
   * SAVE QUIZ
   * =========================================================
   */

  async function handleSaveQuiz(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const title = form.title.trim();
    const description =
      form.description.trim();

    const duration = Number(
      form.duration
    );

    const passingScore = Number(
      form.passing_score
    );

    if (!title) {
      toast.error(
        "Please enter quiz title."
      );
      return;
    }

    if (!form.category_id) {
      toast.error(
        "Please select a category."
      );
      return;
    }

    if (!form.difficulty_id) {
      toast.error(
        "Please select difficulty."
      );
      return;
    }

    if (!duration || duration <= 0) {
      toast.error(
        "Duration must be greater than 0."
      );
      return;
    }

    if (
      passingScore < 0 ||
      passingScore > 100
    ) {
      toast.error(
        "Passing score must be between 0 and 100."
      );
      return;
    }

    try {
      setSaving(true);

      /*
       * Get current admin
       */

      const {
        data: {
          user,
        },
      } = await supabase.auth.getUser();

      if (!user) {
        toast.error(
          "You must be logged in as admin."
        );
        return;
      }

      /*
       * Verify ADMIN role
       */

      const { data: profile } =
        await supabase
          .from("profiles")
          .select("role,status")
          .eq("id", user.id)
          .maybeSingle();

      if (
        !profile ||
        profile.role !== "ADMIN" ||
        profile.status !== "ACTIVE"
      ) {
        toast.error(
          "Admin access required."
        );
        return;
      }

      const quizData = {
        title,
        description:
          description || null,
        category_id:
          form.category_id,
        difficulty_id:
          form.difficulty_id,
        duration,
        passing_score: passingScore,
        status: form.status,
      };

      /*
       * UPDATE
       */

      if (editingQuiz) {
        const { error } =
          await supabase
            .from("quizzes")
            .update({
              ...quizData,
              updated_at: new Date().toISOString(),
            })
            .eq(
              "id",
              editingQuiz.id
            );

        if (error) {
          console.error(
            "Update quiz error:",
            error
          );

          toast.error(
            error.message ||
              "Unable to update quiz."
          );

          return;
        }

        toast.success(
          "Quiz updated successfully."
        );
      }

      /*
       * CREATE
       */

      else {
        const { error } =
          await supabase
            .from("quizzes")
            .insert({
              ...quizData,
              created_by: user.id,
            });

        if (error) {
          console.error(
            "Create quiz error:",
            error
          );

          toast.error(
            error.message ||
              "Unable to create quiz."
          );

          return;
        }

        toast.success(
          "Quiz created successfully."
        );
      }

      setShowModal(false);
      setEditingQuiz(null);
      setForm(emptyForm);

      await loadData();
    } catch (error) {
      console.error(
        "Save quiz error:",
        error
      );

      toast.error(
        "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * =========================================================
   * DELETE QUIZ
   * =========================================================
   */

  async function handleDeleteQuiz() {
    if (!deleteQuiz) return;

    try {
      setSaving(true);

      const { error } =
        await supabase
          .from("quizzes")
          .delete()
          .eq(
            "id",
            deleteQuiz.id
          );

      if (error) {
        console.error(
          "Delete quiz error:",
          error
        );

        toast.error(
          error.message ||
            "Unable to delete quiz."
        );

        return;
      }

      toast.success(
        "Quiz deleted successfully."
      );

      setDeleteQuiz(null);

      await loadData();
    } catch (error) {
      console.error(
        "Delete error:",
        error
      );

      toast.error(
        "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  }

  /*
   * =========================================================
   * CHANGE STATUS
   * =========================================================
   */

  async function changeStatus(
    quiz: Quiz,
    status:
      | "DRAFT"
      | "PUBLISHED"
      | "UNPUBLISHED"
  ) {
    try {
      setOpenMenu(null);

      const { error } =
        await supabase
          .from("quizzes")
          .update({
            status,
            updated_at:
              new Date().toISOString(),
          })
          .eq(
            "id",
            quiz.id
          );

      if (error) {
        console.error(
          "Status update error:",
          error
        );

        toast.error(
          error.message ||
            "Unable to update quiz status."
        );

        return;
      }

      toast.success(
        status === "PUBLISHED"
          ? "Quiz published."
          : status === "UNPUBLISHED"
          ? "Quiz unpublished."
          : "Quiz moved to draft."
      );

      await loadData();
    } catch (error) {
      console.error(
        "Status error:",
        error
      );

      toast.error(
        "Something went wrong."
      );
    }
  }

  /*
   * =========================================================
   * STATUS BADGE
   * =========================================================
   */

  function StatusBadge({
    status,
  }: {
    status: Quiz["status"];
  }) {
    if (status === "PUBLISHED") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
          <CheckCircle2 size={13} />
          Published
        </span>
      );
    }

    if (status === "UNPUBLISHED") {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-600">
          <EyeOff size={13} />
          Unpublished
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-600">
        <Clock3 size={13} />
        Draft
      </span>
    );
  }

  /*
   * =========================================================
   * PAGE
   * =========================================================
   */

  return (
    <main className="min-h-screen bg-[#f7f8fc] text-gray-900">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-indigo-600">
                <Brain size={17} />
                Admin Panel
              </div>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                Quiz Management
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Create, manage, publish and monitor
                all quizzes from one place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={loadData}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshCw
                  size={17}
                  className={
                    loading
                      ? "animate-spin"
                      : ""
                  }
                />

                Refresh
              </button>

              <button
                onClick={openCreateModal}
                className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
              >
                <Plus size={18} />
                Create Quiz
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8">
        {/* ===================================================
            STATS
        =================================================== */}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Total Quizzes"
            value={stats.total}
            icon={<Brain size={20} />}
            iconClass="bg-indigo-50 text-indigo-600"
          />

          <StatCard
            title="Published"
            value={stats.published}
            icon={
              <CheckCircle2 size={20} />
            }
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            title="Drafts"
            value={stats.drafts}
            icon={<Clock3 size={20} />}
            iconClass="bg-amber-50 text-amber-600"
          />

          <StatCard
            title="Unpublished"
            value={stats.unpublished}
            icon={<EyeOff size={20} />}
            iconClass="bg-gray-100 text-gray-600"
          />

          <StatCard
            title="Total Questions"
            value={stats.totalQuestions}
            icon={
              <FileQuestion size={20} />
            }
            iconClass="bg-purple-50 text-purple-600"
          />
        </div>

        {/* ===================================================
            FILTER BAR
        =================================================== */}

        <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row">
            {/* Search */}

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search quizzes by title, description or category..."
                className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
              />
            </div>

            {/* Status */}

            <div className="relative">
              <Filter
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="h-11 min-w-[180px] appearance-none rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-9 text-sm font-semibold outline-none focus:border-indigo-500"
              >
                <option value="ALL">
                  All Status
                </option>

                <option value="PUBLISHED">
                  Published
                </option>

                <option value="DRAFT">
                  Draft
                </option>

                <option value="UNPUBLISHED">
                  Unpublished
                </option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Category */}

            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) =>
                  setCategoryFilter(
                    e.target.value
                  )
                }
                className="h-11 min-w-[190px] appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 pr-9 text-sm font-semibold outline-none focus:border-indigo-500"
              >
                <option value="ALL">
                  All Categories
                </option>

                {categories.map(
                  (category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* ===================================================
            QUIZ TABLE
        =================================================== */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
            <div>
              <h2 className="font-black">
                All Quizzes
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Showing{" "}
                {filteredQuizzes.length} of{" "}
                {quizzes.length} quizzes
              </p>
            </div>

            {(search ||
              statusFilter !== "ALL" ||
              categoryFilter !== "ALL") && (
              <button
                onClick={() => {
                  setSearch("");
                  setStatusFilter("ALL");
                  setCategoryFilter(
                    "ALL"
                  );
                }}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
              >
                Clear filters
              </button>
            )}
          </div>

          {loading ? (
            <LoadingState />
          ) : filteredQuizzes.length ===
            0 ? (
            <EmptyState
              onCreate={
                openCreateModal
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left">
                <thead className="bg-gray-50">
                  <tr className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
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
                      Questions
                    </th>

                    <th className="px-6 py-4">
                      Attempts
                    </th>

                    <th className="px-6 py-4">
                      Duration
                    </th>

                    <th className="px-6 py-4">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredQuizzes.map(
                    (quiz) => {
                      const questionCount =
                        quiz.questions?.[0]
                          ?.count || 0;

                      const attemptCount =
                        quiz.quiz_attempts?.[0]
                          ?.count || 0;

                      return (
                        <tr
                          key={quiz.id}
                          className="transition hover:bg-gray-50"
                        >
                          {/* Quiz */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-3">
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <Brain
                                  size={19}
                                />
                              </div>

                              <div className="max-w-[300px]">
                                <p className="truncate font-bold text-gray-900">
                                  {quiz.title}
                                </p>

                                <p className="mt-1 truncate text-xs text-gray-400">
                                  {quiz.description ||
                                    "No description"}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Category */}

                          <td className="px-6 py-5">
                            <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600">
                              {quiz
                                .categories
                                ?.name ||
                                "Uncategorized"}
                            </span>
                          </td>

                          {/* Difficulty */}

                          <td className="px-6 py-5">
                            <DifficultyBadge
                              name={
                                quiz
                                  .difficulty_levels
                                  ?.name ||
                                "Not set"
                              }
                            />
                          </td>

                          {/* Questions */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                              <FileQuestion
                                size={16}
                                className="text-gray-400"
                              />

                              {questionCount}
                            </div>
                          </td>

                          {/* Attempts */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                              <Users
                                size={16}
                                className="text-gray-400"
                              />

                              {attemptCount.toLocaleString()}
                            </div>
                          </td>

                          {/* Duration */}

                          <td className="px-6 py-5">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                              <Timer
                                size={16}
                                className="text-gray-400"
                              />

                              {quiz.duration}{" "}
                              min
                            </div>
                          </td>

                          {/* Status */}

                          <td className="px-6 py-5">
                            <StatusBadge
                              status={
                                quiz.status
                              }
                            />
                          </td>

                          {/* Action */}

                          <td className="relative px-6 py-5 text-right">
                            <button
                              onClick={() =>
                                setOpenMenu(
                                  openMenu ===
                                    quiz.id
                                    ? null
                                    : quiz.id
                                )
                              }
                              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                            >
                              <MoreHorizontal
                                size={20}
                              />
                            </button>

                            {openMenu ===
                              quiz.id && (
                              <div className="absolute right-6 top-14 z-30 w-48 overflow-hidden rounded-xl border border-gray-200 bg-white p-1.5 text-left shadow-xl">
                                <button
                                  onClick={() =>
                                    openEditModal(
                                      quiz
                                    )
                                  }
                                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                  <Pencil
                                    size={16}
                                  />
                                  Edit Quiz
                                </button>

                                {quiz.status !==
                                  "PUBLISHED" && (
                                  <button
                                    onClick={() =>
                                      changeStatus(
                                        quiz,
                                        "PUBLISHED"
                                      )
                                    }
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
                                  >
                                    <Eye
                                      size={16}
                                    />
                                    Publish
                                  </button>
                                )}

                                {quiz.status ===
                                  "PUBLISHED" && (
                                  <button
                                    onClick={() =>
                                      changeStatus(
                                        quiz,
                                        "UNPUBLISHED"
                                      )
                                    }
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                                  >
                                    <EyeOff
                                      size={16}
                                    />
                                    Unpublish
                                  </button>
                                )}

                                <button
                                  onClick={() => {
                                    setOpenMenu(
                                      null
                                    );

                                    setDeleteQuiz(
                                      quiz
                                    );
                                  }}
                                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
                                >
                                  <Trash2
                                    size={16}
                                  />
                                  Delete Quiz
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* =====================================================
          CREATE / EDIT MODAL
      ===================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-5 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {editingQuiz
                    ? "Quiz Management"
                    : "New Quiz"}
                </p>

                <h2 className="mt-1 text-xl font-black">
                  {editingQuiz
                    ? "Edit Quiz"
                    : "Create New Quiz"}
                </h2>
              </div>

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="rounded-xl p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}

            <form
              onSubmit={handleSaveQuiz}
              className="space-y-5 p-6 sm:p-7"
            >
              {/* Title */}

              <div>
                <label className="mb-2 block text-xs font-bold text-gray-600">
                  Quiz Title *
                </label>

                <input
                  value={form.title}
                  onChange={(e) =>
                    updateForm(
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="e.g. Ultimate General Knowledge"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                />
              </div>

              {/* Description */}

              <div>
                <label className="mb-2 block text-xs font-bold text-gray-600">
                  Description
                </label>

                <textarea
                  value={form.description}
                  onChange={(e) =>
                    updateForm(
                      "description",
                      e.target.value
                    )
                  }
                  rows={4}
                  placeholder="Write a short description about this quiz..."
                  className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
                />
              </div>

              {/* Category + Difficulty */}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-600">
                    Category *
                  </label>

                  <select
                    value={form.category_id}
                    onChange={(e) =>
                      updateForm(
                        "category_id",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500"
                  >
                    <option value="">
                      Select category
                    </option>

                    {categories.map(
                      (category) => (
                        <option
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-600">
                    Difficulty *
                  </label>

                  <select
                    value={
                      form.difficulty_id
                    }
                    onChange={(e) =>
                      updateForm(
                        "difficulty_id",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium outline-none focus:border-indigo-500"
                  >
                    <option value="">
                      Select difficulty
                    </option>

                    {difficulties.map(
                      (difficulty) => (
                        <option
                          key={difficulty.id}
                          value={
                            difficulty.id
                          }
                        >
                          {difficulty.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              {/* Duration + Passing */}

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-600">
                    Duration (minutes) *
                  </label>

                  <div className="relative">
                    <Timer
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="number"
                      min="1"
                      value={
                        form.duration
                      }
                      onChange={(e) =>
                        updateForm(
                          "duration",
                          e.target.value
                        )
                      }
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-bold text-gray-600">
                    Passing Score (%)
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={
                      form.passing_score
                    }
                    onChange={(e) =>
                      updateForm(
                        "passing_score",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Status */}

              <div>
                <label className="mb-2 block text-xs font-bold text-gray-600">
                  Quiz Status
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      "DRAFT",
                      "PUBLISHED",
                      "UNPUBLISHED",
                    ] as const
                  ).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        updateForm(
                          "status",
                          status
                        )
                      }
                      className={`rounded-xl border px-3 py-3 text-xs font-bold transition ${
                        form.status ===
                        status
                          ? status ===
                            "PUBLISHED"
                            ? "border-emerald-500 bg-emerald-50 text-emerald-600"
                            : status ===
                              "DRAFT"
                            ? "border-amber-500 bg-amber-50 text-amber-600"
                            : "border-gray-400 bg-gray-100 text-gray-700"
                          : "border-gray-200 bg-gray-50 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {status ===
                        "PUBLISHED" &&
                        "Published"}

                      {status ===
                        "DRAFT" &&
                        "Draft"}

                      {status ===
                        "UNPUBLISHED" &&
                        "Unpublished"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notice */}

              <div className="flex gap-3 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
                <AlertCircle
                  size={18}
                  className="mt-0.5 shrink-0 text-indigo-600"
                />

                <p className="text-xs leading-5 text-indigo-700">
                  After creating the quiz, you can
                  add questions from the Questions
                  management page.
                </p>
              </div>

              {/* Buttons */}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() =>
                    setShowModal(false)
                  }
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <RefreshCw
                        size={16}
                        className="animate-spin"
                      />
                      Saving...
                    </>
                  ) : editingQuiz ? (
                    <>
                      <Pencil size={16} />
                      Update Quiz
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Create Quiz
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {deleteQuiz && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <Trash2 size={21} />
            </div>

            <h2 className="mt-5 text-xl font-black">
              Delete this quiz?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              You are about to delete{" "}
              <span className="font-bold text-gray-900">
                "{deleteQuiz.title}"
              </span>
              . All questions and attempts
              related to this quiz may also be
              removed because of the database
              relationships.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() =>
                  setDeleteQuiz(null)
                }
                className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteQuiz}
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                <Trash2 size={16} />
                {saving
                  ? "Deleting..."
                  : "Delete Quiz"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/*
 * =========================================================
 * STAT CARD
 * =========================================================
 */

function StatCard({
  title,
  value,
  icon,
  iconClass,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  iconClass: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
      >
        {icon}
      </div>

      <p className="mt-5 text-xs font-semibold text-gray-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-black">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

/*
 * =========================================================
 * DIFFICULTY BADGE
 * =========================================================
 */

function DifficultyBadge({
  name,
}: {
  name: string;
}) {
  const normalized =
    name.toLowerCase();

  let className =
    "bg-gray-100 text-gray-600";

  if (normalized === "easy") {
    className =
      "bg-emerald-50 text-emerald-600";
  }

  if (normalized === "medium") {
    className =
      "bg-amber-50 text-amber-600";
  }

  if (normalized === "hard") {
    className =
      "bg-red-50 text-red-600";
  }

  return (
    <span
      className={`rounded-full px-3 py-1.5 text-xs font-bold ${className}`}
    >
      {name}
    </span>
  );
}

/*
 * =========================================================
 * LOADING STATE
 * =========================================================
 */

function LoadingState() {
  return (
    <div className="flex min-h-[350px] flex-col items-center justify-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <RefreshCw
          size={22}
          className="animate-spin"
        />
      </div>

      <p className="mt-4 text-sm font-bold text-gray-600">
        Loading quizzes...
      </p>

      <p className="mt-1 text-xs text-gray-400">
        Fetching data from Supabase
      </p>
    </div>
  );
}

/*
 * =========================================================
 * EMPTY STATE
 * =========================================================
 */

function EmptyState({
  onCreate,
}: {
  onCreate: () => void;
}) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <Brain size={28} />
      </div>

      <h3 className="mt-5 text-lg font-black">
        No quizzes found
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-6 text-gray-400">
        There are no quizzes matching your current
        filters. Create your first quiz to get
        started.
      </p>

      <button
        onClick={onCreate}
        className="mt-6 flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700"
      >
        <Plus size={17} />
        Create Quiz
      </button>
    </div>
  );
}
