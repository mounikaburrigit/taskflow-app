import { Bell, Menu, Search, Sparkles } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <header
      className="
        fixed top-0 right-0 z-40
        h-16
        left-0 lg:left-64
        border-b border-slate-800
        bg-[#080B14]/90
        backdrop-blur-xl
      "
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6">

        {/* Left */}
        <div className="flex items-center gap-3">

          <button
            onClick={onMenuClick}
            className="
              rounded-xl
              border border-slate-800
              bg-[#111827]
              p-2
              text-slate-400
              hover:text-white
              lg:hidden
            "
          >
            <Menu size={19} />
          </button>

          <div className="flex items-center gap-2 lg:hidden">

            <div
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-xl
                bg-gradient-to-br
                from-violet-600
                to-cyan-500
              "
            >
              <Sparkles size={18} />
            </div>

            <span className="font-bold">
              TaskFlow
            </span>

          </div>

          {/* Search */}

          <div className="relative hidden md:block">

            <Search
              size={16}
              className="
                absolute left-3 top-1/2
                -translate-y-1/2
                text-slate-500
              "
            />

            <input
              type="text"
              placeholder="Search tasks..."
              className="
                h-10
                w-64
                rounded-xl
                border border-slate-800
                bg-[#111827]
                pl-9 pr-4
                text-sm
                text-white
                outline-none
                placeholder:text-slate-500
                focus:border-violet-500/50
              "
            />

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <button
            className="
              relative
              rounded-xl
              border border-slate-800
              bg-[#111827]
              p-2.5
              text-slate-400
              hover:text-white
            "
          >
            <Bell size={18} />

            <span
              className="
                absolute
                right-2
                top-2
                h-1.5
                w-1.5
                rounded-full
                bg-cyan-400
              "
            />
          </button>

          <div className="flex items-center gap-3">

            <div
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full
                bg-gradient-to-br
                from-violet-500
                to-cyan-500
                text-sm
                font-bold
              "
            >
              M
            </div>

            <div className="hidden sm:block">

              <p className="text-sm font-medium">
                Mounika
              </p>

              <p className="text-[11px] text-slate-500">
                Developer
              </p>

            </div>

          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;