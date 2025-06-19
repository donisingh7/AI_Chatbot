"use client";                // 👈 this makes it a client component

import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setReply("");             // clear previous reply

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setReply(data.answer || "No reply");
    } catch (err) {
      console.error(err);
      setReply("Error calling API");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center p-8">
      <h1 className="text-2xl mb-4">Voice Bot Demo (Text Mode)</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows={4}
          placeholder="Type your question here..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </form>

      {reply && (
        <div className="mt-6 w-full max-w-md p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Bot Reply:</h2>
          <p>{reply}</p>
        </div>
      )}
    </main>
  );
}
