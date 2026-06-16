import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import ExpenseTracker from "./pages/ExpenseTracker";
import Portfolio from "./pages/Portfolio";
import WealthProjection from "./pages/WealthProjection";
import { C, setTheme } from "./shared";

const NAV = [
  { id: "dashboard", icon: "⬡", label: "Dashboard" },
  { id: "expenses", icon: "◈", label: "Expense Track" },
  { id: "portfolio", icon: "◉", label: "Portfolio" },
  { id: "projection", icon: "◎", label: "Projections" },
];

const TITLES = {
  dashboard: "Financial Overview",
  expenses: "Expense Tracker",
  portfolio: "Portfolio Manager",
  projection: "Wealth Projections",
};

// Breakpoint for mobile
const MOBILE_BP = 640;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BP);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < MOBILE_BP);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setThemeState] = useState("dark");
  const isMobile = useIsMobile();

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    setThemeState(next);
  };

  const isDark = theme === "dark";

  const navigateTo = (id) => {
    setPage(id);
    if (isMobile) setDrawerOpen(false);
  };

  const PageComponent = {
    dashboard: Dashboard,
    expenses: ExpenseTracker,
    portfolio: Portfolio,
    projection: WealthProjection,
  }[page];

  // ── Sidebar / Drawer content (shared between desktop sidebar & mobile drawer)
  const SidebarContent = ({ forDrawer = false }) => (
    <>
      {/* Logo */}
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        padding: (!forDrawer && collapsed) ? "0 0 16px 14px" : "0 16px 16px",
        borderBottom: `1px solid ${C.border}`,
        marginBottom: 8,
      }}>
        <div style={{
          width: 28, height: 28, background: C.gold,
          borderRadius: 8, display: "flex", alignItems: "center",
          justifyContent: "center", fontSize: 14, fontWeight: 900,
          color: "#0D0F14", flexShrink: 0,
        }}>₹</div>
        {(forDrawer || !collapsed) && (
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: C.text, lineHeight: 1.1 }}>FinFlow</div>
            <div style={{ fontSize: 10, color: C.muted }}>Personal Finance</div>
          </div>
        )}
        {/* Close button for drawer */}
        {forDrawer && (
          <button onClick={() => setDrawerOpen(false)} style={{
            marginLeft: "auto", background: "transparent", border: "none",
            color: C.muted, fontSize: 20, cursor: "pointer", lineHeight: 1,
          }}>✕</button>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, padding: "0 8px" }}>
        {NAV.map(n => (
          <button
            key={n.id}
            onClick={() => navigateTo(n.id)}
            title={(!forDrawer && collapsed) ? n.label : undefined}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "11px 12px", borderRadius: 10, border: "none",
              cursor: "pointer", textAlign: "left", width: "100%",
              background: page === n.id ? C.gold + "22" : "transparent",
              transform: page === n.id ? "scale(1.02)" : "scale(1)",
              boxShadow: page === n.id ? "0 0 12px rgba(212,168,67,0.25)" : "none",
              color: page === n.id ? C.gold : C.muted,
              borderLeft: page === n.id ? `3px solid ${C.gold}` : "3px solid transparent",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1, flexShrink: 0 }}>{n.icon}</span>
            {(forDrawer || !collapsed) && (
              <span style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>{n.label}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Theme Toggle */}
      <div style={{ padding: "0 8px", marginBottom: 6 }}>
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            width: "100%", padding: "10px 12px",
            borderRadius: 10, border: `1px solid ${C.border}`,
            background: C.accent, cursor: "pointer",
            color: C.muted, transition: "all 0.2s",
          }}
        >
          <div style={{
            position: "relative", width: 32, height: 18, flexShrink: 0,
            background: isDark ? C.goldDim : C.gold,
            borderRadius: 9, transition: "background 0.25s",
          }}>
            <div style={{
              position: "absolute", top: 2, left: isDark ? 2 : 14,
              width: 14, height: 14, borderRadius: "50%",
              background: "#fff",
              transition: "left 0.22s cubic-bezier(.4,0,.2,1)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
            }} />
          </div>
          {(forDrawer || !collapsed) && (
            <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
              {isDark ? "🌙 Dark" : "☀️ Light"}
            </span>
          )}
        </button>
      </div>

      {/* Collapse toggle (desktop only) */}
      {!forDrawer && (
        <button
          onClick={() => setCollapsed(p => !p)}
          style={{
            margin: "0 8px", padding: 10, borderRadius: 10,
            border: `1px solid ${C.border}`, background: "transparent",
            color: C.muted, cursor: "pointer", fontSize: 14,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {collapsed ? "▶" : "◀"}
        </button>
      )}
    </>
  );

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: C.bg,
      fontFamily: "'DM Sans',system-ui,sans-serif",
      color: C.text,
      overflow: "hidden",
      transition: "background 0.25s, color 0.25s",
    }}>

      {/* ── Desktop Sidebar (hidden on mobile) ── */}
      {!isMobile && (
        <aside style={{
          width: collapsed ? 56 : 200,
          minWidth: collapsed ? 56 : 200,
          background: C.surface,
          borderRight: `1px solid ${C.border}`,
          display: "flex",
          flexDirection: "column",
          padding: "16px 0 12px",
          transition: "width 0.2s, min-width 0.2s, background 0.25s",
          flexShrink: 0,
          overflow: "hidden",
        }}>
          <SidebarContent forDrawer={false} />
        </aside>
      )}

      {/* ── Mobile Drawer Overlay ── */}
      {isMobile && drawerOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setDrawerOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(2px)",
            }}
          />
          {/* Drawer panel */}
          <aside style={{
            position: "fixed", top: 0, left: 0, bottom: 0,
            width: 220, zIndex: 50,
            background: C.surface,
            borderRight: `1px solid ${C.border}`,
            display: "flex", flexDirection: "column",
            padding: "16px 0 12px",
            animation: "slideIn 0.22s ease",
          }}>
            <style>{`
              @keyframes slideIn { from { transform: translateX(-100%); } to { transform: translateX(0); } }
            `}</style>
            <SidebarContent forDrawer={true} />
          </aside>
        </>
      )}

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <header style={{
          padding: isMobile ? "12px 16px" : "16px 28px",
          borderBottom: `1px solid ${C.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: C.surface, flexShrink: 0,
          transition: "background 0.25s",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Hamburger (mobile only) */}
            {isMobile && (
              <button
                onClick={() => setDrawerOpen(true)}
                style={{
                  background: "transparent", border: "none",
                  color: C.text, fontSize: 20, cursor: "pointer",
                  padding: "4px 6px", borderRadius: 8,
                  display: "flex", alignItems: "center",
                }}
              >
                ☰
              </button>
            )}
            <div>
              <div style={{ fontSize: isMobile ? 15 : 18, fontWeight: 800, color: C.text }}>
                {TITLES[page]}
              </div>
              {!isMobile && (
                <div style={{ fontSize: 12, color: C.muted }}>
                  {new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </div>
              )}
              {isMobile && (
                <div style={{ fontSize: 11, color: C.muted }}>
                  {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {/* Theme toggle icon button on mobile (no text) */}
            {isMobile && (
              <button
                onClick={toggleTheme}
                title={isDark ? "Light mode" : "Dark mode"}
                style={{
                  background: C.accent, border: `1px solid ${C.border}`,
                  borderRadius: 10, padding: "6px 10px",
                  cursor: "pointer", fontSize: 16, lineHeight: 1,
                  display: "flex", alignItems: "center",
                }}
              >
                {isDark ? "☀️" : "🌙"}
              </button>
            )}
            {!isMobile && (
              <div style={{
                fontSize: 12, color: C.muted, background: C.card,
                border: `1px solid ${C.border}`, padding: "6px 14px", borderRadius: 20,
              }}>🟢 Live</div>
            )}
            <div style={{
              width: isMobile ? 30 : 36,
              height: isMobile ? 30 : 36,
              background: C.gold, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: isMobile ? 12 : 14, fontWeight: 800, color: "#0D0F14",
            }}>U</div>
          </div>
        </header>

        {/* Page content */}
        <main style={{
          flex: 1, overflowY: "auto",
          padding: isMobile ? "16px 12px 80px" : "24px 28px",
          background: C.bg, transition: "background 0.25s",
        }}>
          <PageComponent />
        </main>
      </div>

      {/* ── Mobile Bottom Tab Bar ── */}
      {isMobile && (
        <nav style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          height: 60, zIndex: 30,
          background: C.surface,
          borderTop: `1px solid ${C.border}`,
          display: "flex", alignItems: "stretch",
        }}>
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => navigateTo(n.id)}
              style={{
                flex: 1, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 3,
                border: "none", background: "transparent",
                cursor: "pointer",
                color: page === n.id ? C.gold : C.muted,
                borderTop: page === n.id ? `2px solid ${C.gold}` : "2px solid transparent",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 20, lineHeight: 1 }}>{n.icon}</span>
              <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.03em" }}>
                {n.label.split(" ")[0]}
              </span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

