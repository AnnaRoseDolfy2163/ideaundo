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
  description: string;
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
      <p className="mt-4">{idea.description}</p>
      <CommentSection ideaId={idea.id} />
    </main>
  );
}