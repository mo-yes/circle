import { MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import Reactions from "../Reaction/Reactions";

{/* 🔹 Post Actions */}
export default function Action() {
    const [currentReaction, setCurrentReaction] = useState(null);
      // const [_, setLikesCount] = useState( );


  {/* Reaction Function */}
  function handleReaction(reaction) {
    if (currentReaction === reaction) {
      {/* If Repite Reaction*/}
      setCurrentReaction(null);
    } else {
      {/* If New Reaction */}
      if (currentReaction === null) {
        {/* If No Reaction plus one */}
      }
      {/* If  Reaction for ever don'n plus common */}
      setCurrentReaction(reaction);
    }
  }
  return (
    <>
      {/* 🔹 Post Actions */}
            <div className="px-2 py-1 border-t border-gray-200 dark:border-gray-700 flex justify-between text-gray-500 dark:text-gray-300">
              {/* Reaction Button*/}
              <Reactions 
                onReact={handleReaction} 
                defaultReaction={currentReaction}
              />
      
              {/* Comment Button */}
              <button className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex-1 justify-center py-2 rounded-md transition-colors duration-200">
                <MessageCircle className="w-5 h-5" />
              </button>
      
              {/* Share Button*/}
              <button className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex-1 justify-center py-2 rounded-md transition-colors duration-200">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
    </>
  )
}
