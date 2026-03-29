/* eslint-disable */
"use client";
import { useState } from "react";
import Link from "next/link";

const painPoints = [
  { title: "Can't find good Notion templates for ADHD workflows", sub: "r/ADHD · 847 upvotes · 231 comments", score: 94, tag: "High demand", tagColor: "#fb923c", tagBg: "rgba(251,146,60,0.15)" },
  { title: "No beginner-friendly guide for cold email outreach", sub: "r/Entrepreneur · 512 upvotes · 88 comments", score: 87, tag: "Growing", tagColor: "#38d9a9", tagBg: "rgba(56,217,169,0.15)" },
  { title: "Struggling with consistent freelance pricing strategy", sub: "r/freelance · 330 upvotes · 54 comments", score: 79, tag: "Evergreen", tagColor: "#a78bfa", tagBg: "rgba(127,106,247,0.15)" },
  { title: "No simple tool to track client feedback without Jira", sub: "r/webdev · 298 upvotes · 41 comments", score: 74, tag: "Growing", tagColor: "#38d9a9", tagBg: "rgba(56,217,169,0.15)" },
  { title: "Overwhelmed by too many productivity apps", sub: "r/productivity · 201 upvotes · 37 comments", score: 68, tag: "Evergreen", tagColor: "#a78bfa", tagBg: "rgba(127,106,247,0.15)" },
];

const ideas = [
  { tag: "Template pack", tagColor: "#38d9a9", tagBg: "rgba(56,217,169,0.12)", title: "ADHD Productivity OS — Notion bundle", meta: "Suggested price: $19–$47 · Gumroad / Lemon Squeezy" },
  { tag: "PDF guide", tagColor: "#c084fc", tagBg: "rgba(192,132,252,0.12)", title: "Cold Email Blueprint for freelancers", meta: "Suggested price: $9–$27 · Easy to create" },
  { tag: "Mini course", tagColor: "#fb923c", tagBg: "rgba(251,146,60,0.12)", title: "Freelance Pricing Masterclass", meta: "Suggested price: $27–$97 · Gumroad" },
  { tag: "Template pack", tagColor: "#38d9a9", tagBg: "rgba(56,217,169,0.12)", title: "Client Feedback Tracker — Notion", meta: "Suggested price: $12–$29 · High demand" },
];

