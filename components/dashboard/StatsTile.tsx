export default function StatsTile() {
  const stats = [
    { label: "Hours this week", value: "12.4", unit: "hrs" },
    { label: "Completed lessons", value: "38", unit: "" },
    { label: "Daily streak avg", value: "94", unit: "%" },
  ];

  return (
    <article
      className="rounded-2xl p-6 h-full flex flex-col border overflow-hidden"
      style={{
        background: "#0d1117",
        borderColor: "rgba(0, 212, 170, 0.15)",
        minHeight: "200px",
      }}
    >
      <p
        className="text-xs uppercase tracking-widest mb-6"
        style={{ color: "#00d4aa", fontFamily: "var(--font-mono), monospace" }}
      >
        This Week
      </p>

      <div className="flex flex-col gap-4 flex-1 justify-between">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex items-center justify-between gap-4 pb-4 border-b"
            style={{ borderColor: "rgba(255,255,255,0.05)" }}
          >
            <span className="text-slate-500 text-xs flex-shrink-0">{s.label}</span>
            <span
              className="text-xl font-bold text-white"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              {s.value}
              <span
                className="text-xs ml-0.5"
                style={{ color: "#00d4aa" }}
              >
                {s.unit}
              </span>
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}