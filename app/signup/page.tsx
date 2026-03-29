"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Create profile row
    if (data.user) {
      await supabase.from("profiles").insert({
        id: data.user.id,
        full_name: name,
        plan: "free",
      });
    }

    router.push("/dashboard");
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
          <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "1.4rem", marginBottom: "1.5rem", letterSpacing: -0.5 }}>
            Get started free
          </h2>

          {error && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 8, padding: ".75rem 1rem", marginBottom: "1rem", fontSize: 13, color: "#f87171" }}>
              {error}
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

          <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0" }}>
            <div style={{ flex: 1, height: 1, background: "#ffffff14" }} />
            <span style={{ fontSize: 12, color: "#8884a0" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#ffffff14" }} />
          </div>

          <button onClick={async () => {
            await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: `${window.location.origin}/dashboard` } });
          }} style={{ width: "100%", background: "transparent", color: "#f0eff8", border: "1px solid #ffffff22", borderRadius: 8, padding: ".85rem", fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <p style={{ textAlign: "center", fontSize: 14, color: "#8884a0", marginTop: "1.5rem" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#7f6af7", textDecoration: "none" }}>Sign in</Link>
        </p>
      </div>
    </main>
  );
}