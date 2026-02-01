import { useState } from "react";
import { Heart, ThumbsUp, Laugh, Frown, Angry } from "lucide-react";

export default function Reactions({ onReact, defaultReaction = null }) {
  const [showReactions, setShowReactions] = useState(false);
  const [reaction, setReaction] = useState(defaultReaction);

  {/* Reactions Arr */}
  const reactions = [
    { name: "Like", icon: <ThumbsUp className="w-5 h-5 text-sky-500" /> },
    { name: "Love", icon: <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> },
    { name: "Haha", icon: <Laugh className="w-5 h-5 text-amber-400" /> },
    { name: "Sad", icon: <Frown className="w-5 h-5 text-blue-400" /> },
    { name: "Angry", icon: <Angry className="w-5 h-5 text-orange-500" /> },
  ];

  {/* Create Reaction  */}
  function handleReact(name) {
    setReaction(name);
    setShowReactions(false);

    { /* send react to Post card*/ }
    if (onReact) onReact(name);
  }

  {/* choose one react */}
  function renderIcon() {
    switch (reaction) {
      case "Love":
        return <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />;
      case "Haha":
        return <Laugh className="w-5 h-5 text-amber-400" />;
      case "Sad":
        return <Frown className="w-5 h-5 text-blue-400" />;
      case "Angry":
        return <Angry className="w-5 h-5 text-orange-500" />;
      case "Like":
        return <ThumbsUp className="w-5 h-5 text-sky-600" />;
      default:
        return <ThumbsUp className="w-5 h-5 text-gray-500" />;
    }
  }

  return (
    <div
      className="relative flex justify-center flex-1"
      onMouseEnter={() => setShowReactions(true)}
      onMouseLeave={() => setShowReactions(false)}
    >
      {/* 🔹 Reactions Pop up */}
      {showReactions && (
        <div className="absolute bottom-[90%] flex items-center bg-white dark:bg-gray-800 shadow-lg rounded-full p-4 space-x-3 z-10 animate-fade-in border border-gray-200 dark:border-gray-600">
          {reactions.map((r) => (
            <button
              key={r.name}
              onClick={() => handleReact(r.name)}
              className="hover:scale-125 transition-transform duration-200"
              title={r.name}
            >
              {r.icon}
            </button>
          ))}
        </div>
      )}

      {/* 🔹 Main Button */}
      <button
        className={`flex items-center space-x-2 justify-center flex-1 py-2 rounded-md transition-all duration-200 ${
          reaction 
            ? "text-sky-600 bg-sky-50 dark:bg-sky-900/20" 
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
      >
        {renderIcon()}
        <span className={`hidden sm:inline ${reaction ? "font-medium" : ""}`}>
          {reaction}
        </span>
      </button>
    </div>
  );
}
