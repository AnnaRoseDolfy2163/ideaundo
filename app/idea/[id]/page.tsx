"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import CommentSection from "@/components/CommentSection";

type Idea = {
  id: string;
  title: string;
  problem: string;
  solution: string;
  authorName?: string | null;
};

export default function IdeaDetail() {
  const { id } = useParams<{ id: string }>();
  const [idea, setIdea] = useState<Idea | null>(null);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "ideas", id));
      if (snap.exists()) setIdea({ id: snap.id, ...snap.data() } as Idea);
    })();
  }, [id]);

  if (!idea) return <p className="text-center py-10">Loading...</p>;

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <Link href="/" className="text-sm text-gray-500 hover:underline mb-4 inline-block">
        ← Back to all ideas
      </Link>
      <h1 className="text-2xl font-bold">{idea.title}</h1>
      <p className="text-gray-500 mb-1">{idea.authorName || "Anonymous"}</p>
      <div className="mt-4 space-y-4">
        <div>
          <h2 className="font-semibold text-gray-700">🔍 The Problem</h2>
          <p className="text-gray-600 mt-1">{idea.problem}</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-700">💡 The Solution</h2>
          <p className="text-gray-600 mt-1">{idea.solution}</p>
        </div>
      </div>
      <CommentSection ideaId={idea.id} />
    </main>
  );
}