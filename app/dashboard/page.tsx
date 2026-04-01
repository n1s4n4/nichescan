/* eslint-disable */
"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://nibcrmvirgzrwfsospkh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pYmNybXZpcmd6cndmc29zcGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTUzMTEsImV4cCI6MjA5MDQzMTMxMX0.I2eDv6dqPMCeEGvGsjDAm5g-UJUy9Up2Wm_RUUmxdgw"
);

const navItems = [
  { label: "Dashboard", icon: "▦" },
  { label: "Pain Scanner", icon: "⌕" },
  { label: "Product Ideas", icon: "★" },
  { label: "My Products", icon: "❏" },
  { label: "Subreddits", icon: "◎" },
  { label: "Settings", icon: "⚙" },
];

export default function Dashboard() {
  const [active, setActive] = useState("Dashboard");
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");
  const [subreddit, setSubreddit] = useState("");
  const [scanning, setScanning] = useState(false);
  const [painPoints, setPainPoints] = useState<any[]>([]);
  const [scanMessage, setScanMessage] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUserName(data.user.user_metadata?.full_name || "User");
        setUserEmail(data.user.email || "");
      }
    });
  }, []);

  const handleScan = async () => {
    if (!subreddit) return;
    setScanning(true);
    setScanMessage("");

    try {
      const redditUrl = `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`;
      const res = await fetch(
  `https://corsproxy.io/?${encodeURIComponent(redditUrl)}`
);
const data = await res.json();

     console.log("Reddit data:", JSON.stringify(data).slice(0, 200));
      if (!data.data || !data.data.children) {
        setScanMessage("Subreddit not found. Check the name and try again.");
        setScanning(false);
        return;
      }

      const painWords = ["help", "struggling", "can't", "cannot", "problem", "issue",
        "frustrated", "difficult", "hard", "stuck", "confused", "lost", "fail",
        "broken", "hate", "tired", "overwhelmed", "need", "how do i", "why is",
        "anyone else", "advice", "tips", "question", "should i", "does anyone",
        "recommend", "best way", "looking for"];

      const posts = data.data.children
        .filter((p: any) => !p.data.stickied)
        .map((p: any) => {
          const { title, score, num_comments, subreddit: sub } = p.data;
          const titleLower = title.toLowerCase();
          let painScore = 10;
          painWords.forEach((word: string) => { if (titleLower.includes(word)) painScore += 10; });
          painScore += Math.min(score / 20, 20);
          painScore += Math.min(num_comments / 5, 20);
          painScore = Math.min(Math.round(painScore), 99);
          const tag = painScore >= 80 ? "High demand" : painScore >= 60 ? "Growing" : "Evergreen";
          return {
            title, subreddit: sub, upvotes: score, comments: num_comments,
            score: painScore, tag,
            tagColor: tag === "High demand" ? "#fb923c" : tag === "Growing" ? "#38d9a9" : "#a78bfa",
            tagBg: tag === "High demand" ? "rgba(251,146,60,0.15)" : tag === "Growing" ? "rgba(56,217,169,0.15)" : "rgba(127,106,247,0.15)",
            reddit_url: `https://reddit.com${p.data.permalink}`,
          };
        })
        .sort((a: any, b: any) => b.score - a.score)
        .slice(0, 10);

      setPainPoints(posts);
      setScanMessage(`Found ${posts.length} pain points in r/${subreddit}!`);
    } catch (e: any) {
    setScanMessage(`Scan failed: ${e.message}`);
}
    setScanning(false);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0a0f", color: "#f0eff8", fontFamily: "'DM Sans', sans-serif" }}>

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
          }}>
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ borderTop: "1px solid #ffffff14", paddingTop: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: ".6rem .75rem", borderRadius: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(127,106,247,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#7f6af7", flexShrink: 0 }}>
              {userName.charAt(0).toUpperCase()}
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userName}</div>
              <div style={{ fontSize: 11, color: "#8884a0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{userEmail}</div>
            </div>
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
        <div style={{ padding: "1.25rem 2rem", borderBottom: "1px solid #ffffff14", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.3rem", letterSpacing: -.5, margin: 0 }}>Dashboard</h1>
            <p style={{ color: "#8884a0", fontSize: 13, margin: 0 }}>Welcome back, {userName}!</p>
          </div>
        </div>

        <div style={{ padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          <div style={{ background: "#111118", border: "1px solid #ffffff14", borderRadius: 10, padding: "1.25rem" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: ".9rem", marginBottom: "1rem" }}>Scan a subreddit</div>
            <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
              <input
                type="text"
                value={subreddit}
                onChange={(e) => setSubreddit(e.target.value)}
                placeholder="e.g. entrepreneur, ADHD, freelance"
                style={{ flex: 1, minWidth: 200, background: "#0a0a0f", border: "1px solid #ffffff22", borderRadius: 8, padding: ".75rem 1rem", color: "#f0eff8", fontSize: 14, outline: "none" }}
              />
              <button onClick={handleScan} disabled={scanning} style={{
                background: scanning ? "#4a4580" : "#7f6af7", color: "#fff", border: "none",
                borderRadius: 8, padding: ".75rem 1.5rem", fontSize: 14, fontWeight: 500,
                cursor: scanning ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif",
                whiteSpace: "nowrap"
              }}>
                {scanning ? "Scanning..." : "⟳ Scan now"}
              </button>
            </div>
            {scanMessage && (
              <div style={{ marginTop: ".75rem", fontSize: 13, color: scanMessage.includes("Found") ? "#38d9a9" : "#f87171" }}>
                {scanMessage}
              </div>
            )}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: ".75rem" }}>
            {[
              { label: "Pains found", val: painPoints.length.toString(), sub: "from latest scan", subColor: "#38d9a9", valColor: "#7f6af7" },
              { label: "Ideas generated", val: "0", sub: "coming soon", subColor: "#8884a0", valColor: "#c084fc" },
              { label: "Subreddits tracked", val: "1", sub: "add more above", subColor: "#8884a0", valColor: "#f0eff8" },
              { label: "Saved products", val: "0", sub: "save ideas below", subColor: "#8884a0", valColor: "#fb923c" },
            ].map((s) => (
              <div key={s.label} style={{ background: "#111118", border: "1px solid #ffffff14", borderRadius: 10, padding: "1rem" }}>
                <div style={{ fontSize: 11, color: "#8884a0", textTransform: "uppercase", letterSpacing: .5, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontFamily: "Syne, sans-serif", fontSize: "1.7rem", fontWeight: 700, color: s.valColor }}>{s.val}</div>
                <div style={{ fontSize: 11, color: s.subColor, marginTop: 2 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#111118", border: "1px solid #ffffff14", borderRadius: 10, padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: ".9rem" }}>Pain points</div>
              <span style={{ fontSize: 11, background: "rgba(127,106,247,0.15)", color: "#c084fc", padding: "2px 8px", borderRadius: 100 }}>
                {painPoints.length} found
              </span>
            </div>
            {painPoints.length === 0 ? (
              <div style={{ textAlign: "center", padding: "2rem", color: "#8884a0", fontSize: 13 }}>
                No pain points yet — enter a subreddit above and click "Scan now"!
              </div>
            ) : (
              painPoints.map((p, i) => (
                <div key={i} style={{
                  borderBottom: i < painPoints.length - 1 ? "1px solid #ffffff0a" : "none",
                  padding: ".8rem 0", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem",
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{p.title}</div>
                    <div style={{ fontSize: 11, color: "#8884a0", marginBottom: 4 }}>r/{p.subreddit} · {p.upvotes} upvotes · {p.comments} comments</div>
                    <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 7px", borderRadius: 4, background: p.tagBg, color: p.tagColor }}>{p.tag}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, color: "#8884a0" }}>{p.score}/100</span>
                    <div style={{ width: 70, height: 4, background: "#ffffff14", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ width: `${p.score}%`, height: "100%", background: "#7f6af7", borderRadius: 2 }} />
                    </div>
                    <a href={p.reddit_url} target="_blank" rel="noopener noreferrer" style={{
                      fontSize: 10, padding: "3px 10px", borderRadius: 5, cursor: "pointer",
                      background: "rgba(127,106,247,0.15)", color: "#a78bfa", border: "none",
                      textDecoration: "none", display: "inline-block"
                    }}>View post →</a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}