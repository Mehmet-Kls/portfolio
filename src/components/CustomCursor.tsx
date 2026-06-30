"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let rafId: number;
    let tx = -100, ty = -100;
    let rx = -100, ry = -100;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const onDown = () => cursor.style.transform = "translate(-50%,-50%) scale(0.7)";
    const onUp = () => cursor.style.transform = "translate(-50%,-50%) scale(1)";

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isLink = el.tagName === "A" || el.tagName === "BUTTON" ||
        el.closest("a") !== null || el.closest("button") !== null;
      ring.style.width = isLink ? "40px" : "28px";
      ring.style.height = isLink ? "40px" : "28px";
      ring.style.borderColor = isLink ? "rgba(57,255,143,0.5)" : "rgba(57,255,143,0.2)";
    };

    // Ring için lerp (smooth follow)
    const animate = () => {
      rx += (tx - rx) * 0.12;
      ry += (ty - ry) * 0.12;

      cursor.style.left = `${tx}px`;
      cursor.style.top = `${ty}px`;
      ring.style.left = `${rx}px`;
      ring.style.top = `${ry}px`;

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      {/* Crosshair */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-[9999]"
        style={{ transform: "translate(-50%,-50%)", willChange: "left, top" }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20">
          <line x1="0" y1="10" x2="7" y2="10" stroke="#39ff8f" strokeWidth="1.5" />
          <line x1="13" y1="10" x2="20" y2="10" stroke="#39ff8f" strokeWidth="1.5" />
          <line x1="10" y1="0" x2="10" y2="7" stroke="#39ff8f" strokeWidth="1.5" />
          <line x1="10" y1="13" x2="10" y2="20" stroke="#39ff8f" strokeWidth="1.5" />
          <circle cx="10" cy="10" r="1.5" fill="#39ff8f" />
        </svg>
      </div>

      {/* Smooth ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] rounded-full"
        style={{
          width: 28,
          height: 28,
          border: "1px solid rgba(57,255,143,0.2)",
          transform: "translate(-50%,-50%)",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
          willChange: "left, top",
        }}
      />

      <style>{`* { cursor: none !important; }`}</style>
    </>
  );
}
