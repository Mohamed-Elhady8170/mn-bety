function StatCard({ stat, children }) {
  return (
    <div className="bg-bg-main p-6 rounded-2xl border border-border-warm shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
      <div
        className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.color}`}
      >
        {children}
      </div>
      <div>
        <p className="text-sm text-text-soft font-bold mb-1">{stat.title}</p>
        <h3 className="text-2xl font-black text-text-main">{stat.value}</h3>
      </div>
    </div>
  );
}

export default StatCard;
