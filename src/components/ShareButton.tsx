"use client";
import { useState } from "react";

export default function ShareButton({ ideaId }: { ideaId: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/idea/${ideaId}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button onClick={handleShare} className="flex items-center gap-1">
      🔗 {copied ? "Copied!" : "Share"}
    </button>
  );
}