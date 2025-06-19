// app/api/chat/route.js

import { NextResponse } from "next/server";
import OpenAI from "openai";

// Instantiate the client (it will read your OPENAI_API_KEY from env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  const { prompt } = await request.json();
  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid prompt" },
      { status: 400 }
    );
  }

  try {
    // Call the chat completion endpoint
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const answer = response.choices[0].message.content.trim();
    return NextResponse.json({ answer });
  } catch (err) {
    console.error("OpenAI error:", err);
    return NextResponse.json(
      { error: "OpenAI request failed" },
      { status: 500 }
    );
  }
}
