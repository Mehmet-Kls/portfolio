"use client";

export default function CircuitBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden pcb-grid opacity-[0.35]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="traceFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#39ff8f" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#39ff8f" stopOpacity="0.08" />
          </linearGradient>
        </defs>

        {/* Ana devre izleri - dikey/yatay PCB tarzı çizgiler */}
        <g stroke="url(#traceFade)" strokeWidth="1.5" fill="none">
          <path className="current-flow" d="M -50 120 H 280 L 320 160 V 340 L 380 400 H 720" />
          <path className="current-flow" d="M 1500 220 H 1100 L 1060 260 V 480 L 1000 540 H 640" />
          <path className="current-flow" d="M 180 900 V 620 L 220 580 H 540 L 580 540 V 300" />
          <path className="current-flow" d="M 1300 900 V 700 L 1260 660 H 960 L 920 620 V 420" />
          <path className="current-flow" d="M -50 700 H 200 L 240 660 V 480" />
        </g>

        {/* Düğüm noktaları - bağlantı pinleri gibi yanıp sönen */}
        <g fill="#39ff8f">
          <circle className="node-pulse" cx="320" cy="160" r="3" style={{ animationDelay: "0s" }} />
          <circle className="node-pulse" cx="380" cy="400" r="3" style={{ animationDelay: "0.6s" }} />
          <circle className="node-pulse" cx="1060" cy="260" r="3" style={{ animationDelay: "1.1s" }} />
          <circle className="node-pulse" cx="1000" cy="540" r="3" style={{ animationDelay: "0.3s" }} />
          <circle className="node-pulse" cx="580" cy="540" r="3" style={{ animationDelay: "1.5s" }} />
          <circle className="node-pulse" cx="920" cy="420" r="3" style={{ animationDelay: "0.9s" }} />
        </g>
      </svg>

      {/* Vinyetleme - kenarları koyulaştır, içerik okunabilirliğini koru */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, var(--bg-base) 85%)",
        }}
      />
    </div>
  );
}
