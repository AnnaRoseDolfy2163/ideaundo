"use client";
import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import IdeaCard from "@/components/IdeaCard";
import IdeaForm from "@/components/IdeaForm";

type Idea = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  authorName?: string | null;
  likes: number;
};

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "ideas"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setIdeas(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Idea)));
    });
    return () => unsub();
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">ഐഡിയ ഉണ്ടോ?</h1>
        <p className="text-gray-500">
          Got a wild app idea? Drop it here. No login, no judgment, just ideas.
        </p>
      </header>

      <button
        onClick={() => setShowForm(!showForm)}
        className={
          showForm
            ? "bg-gray-200 text-gray-700 rounded-lg px-4 py-2 mb-4 text-sm font-medium"
            : "w-full bg-black text-white rounded-xl py-3 mb-8 font-medium"
        }
      >
        {showForm ? "✕ Close" : "+ Add an idea"}
      </button>

      {showForm && <IdeaForm onPosted={() => setShowForm(false)} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>
    </main>
  );
}