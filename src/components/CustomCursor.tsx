"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.closest("a") !== null ||
        el.closest("button") !== null
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      {/* Ana crosshair */}
      <div
        className="pointer-events-none fixed z-[9999] transition-transform duration-75"
        style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
      >
        {/* Çapraz çizgiler */}
        <svg
          width={clicking ? 20 : hovering ? 28 : 24}
          height={clicking ? 20 : hovering ? 28 : 24}
          viewBox="0 0 24 24"
          className="transition-all duration-100"
        >
          {/* Yatay çizgi */}
          <line x1="0" y1="12" x2="9" y2="12" stroke="#39ff8f" strokeWidth="1.5" />
          <line x1="15" y1="12" x2="24" y2="12" stroke="#39ff8f" strokeWidth="1.5" />
          {/* Dikey çizgi */}
          <line x1="12" y1="0" x2="12" y2="9" stroke="#39ff8f" strokeWidth="1.5" />
          <line x1="12" y1="15" x2="12" y2="24" stroke="#39ff8f" strokeWidth="1.5" />
          {/* Merkez nokta */}
          <circle
            cx="12"
            cy="12"
            r={clicking ? 3 : hovering ? 4 : 2}
            fill={hovering ? "#39ff8f" : "none"}
            stroke="#39ff8f"
            strokeWidth="1"
            className="transition-all duration-100"
          />
        </svg>
      </div>

      {/* Takip eden halka */}
      <div
        className="pointer-events-none fixed z-[9998]"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          width: hovering ? 40 : 32,
          height: hovering ? 40 : 32,
          border: "1px solid rgba(57,255,143,0.25)",
          borderRadius: "50%",
          transition: "width 0.2s, height 0.2s, left 0.08s, top 0.08s",
        }}
      />

      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
}
