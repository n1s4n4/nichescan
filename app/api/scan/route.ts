/* eslint-disable */
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { subreddit } = await req.json();

  try {
    const res = await fetch(
      `https://oauth.reddit.com/r/${subreddit}/hot?limit=50`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      // Try old reddit as fallback
      const res2 = await fetch(
        `https://old.reddit.com/r/${subreddit}/hot.json?limit=50`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "application/json",
          },
          cache: "no-store",
        }
      );

      if (!res2.ok) {
        return NextResponse.json({ error: `Reddit blocked: ${res2.status}` });
      }

      const data2 = await res2.json();
      return processRedditData(data2);
    }

    const data = await res.json();
    return processRedditData(data);

  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

function processRedditData(data: any) {
  if (!data.data || !data.data.children) {
    return NextResponse.json({ error: "Subreddit not found" });
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
      painWords.forEach((word: string) => {
        if (titleLower.includes(word)) painScore += 10;
      });
      painScore += Math.min(score / 20, 20);
      painScore += Math.min(num_comments / 5, 20);
      painScore = Math.min(Math.round(painScore), 99);
      const tag = painScore >= 80 ? "High demand" : painScore >= 60 ? "Growing" : "Evergreen";
      return {
        title, subreddit: sub, upvotes: score, comments: num_comments,
        score: painScore, tag,
        reddit_url: `https://reddit.com${p.data.permalink}`,
      };
    })
    .sort((a: any, b: any) => b.score - a.score)
    .slice(0, 10);

  return NextResponse.json({ painPoints: posts });
}