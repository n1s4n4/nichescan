/* eslint-disable */
import { NextResponse } from "next/server";

function scorePainPoint(title: string, score: number, numComments: number): number {
  const painWords = [
    "help", "struggling", "can't", "cannot", "problem", "issue", "frustrated",
    "annoying", "difficult", "hard", "stuck", "confused", "lost", "fail",
    "broken", "wrong", "hate", "tired", "overwhelmed", "need", "how do i",
    "why is", "anyone else", "no one", "nothing works", "advice", "tips",
    "question", "anyone", "what", "should i", "is it", "does anyone",
    "looking for", "recommend", "best way", "struggling with"
  ];

  const titleLower = title.toLowerCase();
  let painScore = 10;

  painWords.forEach(word => {
    if (titleLower.includes(word)) painScore += 10;
  });

  painScore += Math.min(score / 20, 20);
  painScore += Math.min(numComments / 5, 20);
  painScore = Math.min(Math.round(painScore), 99);

  return painScore;
}

function getTag(score: number): string {
  if (score >= 80) return "High demand";
  if (score >= 60) return "Growing";
  return "Evergreen";
}

export async function POST(req: Request) {
  const { subreddit } = await req.json();

  try {
    const res = await fetch(
      `https://www.reddit.com/r/${subreddit}/hot.json?limit=50`,
      { headers: { "User-Agent": "NicheScan/1.0" } }
    );

    const data = await res.json();

    if (!data.data || !data.data.children) {
      return NextResponse.json({ error: "Subreddit not found" });
    }

    const posts = data.data.children;

    const painPoints = posts
      .filter((post: any) => !post.data.stickied)
      .map((post: any) => {
        const { title, score, num_comments, subreddit: sub } = post.data;
        const painScore = scorePainPoint(title, score, num_comments);
        return {
          title,
          subreddit: sub,
          upvotes: score,
          comments: num_comments,
          score: painScore,
          tag: getTag(painScore),
          reddit_url: `https://reddit.com${post.data.permalink}`,
        };
      })
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 10);

    return NextResponse.json({ painPoints });
  } catch (error) {
    return NextResponse.json({ error: "Failed to scan subreddit" });
  }
}