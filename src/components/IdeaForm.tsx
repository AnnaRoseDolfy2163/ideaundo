"use client";
import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function IdeaForm({ onPosted }: { onPosted: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    setSubmitting(true);
    await addDoc(collection(db, "ideas"), {
      title: title.trim(),
      description: description.trim(),
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
        className="w-full border rounded-lg p-2"
        placeholder="Idea title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border rounded-lg p-2"
        placeholder="Describe your idea..."
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="w-full border rounded-lg p-2"
        placeholder="Tags, comma separated (e.g. app, fun, social)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        className="w-full border rounded-lg p-2"
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