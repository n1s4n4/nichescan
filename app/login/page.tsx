/* eslint-disable */
"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://nibcrmvirgzrwfsospkh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pYmNybXZpcmd6cndmc29zcGtoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTUzMTEsImV4cCI6MjA5MDQzMTMxMX0.I2eDv6dqPMCeEGvGsjDAm5g-UJUy9Up2Wm_RUUmxdgw"
);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      window.location.href = "/dashboard";
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
          <p style={{ color: "#8884a0", fontSize: 14, marginTop: ".5rem" }}>Welcome back</p>
        </div>
        <div style={{ background: "#13131c", border: "1px solid #ffffff14", borderRadius: 16, padding: "2rem" }}>
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: "1.5rem" }}>Sign in</h2>
          {message && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: ".75rem 1rem", marginBottom: "1rem", fontSize: 13, color: "#f87171" }}>
              {message}
            </div>
          )}
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ fontSize: 13, color: "#8884a0", display: "block", marginBottom: 6 }}>Email address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              style={{ width: "100%", background: "#0a0a0f", border: "1px solid #ffffff22", borderRadius: 8, padding: ".75rem 1rem", color: "#f0eff8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: 13, color: "#8884a0", display: "block", marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password"
              style={{ width: "100%", background: "#0a0a0f", border: "1px solid #ffffff22", borderRadius: 8, padding: ".75rem 1rem", color: "#f0eff8", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
          <button onClick={handleLogin} disabled={loading}
            style={{ width: "100%", background: loading ? "#4a4580" : "#7f6af7", color: "#fff", border: "none", borderRadius: 8, padding: ".85rem", fontSize: 15, fontWeight: 500, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            {loading ? "Signing in..." : "Sign in →"}
          </button>
        </div>
        <p style={{ textAlign: "center", fontSize: 14, color: "#8884a0", marginTop: "1.5rem" }}>
          Don't have an account?{" "}
          <Link href="/signup" style={{ color: "#7f6af7", textDecoration: "none" }}>Sign up</Link>
        </p>
      </div>
    </main>
  );
}