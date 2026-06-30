"use client";
import { useState } from "react";
import Link from "next/link";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ShareButton from "./ShareButton";

type Idea = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  authorName?: string | null;
  likes: number;
};

export default function IdeaCard({ idea }: { idea: Idea }) {
  const [liked, setLiked] = useState(() => {
  if (typeof window === "undefined") return false;
  const likedIdeas = JSON.parse(localStorage.getItem("likedIdeas") || "[]");
  return likedIdeas.includes(idea.id);
});

  const handleLike = async () => {
    if (liked) return;
    await updateDoc(doc(db, "ideas", idea.id), { likes: increment(1) });
    const likedIdeas = JSON.parse(localStorage.getItem("likedIdeas") || "[]");
    likedIdeas.push(idea.id);
    localStorage.setItem("likedIdeas", JSON.stringify(likedIdeas));
    setLiked(true);
  };

  return (
    <div className="border rounded-xl p-4">
      <Link href={`/idea/${idea.id}`}>
        <h2 className="text-lg font-semibold hover:underline">{idea.title}</h2>
      </Link>
      <p className="text-gray-600 mt-1 line-clamp-3">{idea.description}</p>

      {idea.tags && idea.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {idea.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
        <span>{idea.authorName || "Anonymous"}</span>
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            disabled={liked}
            className={`flex items-center gap-1 ${liked ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {liked ? "❤️" : "🤍"} {idea.likes}
          </button>
          <ShareButton ideaId={idea.id} />
        </div>
      </div>
    </div>
  );
}