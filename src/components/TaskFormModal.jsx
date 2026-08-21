import { useState, useEffect } from "react";

import {
  X,
  Upload,
  CalendarDays,
  MapPin,
  FileText,
} from "lucide-react";

const TaskFormModal = ({
  task,
  onClose,
  onTaskCreated,
  onTaskUpdated,
}) => {
  // ==========================================
  // FORM STATE
  // ==========================================

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "PENDING",
    priority: "MEDIUM",
    dueDate: "",
    location: "",
  });

  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // IMPORTANT
  // If task exists -> EDIT MODE
  // If task doesn't exist -> CREATE MODE
  const isEditMode = Boolean(task && task._id);


  // ==========================================
  // LOAD TASK DATA WHEN EDITING
  // ==========================================

  useEffect(() => {
    console.log("TASK FORM MODAL:", {
      isEditMode,
      task,
    });

    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "PENDING",
        priority: task.priority || "MEDIUM",

        dueDate: task.dueDate
          ? String(task.dueDate).substring(0, 10)
          : "",

        location: task.location || "",
      });

      // New attachment can be selected
      setAttachment(null);
    } else {
      // CREATE MODE
      setFormData({
        title: "",
        description: "",
        status: "PENDING",
        priority: "MEDIUM",
        dueDate: "",
        location: "",
      });

      setAttachment(null);
    }

    setError("");
  }, [task]);


  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  // ==========================================
  // FILE CHANGE
  // ==========================================

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      setAttachment(file);
    }
  };


  // ==========================================
  // SUBMIT
  // CREATE OR UPDATE
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ==========================================
    // VALIDATION
    // ==========================================

    if (!formData.title.trim()) {
      setError("Task title is required.");
      return;
    }

    if (!formData.dueDate) {
      setError("Due date is required.");
      return;
    }


    try {
      setLoading(true);

      // ==========================================
      // TOKEN
      // ==========================================

      const token = localStorage.getItem("token");

      if (!token) {
        setError(
          "Authentication required. Please login again."
        );

        setLoading(false);
        return;
      }


      // ==========================================
      // FORMDATA
      // ==========================================

      const data = new FormData();

      data.append(
        "title",
        formData.title.trim()
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "status",
        formData.status
      );

      data.append(
        "priority",
        formData.priority
      );

      data.append(
        "dueDate",
        formData.dueDate
      );

      data.append(
        "location",
        formData.location.trim()
      );


      // Only send file if user selected a new one
      if (attachment) {
        data.append(
          "attachment",
          attachment
        );
      }


      // ==========================================
      // IMPORTANT API LOGIC
      // ==========================================

      const url = isEditMode
        ? `http://localhost:5000/api/tasks/${task._id}`
        : "http://localhost:5000/api/tasks";

      const method = isEditMode
        ? "PUT"
        : "POST";


      // ==========================================
      // DEBUG
      // ==========================================

      console.log(
        "=============================="
      );

      console.log(
        isEditMode
          ? "UPDATING TASK"
          : "CREATING TASK"
      );

      console.log({
        isEditMode,
        taskId: task?._id,
        url,
        method,
        formData,
        attachment,
      });

      console.log(
        "=============================="
      );


      // ==========================================
      // API REQUEST
      // ==========================================

      const response = await fetch(
        url,
        {
          method: method,

          headers: {
            Authorization:
              `Bearer ${token}`,
          },

          // DO NOT set Content-Type manually
          // Browser automatically sets multipart/form-data
          body: data,
        }
      );


      // ==========================================
      // RESPONSE
      // ==========================================

      const result =
        await response.json();

      console.log(
        isEditMode
          ? "UPDATE TASK RESPONSE:"
          : "CREATE TASK RESPONSE:",
        result
      );


      // ==========================================
      // API ERROR
      // ==========================================

      if (!response.ok) {
        throw new Error(
          result.message ||
          (
            isEditMode
              ? "Failed to update task"
              : "Failed to create task"
          )
        );
      }


      if (!result.success) {
        throw new Error(
          result.message ||
          (
            isEditMode
              ? "Task update failed"
              : "Task creation failed"
          )
        );
      }


      // ==========================================
      // SUCCESS
      // ==========================================

      if (isEditMode) {
        console.log(
          "TASK UPDATED SUCCESSFULLY:",
          result.task
        );

        if (onTaskUpdated) {
          await onTaskUpdated(result.task);
        } else {
          onClose();
        }

      } else {
        console.log(
          "TASK CREATED SUCCESSFULLY:",
          result.task
        );

        if (onTaskCreated) {
          await onTaskCreated(result.task);
        } else {
          onClose();
        }
      }


    } catch (error) {

      console.error(
        isEditMode
          ? "Update Task Error:"
          : "Create Task Error:",
        error
      );

      setError(
        error.message ||
        (
          isEditMode
            ? "Unable to update task"
            : "Unable to create task"
        )
      );

    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // UI
  // ==========================================

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/70
        p-4
        backdrop-blur-sm
      "
    >

      <div
        className="
          max-h-[90vh]
          w-full
          max-w-2xl
          overflow-y-auto
          rounded-3xl
          border
          border-slate-800
          bg-[#0D111C]
          shadow-2xl
        "
      >

        {/* ======================================
            HEADER
        ======================================= */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-800
            px-6
            py-5
          "
        >

          <div>

            <h2
              className="
                text-xl
                font-bold
                text-white
              "
            >
              {isEditMode
                ? "Edit Task"
                : "Create New Task"}
            </h2>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              {isEditMode
                ? "Update your task details"
                : "Add a task to your workspace"}
            </p>

          </div>


          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              p-2
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
              disabled:opacity-50
            "
          >
            <X size={20} />
          </button>

        </div>


        {/* ======================================
            FORM
        ======================================= */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* ERROR */}

          {error && (
            <div
              className="
                rounded-xl
                border
                border-red-500/20
                bg-red-500/10
                p-3
                text-sm
                text-red-400
              "
            >
              {error}
            </div>
          )}


          {/* TITLE */}

          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="
                w-full
                rounded-xl
                border
                border-slate-800
                bg-[#111827]
                px-4
                py-3
                text-sm
                text-white
                outline-none
                placeholder:text-slate-600
                focus:border-violet-500
              "
            />

          </div>


          {/* DESCRIPTION */}

          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-slate-300
              "
            >
              Description
            </label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your task..."
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-slate-800
                bg-[#111827]
                px-4
                py-3
                text-sm
                text-white
                outline-none
                placeholder:text-slate-600
                focus:border-violet-500
              "
            />

          </div>


          {/* STATUS + PRIORITY */}

          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
            "
          >

            {/* STATUS */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-300
                "
              >
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-800
                  bg-[#111827]
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  focus:border-violet-500
                "
              >

                <option value="PENDING">
                  Pending
                </option>

                <option value="IN_PROGRESS">
                  In Progress
                </option>

                <option value="DONE">
                  Done
                </option>

              </select>

            </div>


            {/* PRIORITY */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-300
                "
              >
                Priority
              </label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-800
                  bg-[#111827]
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  focus:border-violet-500
                "
              >

                <option value="LOW">
                  Low
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="HIGH">
                  High
                </option>

              </select>

            </div>

          </div>


          {/* DATE + LOCATION */}

          <div
            className="
              grid
              gap-4
              sm:grid-cols-2
            "
          >

            {/* DATE */}

            <div>

              <label
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-slate-300
                "
              >
                <CalendarDays
                  size={16}
                  className="text-violet-400"
                />

                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-800
                  bg-[#111827]
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  focus:border-violet-500
                "
              />

            </div>


            {/* LOCATION */}

            <div>

              <label
                className="
                  mb-2
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-medium
                  text-slate-300
                "
              >

                <MapPin
                  size={16}
                  className="text-cyan-400"
                />

                Location

              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Hyderabad"
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-800
                  bg-[#111827]
                  px-4
                  py-3
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-slate-600
                  focus:border-violet-500
                "
              />

            </div>

          </div>


          {/* ATTACHMENT */}

          <div>

            <label
              className="
                mb-2
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-slate-300
              "
            >

              <FileText
                size={16}
                className="text-violet-400"
              />

              Attachment

            </label>


            <label
              className="
                flex
                cursor-pointer
                items-center
                gap-3
                rounded-xl
                border
                border-dashed
                border-slate-700
                bg-[#111827]
                px-4
                py-4
                transition
                hover:border-violet-500
              "
            >

              <Upload
                size={20}
                className="text-violet-400"
              />


              <div className="min-w-0">

                <p
                  className="
                    truncate
                    text-sm
                    text-slate-300
                  "
                >
                  {attachment
                    ? attachment.name
                    : task?.attachment
                      ? "Existing attachment"
                      : "Choose attachment"}
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-600
                  "
                >
                  PDF, JPG, PNG or other files
                </p>

              </div>


              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />

            </label>

          </div>


          {/* BUTTONS */}

          <div
            className="
              flex
              flex-col-reverse
              gap-3
              pt-2
              sm:flex-row
              sm:justify-end
            "
          >

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                rounded-xl
                border
                border-slate-800
                px-5
                py-3
                text-sm
                font-medium
                text-slate-400
                transition
                hover:bg-slate-800
                hover:text-white
                disabled:opacity-50
              "
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={loading}
              className="
                rounded-xl
                bg-gradient-to-r
                from-violet-600
                to-cyan-500
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-violet-500/20
                transition
                hover:scale-[1.01]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                  ? "Update Task"
                  : "Create Task"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default TaskFormModal;