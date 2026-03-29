import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } }
  });

  if (error) return NextResponse.json({ error: error.message });

  if (data.user) {
    await supabase.from("profiles").insert({
      id: data.user.id,
      full_name: name,
      plan: "free"
    });
  }

  return NextResponse.json({ success: true });
}