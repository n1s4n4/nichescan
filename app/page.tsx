/* eslint-disable */
import Link from "next/link";

export default function Home() {
  return (
    <main style={{
      background: "#0a0a0f",
      minHeight: "100vh",
      color: "#f0eff8",
      fontFamily: "'DM Sans', sans-serif",
    }}>

      {/* NAV */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.2rem 2.5rem", borderBottom: "1px solid #ffffff14",
        position: "sticky", top: 0, background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(12px)", zIndex: 100,
      }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7f6af7", display: "inline-block" }} />
          NicheScan
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <a href="#features" style={{ color: "#8884a0", textDecoration: "none", fontSize: 14 }}>Features</a>
          <a href="#how" style={{ color: "#8884a0", textDecoration: "none", fontSize: 14 }}>How it works</a>
          <a href="#pricing" style={{ color: "#8884a0", textDecoration: "none", fontSize: 14 }}>Pricing</a>
        </div>
        <Link href="/signup" style={{
          background: "#7f6af7", color: "#fff", padding: ".55rem 1.3rem",
          borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none",
        }}>Start free trial</Link>
      </nav>

      {/* HERO */}
      <section style={{ padding: "7rem 2.5rem 5rem", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(127,106,247,0.12)", border: "1px solid rgba(127,106,247,0.3)",
          borderRadius: 100, padding: ".35rem 1rem", fontSize: 13, color: "#c084fc", marginBottom: "2rem",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#38d9a9", display: "inline-block" }} />
          AI-powered Reddit pain scanner
        </div>
        <h1 style={{
          fontSize: "clamp(2.8rem,6vw,4.8rem)", fontWeight: 800, lineHeight: 1.05,
          letterSpacing: -2, marginBottom: "1.5rem", fontFamily: "Syne, sans-serif",
        }}>
          Turn Reddit complaints<br />
          into <span style={{
            background: "linear-gradient(135deg,#7f6af7,#c084fc)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>sellable products</span>
        </h1>
        <p style={{ color: "#8884a0", fontSize: "1.1rem", maxWidth: 560, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          NicheScan scans thousands of subreddits every day to surface real problems people pay to solve — then generates ready-to-sell digital product ideas instantly.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/signup" style={{
            background: "#7f6af7", color: "#fff", padding: ".85rem 2rem",
            borderRadius: 10, fontSize: 15, fontWeight: 500, textDecoration: "none",
          }}>Start scanning free →</Link>
          <Link href="/dashboard" style={{
            background: "transparent", color: "#f0eff8", border: "1px solid #ffffff22",
            padding: ".85rem 2rem", borderRadius: 10, fontSize: 15, textDecoration: "none",
          }}>See dashboard</Link>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "5rem 2.5rem", maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 2, color: "#7f6af7", marginBottom: ".75rem" }}>Pricing</p>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 800, letterSpacing: -1, marginBottom: "3rem" }}>
          Simple subscription pricing
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", textAlign: "left" }}>
          {[
            { name: "Starter", price: "$19", features: ["10 subreddits tracked", "50 product ideas / month", "Demand scoring"], missing: ["PDF briefs", "Niche alerts"] },
            { name: "Pro", price: "$49", featured: true, features: ["50 subreddits tracked", "Unlimited product ideas", "Demand scoring + trends", "PDF & Notion briefs", "Email niche alerts"], missing: [] },
            { name: "Agency", price: "$99", features: ["Unlimited subreddits", "Unlimited product ideas", "All Pro features", "Team seats (5)", "API access"], missing: [] },
          ].map((plan) => (
            <div key={plan.name} style={{
              background: "#13131c", border: `1px solid ${plan.featured ? "#7f6af7" : "#ffffff14"}`,
              borderRadius: 14, padding: "2rem", display: "flex", flexDirection: "column", gap: ".5rem",
              position: "relative",
            }}>
              {plan.featured && (
                <span style={{
                  position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)",
                  background: "#7f6af7", color: "#fff", fontSize: 11, padding: "3px 14px",
                  borderRadius: 100, whiteSpace: "nowrap",
                }}>Most popular</span>
              )}
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1rem" }}>{plan.name}</div>
              <div style={{ fontFamily: "Syne, sans-serif", fontSize: "2.2rem", fontWeight: 800, letterSpacing: -1 }}>{plan.price}<span style={{ fontSize: 13, color: "#8884a0", fontFamily: "DM Sans, sans-serif" }}> / month</span></div>
              <div style={{ height: 1, background: "#ffffff14", margin: ".75rem 0" }} />
              {plan.features.map(f => <div key={f} style={{ fontSize: 13, color: "#8884a0", padding: ".3rem 0" }}>✓ <span style={{ color: "#f0eff8" }}>{f}</span></div>)}
              {plan.missing.map(f => <div key={f} style={{ fontSize: 13, color: "#444", padding: ".3rem 0" }}>✗ {f}</div>)}
              <Link href="/signup" style={{
                marginTop: "auto", paddingTop: "1.25rem", display: "block", textAlign: "center",
                background: plan.featured ? "#7f6af7" : "transparent",
                border: plan.featured ? "none" : "1px solid #ffffff22",
                color: "#fff", borderRadius: 8, padding: ".75rem",
                fontSize: 14, fontWeight: 500, textDecoration: "none",
              }}>Get started</Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: "1px solid #ffffff14", padding: "2.5rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        maxWidth: 1100, margin: "0 auto", color: "#8884a0", fontSize: 13, flexWrap: "wrap", gap: "1rem",
      }}>
        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800 }}>NicheScan</span>
        <span>© 2025 NicheScan. All rights reserved.</span>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#" style={{ color: "#8884a0", textDecoration: "none" }}>Privacy</a>
          <a href="#" style={{ color: "#8884a0", textDecoration: "none" }}>Terms</a>
        </div>
      </footer>

    </main>
  );
}