import { Search, SlidersHorizontal } from "lucide-react";

const FilterBar = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  return (
    <div
      className="
        flex
        flex-col
        gap-3
        lg:flex-row
        lg:items-center
        lg:justify-between
      "
    >

      {/* Search */}

      <div className="relative w-full lg:max-w-sm">

        <Search
          size={16}
          className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-slate-500
          "
        />

        <input
          type="text"
          value={search || ""}
          onChange={(e) =>
            setSearch?.(e.target.value)
          }
          placeholder="Search your tasks..."
          className="
            h-10
            w-full
            rounded-xl
            border border-slate-800
            bg-[#111827]
            pl-9
            pr-4
            text-sm
            text-white
            outline-none
            placeholder:text-slate-500
            focus:border-violet-500/50
          "
        />

      </div>

      {/* Filters */}

      <div className="flex items-center gap-2 overflow-x-auto">

        <div
          className="
            flex
            items-center
            gap-2
            px-2
            text-slate-500
          "
        >
          <SlidersHorizontal size={15} />
          <span className="text-xs">
            Filter
          </span>
        </div>

        {[
          "ALL",
          "PENDING",
          "IN_PROGRESS",
          "DONE",
        ].map((item) => (

          <button
            key={item}
            onClick={() =>
              setStatus?.(item)
            }
            className={`
              whitespace-nowrap
              rounded-lg
              px-3
              py-2
              text-xs
              transition
              ${
                (status || "ALL") === item
                  ? "bg-violet-500/10 text-violet-300"
                  : "text-slate-500 hover:bg-slate-800 hover:text-white"
              }
            `}
          >
            {item === "IN_PROGRESS"
              ? "In Progress"
              : item === "ALL"
              ? "All"
              : item.charAt(0) +
                item.slice(1).toLowerCase()}
          </button>

        ))}

      </div>

    </div>
  );
};

export default FilterBar;