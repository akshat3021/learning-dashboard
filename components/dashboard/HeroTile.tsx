export default function HeroTile() {
  return (
    <article
      className="rounded-2xl p-8 relative overflow-hidden border"
      style={{
        background: "linear-gradient(135deg, #0d1117 0%, #0a1628 50%, #0d1117 100%)",
        borderColor: "rgba(0, 212, 170, 0.1)",
        minHeight: "200px",
      }}
    >
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-16 right-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)" }}
      />

      <div className="relative z-10">
        <p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: "#00d4aa", fontFamily: "var(--font-mono), monospace" }}
        >
          Dashboard / Overview
        </p>
        <h2 className="text-5xl font-black text-white leading-none mb-1 tracking-tight">
          Welcome back,
        </h2>
        <h2
          className="text-5xl font-black leading-none mb-8 tracking-tight"
          style={{
            WebkitTextFillColor: "transparent",
            WebkitTextStroke: "1px #00d4aa",
          }}
        >
          Akshat.
        </h2>

        <div className="flex items-center gap-3 flex-wrap">
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-1.5"
            style={{
              backgroundColor: "rgba(0,212,170,0.08)",
              border: "1px solid rgba(0,212,170,0.15)",
            }}
          >
            <span>🔥</span>
            <span
              className="text-sm"
              style={{ color: "#00d4aa", fontFamily: "var(--font-mono), monospace" }}
            >
              7 day streak
            </span>
          </div>
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-1.5"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <span
              className="text-slate-400 text-sm"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              4 active courses
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}