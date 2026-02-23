import React from 'react'

export default function Pagination({ current, total, onChange }) {
  return (
    <div className="flex items-center justify-center gap-2 mt-10" dir="ltr">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="w-9 h-9 rounded-xl border border-border-main text-text-subtle flex items-center justify-center hover:bg-primary/10 disabled:opacity-40 transition-colors"
      >
        ‹
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
            p === current
              ? "bg-primary text-white shadow-md"
              : "border border-border-main text-text-main hover:bg-primary/10"
          }`}
        >
          {p}
        </button>
      ))}
      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="w-9 h-9 rounded-xl border border-border-main text-text-subtle flex items-center justify-center hover:bg-primary/10 disabled:opacity-40 transition-colors"
      >
        ›
      </button>
    </div>
  );
}