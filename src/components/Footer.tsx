export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="mono text-xs text-[var(--text-tertiary)]">
          Mehmet-Kls <span className="text-[var(--accent-volt)]">⚡</span> powered by voltage, driven by logic
        </p>
        <p className="mono text-xs text-[var(--text-tertiary)]">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
