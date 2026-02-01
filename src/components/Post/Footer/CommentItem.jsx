import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getTimeAgo } from "../../../utils/dateUtils";
import { ThumbsUp, MessageCircle } from "lucide-react";
import { getUserPhoto } from "../../../utils/userUtils";
import CardDropdown from "../../Dropdown/CardDropdown";
import CardModal from "../../Dropdown/Modal/CardModal";
import { Button, Input } from "@heroui/react";
import { updateCommentApi } from "../../../services/CommentServices";
import toast from "react-hot-toast";

export default function CommentItem({
  comment,
  handleDeleteComment,
  isCommentDeleting,
  fetchPosts,
  silentRefreshRef,
}) {
  const { userData } = useContext(AuthContext);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [isUpdating, setIsUpdating] = useState(false);

  const name = comment.commentCreator?.name || "User";
  const photo = getUserPhoto(comment.commentCreator);

  async function handleUpdateComment() {
    if (editContent.trim().length < 2) return;

    try {
      setIsUpdating(true);
      await updateCommentApi(comment._id, editContent);
      toast.success("Comment updated");
      setIsEditing(false);
      silentRefreshRef.current = true;
      await fetchPosts();
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="flex space-x-3">
      <img src={photo} alt={name} className="w-9 h-9 rounded-full object-cover border" />

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="px-3 py-2 flex-1">
            <h4 className="font-semibold text-sm">{name}</h4>

            {!isEditing ? (
              <p className="text-sm mt-1">{comment.content}</p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateComment();
                }}
                className="flex items-center gap-2 mt-1"
              >
                <Input
                  autoFocus
                  value={editContent}
                  onChange={(e) => {
                    if (e.target.value.length <= 30) {
                      setEditContent(e.target.value);
                    }
                  }}
                  size="sm"
                  variant="faded"
                />

                <Button
                  size="sm"
                  color="primary"
                  type="submit"
                  variant="solid"
                  isDisabled={editContent.trim().length < 2 || isUpdating}
                  isLoading={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Update"}
                </Button>

                <Button
                  size="sm"
                  variant="faded"
                  onPress={() => {
                    setIsEditing(false);
                    setEditContent(comment.content);
                  }}
                >
                  Cancel
                </Button>
              </form>
            )}
          </div>

          {comment.commentCreator?._id === userData?._id && (
            <CardDropdown
              onEdit={() => {
                setIsEditing(true);
                setEditContent(comment.content);
              }}
              onDelete={() => setOpenDeleteModal(true)}
            />
          )}
        </div>

        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1 px-2">
          <span>{getTimeAgo(comment.createdAt)}</span>
          <button className="flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5" /> Like
          </button>
          <button className="flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" /> Reply
          </button>
        </div>

        <CardModal
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          loading={isCommentDeleting}
          handleDelete={() => handleDeleteComment(comment._id)}
          title="Delete Comment"
          description="comment"
        />
      </div>
    </div>
  );
}
