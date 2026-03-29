"use client";
import { useState } from "react";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    setMessage("");

    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      });

      if (error) {
        setMessage(error.message);
      } else {
        setMessage("✓ Account created! Check your email to confirm.");
      }
    } catch (e) {
      setMessage("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main style={{
      background: "#0a0a0f", minHeight: "100vh", color: "#f0eff8",
      fontFamily: "'DM Sans', sans-serif", display: "flex",
      alignItems: "center", justifyContent: "center", padding: "2rem",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <Link href="/" style={{ textDecoration: "none", color: "#f0eff8" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.4rem", display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#7f6af7", display: "inline-block" }} />
              NicheScan
            </div>
          </Link>
          <p style={{ color: "#8884a0", fontSize: 14, marginTop: ".5rem" }}>Create your account to start scanning</p>
        </div>

        <div style={{ background: "#13131c", border: "1px solid #ffffff14", borderRadius: 16, padding: "2rem" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: "1.5rem" }}>Get started free</h2>

          {message && (
            <div style={{
              background: message.includes("✓") ? "rgba(56,217,169,0.1)" : "rgba(239,68,68,0.1)",
              border: `1px solid ${message.includes("✓") ? "rgba(56,217,169,0.3)" : "rgba(239,68,68,0.3)"}`,
              borderRadius: 8, padding: ".75rem 1rem", marginBottom: "1rem", fontSize: 13,
              color: message.includes("✓") ? "#38d9a9" : "#f87171"
            }}>
              {message}
            </div>
          )}

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: 13, color: "#8884a0", display: "block", marginBottom: 6 }}>Full name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Smith"
              style={{ width: "100%", background: "#0a0a0f", border: "1px solid #ffffff22", borderRadius: 8, padding: ".75rem 1rem", color: "#f0eff8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: 13, color: "#8884a0", display: "block", marginBottom: 6 }}>Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              style={{ width: "100%", background: "#0a0a0f", border: "1px solid #ffffff22", borderRadius: 8, padding: ".75rem 1rem", color: "#f0eff8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: 13, color: "#8884a0", display: "block", marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters"
              style={{ width: "100%", background: "#0a0a0f", border: "1px solid #ffffff22", borderRadius: 8, padding: ".75rem 1rem", color: "#f0eff8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>

          <button onClick={handleSignUp} disabled={loading}
            style={{ width: "100%", background: loading ? "#4a4580" : "#7f6af7", color: "#fff", border: "none", borderRadius: 8, padding: ".85rem", fontSize: 15, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            {loading ? "Creating account..." : "Create account →"}
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 14, color: "#8884a0", marginTop: "1.5rem" }}>
          Already have an account? <Link href="/login" style={{ color: "#7f6af7", textDecoration: "none" }}>Sign in</Link>
        </p>
      </div>
    </main>
  );
}