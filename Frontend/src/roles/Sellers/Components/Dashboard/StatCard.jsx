function StatCard({ stat, children }) {
  return (
    <div className="bg-bg-main p-4 rounded-2xl border border-border-warm shadow-sm flex gap-2 hover:shadow-md transition-shadow duration-200">
      <div className={`w-8 h-8 rounded-xl flex-center ${stat.color}`}>
        {children}
      </div>
      <div>
        <p className="text-sm text-text-subtle font-bold mb-1">{stat.title}</p>
        <h3 className="text-base text-text-main">{stat.value}</h3>
      </div>
    </div>
  );
}

export default StatCard;
