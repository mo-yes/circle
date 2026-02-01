import { Heart, ThumbsUp } from "lucide-react";
import { useState } from "react";

{/* 🔹 Post Stats */}
export default function States({post}) {
  const [likesCount, _] = useState(post.likes || 12);
  return (
    <>
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <div className="flex items-center -space-x-1">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center border border-white dark:border-gray-800">
              <ThumbsUp className="w-2.5 h-2.5 text-white" />
            </div>
            <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center border border-white dark:border-gray-800">
              <Heart className="w-2.5 h-2.5 text-white" />
            </div>
          </div>
          <span className="font-medium">{likesCount}</span>
        </div>
        <div className="flex space-x-4">
          <span className="hover:underline cursor-pointer">
            {post.comments?.length || 0} comments
          </span>
          <span className="hover:underline cursor-pointer">
            {post.shares || 24} shares
          </span>
        </div>
      </div>
    </>
  )
}
