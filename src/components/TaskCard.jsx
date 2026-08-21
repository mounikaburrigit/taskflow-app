import {
  useState,
} from "react";

import {
  CalendarDays,
  MapPin,
  Paperclip,
  CloudSun,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

const TaskCard = ({
  task,
  onEdit,
  onDelete,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!task) return null;

  const priorityStyle = {
    HIGH: "bg-red-500/10 text-red-400",
    MEDIUM: "bg-cyan-500/10 text-cyan-400",
    LOW: "bg-slate-500/10 text-slate-400",
  };

  const statusStyle = {
    PENDING: "bg-amber-500/10 text-amber-400",
    IN_PROGRESS: "bg-cyan-500/10 text-cyan-400",
    DONE: "bg-emerald-500/10 text-emerald-400",
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Authentication required. Please login again.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to delete task"
        );
      }

      setMenuOpen(false);

      if (onDelete) {
        await onDelete();
      }
    } catch (error) {
      console.error("Delete Task Error:", error);
      alert(error.message || "Unable to delete task");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = () => {
    setMenuOpen(false);
    if (onEdit) {
      onEdit(task);
    }
  };

  return (
    <div
      className="
        group
        rounded-2xl
        border
        border-slate-800
        bg-[#111827]
        p-5
        transition
        hover:border-violet-500/30
        hover:bg-[#131C2E]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-semibold text-white sm:text-base">
              {task.title}
            </h3>

            <span
              className={`rounded-full px-2 py-1 text-[9px] font-medium ${
                priorityStyle[task.priority] ||
                priorityStyle.MEDIUM
              }`}
            >
              {task.priority || "MEDIUM"}
            </span>
          </div>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {task.description || "No description provided."}
          </p>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white"
            aria-label="Task options"
          >
            <MoreHorizontal size={18} />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-11 z-20 w-36 overflow-hidden rounded-xl border border-slate-700 bg-[#0D111C] p-1 shadow-xl"
            >
              <button
                type="button"
                onClick={handleEdit}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <Pencil size={14} />
                Edit
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs text-red-400 hover:bg-red-500/10 disabled:opacity-50"
              >
                <Trash2 size={14} />
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-slate-800 pt-4">
        <span
          className={`rounded-full px-2.5 py-1 text-[9px] font-medium ${
            statusStyle[task.status] || statusStyle.PENDING
          }`}
        >
          {task.status?.replace("_", " ") || "PENDING"}
        </span>

        {task.location && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <MapPin size={14} />
            {task.location}
          </div>
        )}

        {task.dueDate && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <CalendarDays size={14} />
            {new Date(task.dueDate).toLocaleDateString()}
          </div>
        )}

        {task.weather && (
          <div className="flex items-center gap-1.5 text-xs text-cyan-400">
            <CloudSun size={14} />
            {typeof task.weather === "object"
              ? `${task.weather.temperature ?? ""}°C ${task.weather.condition ?? ""}`
              : task.weather}
          </div>
        )}

        {task.attachment && (
          <div className="flex items-center gap-1.5 text-xs text-violet-400">
            <Paperclip size={14} />
            Attachment
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;