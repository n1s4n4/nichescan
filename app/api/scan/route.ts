/* eslint-disable */
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { subreddit } = await req.json();

  try {
    const res = await fetch(
      `https://api.pullpush.io/reddit/search/submission/?subreddit=${subreddit}&limit=50&sort=desc&sort_type=score`,
      {
        headers: {
          "User-Agent": "NicheScan/1.0",
          "Accept": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json({ error: `Failed to fetch: ${res.status}` });
    }

    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      return NextResponse.json({ error: "Subreddit not found or empty" });
    }

    const painWords = ["help", "struggling", "can't", "cannot", "problem", "issue",
      "frustrated", "difficult", "hard", "stuck", "confused", "lost", "fail",
      "broken", "hate", "tired", "overwhelmed", "need", "how do i", "why is",
      "anyone else", "advice", "tips", "question", "should i", "does anyone",
      "recommend", "best way", "looking for"];

    const posts = data.data
      .map((p: any) => {
        const { title, score, num_comments, subreddit: sub, permalink } = p;
        const titleLower = title.toLowerCase();
        let painScore = 10;
        painWords.forEach((word: string) => {
          if (titleLower.includes(word)) painScore += 10;
        });
        painScore += Math.min((score || 0) / 20, 20);
        painScore += Math.min((num_comments || 0) / 5, 20);
        painScore = Math.min(Math.round(painScore), 99);
        const tag = painScore >= 80 ? "High demand" : painScore >= 60 ? "Growing" : "Evergreen";
        return {
          title, subreddit: sub, upvotes: score || 0, comments: num_comments || 0,
          score: painScore, tag,
          reddit_url: `https://reddit.com${permalink}`,
        };
      })
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 10);

    return NextResponse.json({ painPoints: posts });

  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}