import {
  LayoutDashboard,
  ListTodo,
  Clock3,
  CheckCircle2,
  Settings,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";

const Sidebar = ({
  open,
  onClose,
  activeFilter,
  onFilterChange,
}) => {

  // ==========================================
  // LOGOUT
  // ==========================================

  const handleLogout = () => {
    // Remove authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optional: remove other auth-related data
    localStorage.removeItem("authToken");

    // Redirect to login
    window.location.href = "/login";
  };


  // ==========================================
  // SIDEBAR FILTER
  // ==========================================

  const handleFilterClick = (filter) => {
    onFilterChange(filter);

    // Close mobile sidebar
    if (onClose) {
      onClose();
    }
  };


  return (
    <>
      {/* ==========================================
          MOBILE OVERLAY
      ========================================== */}

      {open && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            lg:hidden
          "
          onClick={onClose}
        />
      )}


      {/* ==========================================
          SIDEBAR
      ========================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          h-screen
          w-64
          border-r
          border-slate-800
          bg-[#0D111C]
          transition-transform
          duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >

        <div className="flex h-full flex-col">


          {/* ==========================================
              LOGO
          ========================================== */}

          <div
            className="
              flex
              h-16
              items-center
              justify-between
              border-b
              border-slate-800
              px-5
            "
          >

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-violet-600
                  to-cyan-500
                "
              >
                <Sparkles size={18} />
              </div>


              <div>

                <p className="font-bold text-white">
                  TaskFlow
                </p>

                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-violet-400
                  "
                >
                  AI Workspace
                </p>

              </div>

            </div>


            {/* Mobile close */}

            <button
              onClick={onClose}
              className="
                text-slate-500
                hover:text-white
                lg:hidden
              "
            >
              <X size={19} />
            </button>

          </div>


          {/* ==========================================
              NAVIGATION
          ========================================== */}

          <nav className="flex-1 px-4 py-6">

            <p
              className="
                mb-3
                px-3
                text-[10px]
                uppercase
                tracking-[0.18em]
                text-slate-600
              "
            >
              Workspace
            </p>


            {/* Dashboard */}

            <SidebarItem
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              active={
                activeFilter === "ALL"
              }
              onClick={() =>
                handleFilterClick("ALL")
              }
            />


            {/* All Tasks */}

            <SidebarItem
              icon={<ListTodo size={18} />}
              label="All Tasks"
              active={
                activeFilter === "ALL_TASKS"
              }
              onClick={() =>
                handleFilterClick("ALL_TASKS")
              }
            />


            {/* Pending */}

            <SidebarItem
              icon={<Clock3 size={18} />}
              label="Pending"
              active={
                activeFilter === "PENDING"
              }
              onClick={() =>
                handleFilterClick("PENDING")
              }
            />


            {/* Completed */}

            <SidebarItem
              icon={<CheckCircle2 size={18} />}
              label="Completed"
              active={
                activeFilter === "DONE"
              }
              onClick={() =>
                handleFilterClick("DONE")
              }
            />

          </nav>


          {/* ==========================================
              AI CARD
          ========================================== */}

          <div className="px-4 pb-5">

            <div
              className="
                rounded-2xl
                border
                border-violet-500/20
                bg-gradient-to-br
                from-violet-500/10
                to-cyan-500/5
                p-4
              "
            >

              <div className="flex items-center gap-2">

                <Sparkles
                  size={16}
                  className="text-violet-400"
                />

                <span className="text-sm font-semibold text-white">
                  AI Assistant
                </span>

              </div>


              <p
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-slate-500
                "
              >
                Focus on your highest priority
                tasks first.
              </p>

            </div>

          </div>


          {/* ==========================================
              BOTTOM MENU
          ========================================== */}

          <div
            className="
              border-t
              border-slate-800
              p-4
            "
          >

            {/* Settings */}

            <SidebarItem
              icon={<Settings size={18} />}
              label="Settings"
              onClick={() => {}}
            />


            {/* Logout */}

            <SidebarItem
              icon={<LogOut size={18} />}
              label="Logout"
              onClick={handleLogout}
            />

          </div>

        </div>

      </aside>
    </>
  );
};


/* ==========================================
   SIDEBAR ITEM
========================================== */

const SidebarItem = ({
  icon,
  label,
  active = false,
  onClick,
}) => {

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        mb-1
        flex
        w-full
        items-center
        gap-3
        rounded-xl
        px-3
        py-2.5
        text-sm
        transition

        ${
          active
            ? `
              border
              border-violet-500/20
              bg-violet-500/10
              text-violet-300
            `
            : `
              text-slate-400
              hover:bg-slate-800
              hover:text-white
            `
        }
      `}
    >

      {icon}

      <span>
        {label}
      </span>

    </button>
  );
};


export default Sidebar;