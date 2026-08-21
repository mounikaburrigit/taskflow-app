import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  return (
    <div
      className="
        flex
        items-center
        justify-center
        gap-2
      "
    >

      <button
        disabled={currentPage <= 1}
        onClick={() =>
          onPageChange?.(currentPage - 1)
        }
        className="
          rounded-lg
          border border-slate-800
          bg-[#111827]
          p-2
          text-slate-400
          transition
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronLeft size={16} />
      </button>

      <div
        className="
          rounded-lg
          bg-violet-500/10
          px-4
          py-2
          text-xs
          text-violet-300
        "
      >
        {currentPage} / {totalPages}
      </div>

      <button
        disabled={currentPage >= totalPages}
        onClick={() =>
          onPageChange?.(currentPage + 1)
        }
        className="
          rounded-lg
          border border-slate-800
          bg-[#111827]
          p-2
          text-slate-400
          transition
          hover:text-white
          disabled:cursor-not-allowed
          disabled:opacity-40
        "
      >
        <ChevronRight size={16} />
      </button>

    </div>
  );
};

export default Pagination;