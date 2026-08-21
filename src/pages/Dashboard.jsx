import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  CheckCircle2,
  Clock3,
  ListTodo,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import FilterBar from "../components/FilterBar";
import TaskCard from "../components/TaskCard";
import TaskFormModal from "../components/TaskFormModal";
import Pagination from "../components/Pagination";

const Dashboard = () => {
  // ==========================================
  // UI STATES
  // ==========================================

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [showModal, setShowModal] =
    useState(false);

  // IMPORTANT:
  // null = Create mode
  // task object = Edit mode
  const [editingTask, setEditingTask] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  // Sidebar filter
  const [sidebarFilter, setSidebarFilter] =
    useState("ALL");

  // ==========================================
  // TASK STATES
  // ==========================================

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ==========================================
  // PAGINATION STATES
  // ==========================================

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalTasks, setTotalTasks] =
    useState(0);

  // ==========================================
  // GET TASKS FROM BACKEND
  // ==========================================

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const token =
        localStorage.getItem("token");

      if (!token) {
        setError(
          "Authentication required. Please login again."
        );

        setLoading(false);
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/tasks?limit=100",
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result =
        await response.json();

      console.log(
        "GET TASKS RESPONSE:",
        result
      );

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Failed to fetch tasks"
        );
      }

      if (result.success) {
        console.log(
          "TASKS RECEIVED:",
          result.tasks
        );

        setTasks(
          result.tasks || []
        );

        setTotalTasks(
          result.pagination?.totalTasks ||
            result.tasks?.length ||
            0
        );

        setTotalPages(
          result.pagination?.totalPages ||
            1
        );

        setCurrentPage(
          result.pagination?.currentPage ||
            1
        );
      } else {
        setTasks([]);

        setError(
          result.message ||
            "Unable to load tasks"
        );
      }
    } catch (error) {
      console.error(
        "Fetch Tasks Error:",
        error
      );

      setError(
        error.message ||
          "Unable to connect to server"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD TASKS WHEN DASHBOARD OPENS
  // ==========================================

  useEffect(() => {
    fetchTasks();
  }, []);

  // ==========================================
  // FILTER TASKS
  // ==========================================

  const filteredTasks =
    tasks.filter((task) => {
      const title =
        task.title || "";

      const description =
        task.description || "";

      const searchValue =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        title
          .toLowerCase()
          .includes(searchValue) ||
        description
          .toLowerCase()
          .includes(searchValue);

      const matchesSidebar =
        sidebarFilter === "ALL" ||
        sidebarFilter === "ALL_TASKS" ||
        task.status === sidebarFilter;

      const matchesStatus =
        status === "ALL" ||
        task.status === status;

      return (
        matchesSearch &&
        matchesSidebar &&
        matchesStatus
      );
    });

  // ==========================================
  // DYNAMIC STATISTICS
  // ==========================================

  const pendingTasks =
    tasks.filter(
      (task) =>
        task.status === "PENDING"
    ).length;

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "IN_PROGRESS"
    ).length;

  const completedTasks =
    tasks.filter(
      (task) =>
        task.status === "DONE"
    ).length;

  // ==========================================
  // CREATE TASK
  // ==========================================

  const handleTaskCreated =
    async () => {
      console.log(
        "TASK CREATED - REFRESHING"
      );

      setShowModal(false);

      setEditingTask(null);

      await fetchTasks();
    };

  // ==========================================
  // EDIT TASK
  // ==========================================

  const handleEditTask = (task) => {
    console.log(
      "================================"
    );

    console.log(
      "EDIT TASK CLICKED:",
      task
    );

    console.log(
      "TASK ID:",
      task?._id
    );

    console.log(
      "================================"
    );

    setEditingTask(task);

    setShowModal(true);
  };

  // ==========================================
  // UPDATE TASK
  // ==========================================

  const handleTaskUpdated =
    async (updatedTask) => {
      console.log(
        "================================"
      );

      console.log(
        "TASK UPDATED SUCCESSFULLY:",
        updatedTask
      );

      console.log(
        "================================"
      );

      setShowModal(false);

      setEditingTask(null);

      await fetchTasks();
    };

  // ==========================================
  // DELETE TASK
  // ==========================================

  const handleTaskDeleted =
    async () => {
      console.log(
        "TASK DELETED - REFRESHING"
      );

      await fetchTasks();
    };

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = () => {
    fetchTasks();
  };

  // ==========================================
  // OPEN CREATE MODAL
  // ==========================================

  const handleCreateTask = () => {
    // VERY IMPORTANT:
    // Clear editing task before creating
    setEditingTask(null);

    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-[#080B14] text-slate-100">

      {/* =====================================
          NAVBAR
      ===================================== */}

      <Navbar
        onMenuClick={() =>
          setSidebarOpen(true)
        }
      />

      {/* =====================================
          SIDEBAR
      ===================================== */}

      <Sidebar
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
        activeFilter={sidebarFilter}
        onFilterChange={(filter) => {
          setSidebarFilter(filter);

          if (
            filter === "ALL" ||
            filter === "ALL_TASKS"
          ) {
            setStatus("ALL");
          } else {
            setStatus(filter);
          }

          setSidebarOpen(false);
        }}
      />

      {/* =====================================
          MAIN
      ===================================== */}

      <main className="pt-16 lg:ml-64">

        <div className="px-4 py-6 sm:px-6 lg:px-8">

          {/* =====================================
              HERO
          ===================================== */}

          <motion.section
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              relative
              mb-7
              overflow-hidden
              rounded-3xl
              border
              border-slate-800
              bg-[#0D111C]
              p-5
              sm:p-7
            "
          >

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-violet-600/10
                blur-3xl
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-20
                right-20
                h-48
                w-48
                rounded-full
                bg-cyan-500/10
                blur-3xl
              "
            />

            <div className="relative z-10">

              <div className="mb-3 flex items-center gap-2">

                <Sparkles
                  size={16}
                  className="text-violet-400"
                />

                <span
                  className="
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-violet-400
                  "
                >
                  AI Workspace
                </span>

              </div>

              <div
                className="
                  flex
                  flex-col
                  gap-5
                  md:flex-row
                  md:items-end
                  md:justify-between
                "
              >

                <div>

                  <h1
                    className="
                      text-2xl
                      font-bold
                      sm:text-3xl
                      lg:text-4xl
                    "
                  >
                    Good morning, Mounika 👋
                  </h1>

                  <p
                    className="
                      mt-3
                      max-w-xl
                      text-sm
                      leading-6
                      text-slate-400
                    "
                  >
                    Stay focused, manage your
                    priorities, and make meaningful
                    progress today.
                  </p>

                </div>

                <button
                  onClick={handleCreateTask}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-gradient-to-r
                    from-violet-600
                    to-cyan-500
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    shadow-lg
                    shadow-violet-500/20
                    transition
                    hover:scale-[1.02]
                  "
                >
                  <Plus size={18} />

                  Create Task
                </button>

              </div>

            </div>

          </motion.section>

          {/* =====================================
              STATS
          ===================================== */}

          <div
            className="
              grid
              grid-cols-2
              gap-4
              xl:grid-cols-4
            "
          >

            <StatCard
              icon={
                <ListTodo size={20} />
              }
              title="Total Tasks"
              value={totalTasks}
              text="Live data"
              iconStyle="
                bg-violet-500/10
                text-violet-400
              "
            />

            <StatCard
              icon={
                <Clock3 size={20} />
              }
              title="Pending"
              value={pendingTasks}
              text="Live data"
              iconStyle="
                bg-amber-500/10
                text-amber-400
              "
            />

            <StatCard
              icon={
                <TrendingUp size={20} />
              }
              title="In Progress"
              value={inProgressTasks}
              text="Live data"
              iconStyle="
                bg-cyan-500/10
                text-cyan-400
              "
            />

            <StatCard
              icon={
                <CheckCircle2 size={20} />
              }
              title="Completed"
              value={completedTasks}
              text="Live data"
              iconStyle="
                bg-emerald-500/10
                text-emerald-400
              "
            />

          </div>

          {/* =====================================
              AI INSIGHTS
          ===================================== */}

          <div
            className="
              mt-6
              grid
              gap-4
              lg:grid-cols-3
            "
          >

            {/* Pending */}

            <div
              className="
                rounded-2xl
                border
                border-slate-800
                bg-[#111827]
                p-5
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-violet-500/10
                    text-violet-400
                  "
                >
                  <Sparkles size={19} />
                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    AI Insight
                  </p>

                  <h3 className="text-sm font-semibold">
                    Stay focused
                  </h3>

                </div>

              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                You currently have{" "}
                <span className="font-semibold text-violet-400">
                  {pendingTasks}
                </span>{" "}
                pending tasks.
              </p>

            </div>

            {/* Progress */}

            <div
              className="
                rounded-2xl
                border
                border-slate-800
                bg-[#111827]
                p-5
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-500/10
                    text-cyan-400
                  "
                >
                  <TrendingUp size={19} />
                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Progress
                  </p>

                  <h3 className="text-sm font-semibold">
                    Keep going
                  </h3>

                </div>

              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                {inProgressTasks} tasks are
                currently in progress.
              </p>

            </div>

            {/* Completed */}

            <div
              className="
                rounded-2xl
                border
                border-slate-800
                bg-[#111827]
                p-5
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-500/10
                    text-emerald-400
                  "
                >
                  <CheckCircle2 size={19} />
                </div>

                <div>

                  <p className="text-xs text-slate-500">
                    Completed
                  </p>

                  <h3 className="text-sm font-semibold">
                    Great work
                  </h3>

                </div>

              </div>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                You have completed{" "}
                <span className="font-semibold text-emerald-400">
                  {completedTasks}
                </span>{" "}
                tasks.
              </p>

            </div>

          </div>

          {/* =====================================
              MY TASKS
          ===================================== */}

          <section className="mt-8">

            <div
              className="
                mb-5
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              <div>

                <h2 className="text-xl font-bold">
                  My Tasks
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Manage your work and priorities
                </p>

              </div>

              <button
                onClick={handleRefresh}
                disabled={loading}
                className="
                  rounded-xl
                  border
                  border-slate-800
                  bg-[#0D111C]
                  px-4
                  py-2
                  text-xs
                  text-slate-400
                  transition
                  hover:border-violet-500/40
                  hover:text-violet-400
                  disabled:opacity-50
                "
              >
                {loading
                  ? "Loading..."
                  : "Refresh"}
              </button>

            </div>

            {/* =====================================
                FILTER BAR
            ===================================== */}

            <div
              className="
                mb-5
                rounded-2xl
                border
                border-slate-800
                bg-[#0D111C]
                p-3
              "
            >

              <FilterBar
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
              />

            </div>

            {/* =====================================
                ERROR
            ===================================== */}

            {error && (
              <div
                className="
                  mb-5
                  rounded-xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  p-4
                  text-sm
                  text-red-400
                "
              >
                {error}
              </div>
            )}

            {/* =====================================
                LOADING
            ===================================== */}

            {loading ? (

              <div className="space-y-4">

                {[1, 2, 3].map(
                  (item) => (
                    <div
                      key={item}
                      className="
                        h-40
                        animate-pulse
                        rounded-2xl
                        border
                        border-slate-800
                        bg-[#0D111C]
                      "
                    />
                  )
                )}

              </div>

            ) : (

              /* =====================================
                  DYNAMIC TASK CARDS
              ===================================== */

              <div className="space-y-4">

                {filteredTasks.map(
                  (task, index) => (

                    <motion.div
                      key={task._id}
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.08,
                      }}
                    >

                      <TaskCard
                        task={task}

                        // IMPORTANT
                        // This connects Edit
                        // button to Dashboard
                        onEdit={
                          handleEditTask
                        }

                        onDelete={
                          handleTaskDeleted
                        }
                      />

                    </motion.div>

                  )
                )}

              </div>

            )}

            {/* =====================================
                NO TASKS
            ===================================== */}

            {!loading &&
              filteredTasks.length === 0 && (

                <div
                  className="
                    rounded-2xl
                    border
                    border-dashed
                    border-slate-800
                    p-12
                    text-center
                  "
                >

                  <ListTodo
                    className="
                      mx-auto
                      text-violet-400
                    "
                  />

                  <p className="mt-3 text-sm text-slate-500">

                    {tasks.length === 0
                      ? "No tasks created yet."
                      : "No tasks found for this filter."}

                  </p>

                  {tasks.length === 0 && (

                    <button
                      onClick={
                        handleCreateTask
                      }
                      className="
                        mt-4
                        rounded-xl
                        bg-violet-600
                        px-5
                        py-2.5
                        text-sm
                        font-semibold
                        transition
                        hover:bg-violet-500
                      "
                    >
                      Create Task
                    </button>

                  )}

                </div>

              )}

            {/* =====================================
                PAGINATION
            ===================================== */}

            {totalPages > 1 && (

              <div className="mt-6">

                <Pagination
                  currentPage={
                    currentPage
                  }

                  totalPages={
                    totalPages
                  }

                  onPageChange={(
                    page
                  ) => {
                    setCurrentPage(
                      page
                    );
                  }}
                />

              </div>

            )}

          </section>

        </div>

      </main>

      {/* =====================================
          CREATE / EDIT TASK MODAL
      ===================================== */}

      {showModal && (

        <TaskFormModal

          // IMPORTANT:
          // null = create
          // task = edit
          task={editingTask}

          onClose={() => {
            setShowModal(false);
            setEditingTask(null);
          }}

          onTaskCreated={
            handleTaskCreated
          }

          onTaskUpdated={
            handleTaskUpdated
          }

        />

      )}

    </div>
  );
};


// ==========================================
// STAT CARD
// ==========================================

const StatCard = ({
  icon,
  title,
  value,
  text,
  iconStyle,
}) => {

  return (

    <motion.div
      whileHover={{
        y: -3,
      }}
      className="
        rounded-2xl
        border
        border-slate-800
        bg-[#111827]
        p-4
        sm:p-5
      "
    >

      <div className="flex justify-between">

        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            ${iconStyle}
          `}
        >
          {icon}
        </div>

        <span
          className="
            hidden
            text-[10px]
            text-emerald-400
            sm:block
          "
        >
          {text}
        </span>

      </div>

      <p className="mt-4 text-xs text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 text-2xl font-bold">
        {value}
      </h3>

    </motion.div>

  );
};

export default Dashboard;