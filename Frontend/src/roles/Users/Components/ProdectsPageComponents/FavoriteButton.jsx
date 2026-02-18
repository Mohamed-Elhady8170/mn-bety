import React from 'react'

export default function FavoriteButton({ active, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110"
    >
      <svg
        className={`w-4 h-4 transition-colors ${active ? "text-rose-500 fill-rose-500" : "text-gray-300 fill-transparent"}`}
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    </button>
  );
}