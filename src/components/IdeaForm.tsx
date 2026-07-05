"use client";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function IdeaForm({ onPosted }: { onPosted: () => void }) {
  const [title, setTitle] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [tags, setTags] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !problem.trim() || !solution.trim()) return;
    setSubmitting(true);
    await addDoc(collection(db, "ideas"), {
      title: title.trim(),
      problem: problem.trim(),
      solution: solution.trim(),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      authorName: authorName.trim() || null,
      likes: 0,
      createdAt: serverTimestamp(),
    });
    setSubmitting(false);
    onPosted();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 rounded-xl p-5 mb-8 space-y-3">
      <input
        className="w-full border rounded-lg p-2 text-gray-900"
        placeholder="Idea title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          🔍 What's the problem?
        </label>
        <textarea
          className="w-full border rounded-lg p-2 text-gray-900"
          placeholder="Describe the problem you've noticed..."
          rows={3}
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          💡 What's your solution?
        </label>
        <textarea
          className="w-full border rounded-lg p-2 text-gray-900"
          placeholder="Describe your idea to solve it..."
          rows={3}
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
        />
      </div>
      <input
        className="w-full border rounded-lg p-2 text-gray-900"
        placeholder="Tags, comma separated (e.g. app, fun, social)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        className="w-full border rounded-lg p-2 text-gray-900"
        placeholder="Your name (optional)"
        value={authorName}
        onChange={(e) => setAuthorName(e.target.value)}
      />
      <button disabled={submitting} className="bg-black text-white rounded-lg px-4 py-2">
        {submitting ? "Posting..." : "Post idea"}
      </button>
    </form>
  );
}