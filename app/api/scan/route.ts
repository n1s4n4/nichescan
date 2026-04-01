/* eslint-disable */
import { NextResponse } from "next/server";

function scorePainPoint(title: string, score: number, numComments: number): number {
  const painWords = [
    "help", "struggling", "can't", "cannot", "problem", "issue", "frustrated",
    "annoying", "difficult", "hard", "stuck", "confused", "lost", "fail",
    "broken", "wrong", "hate", "tired", "overwhelmed", "need", "how do i",
    "why is", "anyone else", "no one", "nothing works"
  ];

  const titleLower = title.toLowerCase();
  let painScore = 0;

  painWords.forEach(word => {
    if (titleLower.includes(word)) painScore += 15;
  });

  painScore += Math.min(score / 10, 30);
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
      `https://www.reddit.com/r/${subreddit}/top.json?limit=25&t=week`,
      { headers: { "User-Agent": "NicheScan/1.0" } }
    );

    const data = await res.json();
    const posts = data.data.children;

    const painPoints = posts
      .filter((post: any) => !post.data.stickied)
      .map((post: any) => {
        const { title, score, num_comments, url, subreddit: sub } = post.data;
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
    .filter((p: any) => p.score > 5)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, 10);

    return NextResponse.json({ painPoints });
  } catch (error) {
    return NextResponse.json({ error: "Failed to scan subreddit" });
  }
}

