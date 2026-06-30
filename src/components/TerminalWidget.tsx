"use client";

import { useEffect, useState } from "react";

const LINES = [
  { cmd: "cat whoami.txt", out: "Elektrik Teknisyeni + Program Geliştirici" },
  { cmd: "ls ./skills", out: "Python  JavaScript  Node.js  HTML  CSS  VSCode" },
  { cmd: "git status", out: "// yeni bir kod yazılıyor..." },
  { cmd: "cat services.txt", out: "Discord Bot · Web Tasarım · Yapay Zeka · Otomasyon" },
];

export default function TerminalWidget() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedCmd, setTypedCmd] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (visibleLines >= LINES.length) return;

    const line = LINES[visibleLines];
    let i = 0;
    setTypedCmd("");
    setShowOutput(false);

    const typeInterval = setInterval(() => {
      i++;
      setTypedCmd(line.cmd.slice(0, i));
      if (i >= line.cmd.length) {
        clearInterval(typeInterval);
        setTimeout(() => {
          setShowOutput(true);
          setTimeout(() => {
            setVisibleLines((v) => v + 1);
          }, 600);
        }, 200);
      }
    }, 45);

    return () => clearInterval(typeInterval);
  }, [visibleLines]);

  return (
    <div className="mono mt-10 w-full max-w-xl border border-[var(--line)] bg-[var(--bg-surface)] p-4 text-xs leading-relaxed">
      <div className="mb-3 flex items-center gap-2">
        <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[var(--text-tertiary)]">bash — mehmet@dev: ~</span>
      </div>

      {LINES.slice(0, visibleLines).map((line, i) => (
        <div key={i} className="mb-1">
          <p className="text-[var(--text-secondary)]">
            <span className="text-[var(--accent-volt)]">➜ </span>
            {line.cmd}
          </p>
          <p className="text-[var(--text-tertiary)] pl-3">{line.out}</p>
        </div>
      ))}

      {visibleLines < LINES.length && (
        <div>
          <p className="text-[var(--text-secondary)]">
            <span className="text-[var(--accent-volt)]">➜ </span>
            {typedCmd}
            <span className="animate-pulse text-[var(--accent-volt)]">█</span>
          </p>
          {showOutput && (
            <p className="text-[var(--text-tertiary)] pl-3">{LINES[visibleLines].out}</p>
          )}
        </div>
      )}

      {visibleLines >= LINES.length && (
        <p className="text-[var(--text-secondary)]">
          <span className="text-[var(--accent-volt)]">➜ </span>
          <span className="animate-pulse text-[var(--accent-volt)]">█</span>
        </p>
      )}
    </div>
  );
}
