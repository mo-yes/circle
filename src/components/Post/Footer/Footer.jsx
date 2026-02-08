import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button, Input } from "@heroui/react";
import { addCommentApi, deleteCommentApi } from "../../../services/CommentServices";
import CommentItem from "./CommentItem";
import toast from "react-hot-toast";
import { getUserPhoto } from "../../../utils/userUtils";

export default function Footer({ post, fetchPosts, silentRefreshRef ,updateCommentHandler  }) {
  const [isCommentDeleting, setIsCommentDeleting] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  

  const comments = post.comments || [];
  const firstComment = comments[0];
  const remainingComments = comments.slice(1);

  async function handleAddComment() {
    if (commentContent.trim().length < 2) return;

    try {
      setIsCommentSubmitting(true);
      await addCommentApi(commentContent, post._id);
      setCommentContent("");
      if (silentRefreshRef?.current !== undefined) {
          silentRefreshRef.current = true;
      }
      await fetchPosts();
      toast.success("Comment added successfully");
    } finally {
      setIsCommentSubmitting(false);
    }
  }

  async function handleDeleteComment(commentId) {
    try {
      setIsCommentDeleting(true);
      const response = await deleteCommentApi(commentId);

      if (response.message === "success") {
        silentRefreshRef.current = true;
        await fetchPosts();
        toast.success("Comment deleted successfully");
      }
    } finally {
      setIsCommentDeleting(false);
    }
  }

  

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-b-2xl">
      {/* ✅ Comments */}
      {comments.length > 0 && (
        <div className="px-4 py-3 space-y-3">
          {firstComment && (
            <CommentItem
  comment={firstComment}
  handleDeleteComment={handleDeleteComment}
  isCommentDeleting={isCommentDeleting}
  updateCommentHandler={updateCommentHandler}  // 👈 مهم
  postId={post._id}                            // 👈 مهم
/>

          )}

          {remainingComments.length > 0 && (
            <div className="pt-2 flex justify-center">
              {!showAll ? (
                <button
                  onClick={() => setShowAll(true)}
                  className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800/70"
                >
                  <Eye className="w-4 h-4" />
                  View {comments.length} comments
                </button>
              ) : (
                <div className="w-full">
                  <div className="space-y-3 max-h-60 overflow-y-auto p-1">
                    {remainingComments.map((c) => (
                      <CommentItem
  key={c._id || c.createdAt}
  comment={c}
  handleDeleteComment={handleDeleteComment}
  isCommentDeleting={isCommentDeleting}
  updateCommentHandler={updateCommentHandler}  // 👈 مهم
  postId={post._id}                            // 👈 مهم
/>

                    ))}
                  </div>
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => setShowAll(false)}
                      className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-lg"
                    >
                      <EyeOff className="w-4 h-4" />
                      Hide
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ✅ Add Comment */}
      <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <img
            src={getUserPhoto(post.user)}
            className="w-10 h-10 rounded-full object-cover border"
          />

          {/* form submit */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddComment();
            }}
            className="flex-1 flex items-center"
          >
            <Input
              value={commentContent}
              onChange={(e) => {
                if (e.target.value.length <= 30) {
                  setCommentContent(e.target.value);
                }
              }}
              placeholder="Write a comment..."
              variant="faded"
            />

            <Button
              type="submit"
              disabled={
                commentContent.trim().length < 2 ||
                commentContent.length > 30 ||
                isCommentSubmitting
              }
              isLoading={isCommentSubmitting}
              variant="faded"
              color="primary"
              className="ml-1.5"
            >
              {isCommentSubmitting ? "Adding..." : "Comment"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