const navItems = [
  { label: "Dashboard", icon: "▦", active: true, href: "/dashboard" },
  { label: "Pain Scanner", icon: "⌕", href: "/dashboard" },
  { label: "Product Ideas", icon: "★", href: "/dashboard" },
  { label: "My Products", icon: "❏", href: "/dashboard" },
  { label: "Subreddits", icon: "◎", href: "/dashboard" },
  { label: "Settings", icon: "⚙", href: "/dashboard" },
];

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0f", color: "#f0eff8", fontFamily: "'DM Sans', sans-serif" }}>

      {/* SIDEBAR */}
      <aside style={{ width: 220, background: "#111118", borderRight: "1px solid #ffffff14", padding: "1.5rem 1rem", display: "flex", flexDirection: "column", gap: ".35rem", flexShrink: 0 }}>
        <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.1rem", padding: ".5rem .75rem", marginBottom: ".75rem", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7f6af7", display: "inline-block" }} />
          NicheScan
        </div>
        {navItems.map((item) => (
          <div key={item.label} onClick={() => setActive(item.label)} style={{
            display: "flex", alignItems: "center", gap: 10, padding: ".6rem .75rem",
            borderRadius: 8, fontSize: 13, cursor: "pointer",
            background: active === item.label ? "rgba(127,106,247,0.15)" : "transparent",
            color: active === item.label ? "#f0eff8" : "#8884a0",
            transition: "all .15s",
          }}>
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ borderTop: "1px solid #ffffff14", paddingTop: "1rem", marginTop: ".5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: ".6rem .75rem", borderRadius: 8, cursor: "pointer" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(127,106,247,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#7f6af7" }}>JS</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 500 }}>John Smith</div>
              <div style={{ fontSize: 11, color: "#8884a0" }}>Pro plan</div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>

        {/* TOP BAR */}
        <div style={{ padding: "1.25rem 2rem", borderBottom: "1px solid #ffffff14", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.3rem", letterSpacing: -.5, margin: 0 }}>Dashboard</h1>
            <p style={{ color: "#8884a0", fontSize: 13, margin: 0 }}>Friday, March 27 · Last scan: 2 hours ago</p>
          </div>
          <button style={{
            background: "#7f6af7", color: "#fff", border: "none", borderRadius: 8,
            padding: ".6rem 1.2rem", fontSize: 13, fontWeight: 500, cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            ⟳ Run new scan
          </button>
        </div>

        <div style={{ padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* STAT CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: ".75rem" }}>
            {[
              { label: "Pains found", val: "2,841", sub: "↑ 12% this week", subColor: "#38d9a9", valColor: "#7f6af7" },
              { label: "Ideas generated", val: "347", sub: "across 18 niches", subColor: "#8884a0", valColor: "#c084fc" },
              { label: "Subreddits tracked", val: "64", sub: "4 added today", subColor: "#8884a0", valColor: "#f0eff8" },
              { label: "Saved products", val: "12", sub: "2 ready to sell", subColor: "#8884a0", valColor: "#fb923c" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#111118", border: "1px solid #ffffff14", borderRadius: 10, padding: "1rem" }}>
                <div style={{ fontSize: 11, color: "#8884a0", textTransform: "uppercase", letterSpacing: .5, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: "1.7rem", fontWeight: 700, color: s.valColor }}>{s.val}</div>
                <div style={{ fontSize: 11, color: s.subColor, marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* PAIN POINTS */}
          <div style={{ background: "#111118", border: "1px solid #ffffff14", borderRadius: 10, padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: ".9rem" }}>Top pain points today</div>
              <span style={{ fontSize: 11, background: "rgba(127,106,247,0.15)", color: "#c084fc", padding: "2px 8px", borderRadius: 100 }}>live scan</span>
            </div>
            {painPoints.map((p, i) => (
              <div key={i} style={{
                borderBottom: i < painPoints.length - 1 ? "1px solid #ffffff0a" : "none",
                padding: ".8rem 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: "#8884a0", marginBottom: 4 }}>{p.sub}</div>
                  <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 7px", borderRadius: 4, background: p.tagBg, color: p.tagColor }}>{p.tag}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                  <span style={{ fontSize: 11, color: "#8884a0" }}>{p.score}/100</span>
                  <div style={{ width: 70, height: 4, background: "#ffffff14", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ width: `${p.score}%`, height: "100%", background: "#7f6af7", borderRadius: 2 }} />
                  </div>
                  <button style={{
                    fontSize: 10, padding: "3px 10px", borderRadius: 5, cursor: "pointer",
                    background: "rgba(127,106,247,0.15)", color: "#a78bfa", border: "none",
                    fontFamily: "'DM Sans', sans-serif",
                  }}>Generate idea →</button>
                </div>
              </div>
            ))}
          </div>

          {/* PRODUCT IDEAS */}
          <div style={{ background: "#111118", border: "1px solid #ffffff14", borderRadius: 10, padding: "1.25rem" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: ".9rem", marginBottom: "1rem" }}>AI-generated product ideas</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: ".75rem" }}>
              {ideas.map((idea, i) => (
                <div key={i} style={{
                  background: "#16161f", border: "1px solid #ffffff14", borderRadius: 8,
                  padding: ".85rem", cursor: "pointer", transition: "border-color .2s",
                }}>
                  <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 7px", borderRadius: 4, background: idea.tagBg, color: idea.tagColor, display: "inline-block", marginBottom: 6 }}>{idea.tag}</span>
                  <div style={{ fontFamily: "Syne, sans-serif", fontSize: ".82rem", fontWeight: 700, lineHeight: 1.3, marginBottom: 4 }}>{idea.title}</div>
                  <div style={{ fontSize: 11, color: "#8884a0" }}>{idea.meta}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}