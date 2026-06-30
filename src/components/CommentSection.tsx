"use client";
import { useEffect, useState } from "react";
import {
  collection, addDoc, query, orderBy, onSnapshot, serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

type Comment = {
  id: string;
  text: string;
  authorName?: string | null;
};

export default function CommentSection({ ideaId }: { ideaId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, "ideas", ideaId, "comments"),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snap) =>
      setComments(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Comment)))
    );
  }, [ideaId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await addDoc(collection(db, "ideas", ideaId, "comments"), {
      text: text.trim(),
      authorName: name.trim() || null,
      createdAt: serverTimestamp(),
    });
    setText("");
  };

  return (
    <section className="mt-8">
      <h3 className="font-semibold mb-3">Comments</h3>
      <form onSubmit={handleSubmit} className="space-y-2 mb-6">
        <input
          className="w-full border rounded-lg p-2"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="w-full border rounded-lg p-2"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="bg-black text-white rounded-lg px-4 py-2">Comment</button>
      </form>
      <div className="space-y-3">
        {comments.map((c) => (
          <div key={c.id} className="border-b pb-2">
            <p className="text-sm text-gray-500">{c.authorName || "Anonymous"}</p>
            <p>{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}