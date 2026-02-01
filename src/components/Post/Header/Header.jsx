
import { formatDate, getTimeAgo } from "../../../utils/dateUtils";
import defaultAvatar from "../../../assets/default-profile.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { deletePostApi } from "../../../services/main";
import toast from "react-hot-toast";
import CardDropdown from "../../Dropdown/CardDropdown";
import CardModal from "../../Dropdown/Modal/CardModal";
import UpdatePost from "../Update/UpdatePost";
export default function Header({ post , fetchPosts}) {
  const { userData } = useContext(AuthContext);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  async function handleDeletePost() {
    setLoading(true);
      const response = await deletePostApi(post._id);
      if(response.message == 'success'){
        toast.success("Post deleted successfully");
        await fetchPosts();
        setLoading(false);
        setOpenDeleteModal(false);
      }
  }

  return (
    <div className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          {/* Image User Post */}
          <img
            src={post.user?.photo || post.createdBy?.photo || defaultAvatar}
            alt={post.user?.name || post.createdBy?.name || "User"}
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
            onError={(e) => (e.target.src = defaultAvatar)}
          />

          <div>
            <h3 className="font-semibold hover:underline cursor-pointer text-gray-900 dark:text-gray-100">
              {post.user?.name || post.createdBy?.name}
            </h3>
            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
              <span>{formatDate(post.createdAt)}</span>
              <span>·</span>
              <span>{getTimeAgo(post.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* 🔹  Dropdown  */}
        {post.user._id === userData?._id && (
          <>
            <CardDropdown onDelete={() => setOpenDeleteModal(true)} onEdit={() => setShowUpdateModal(true)} />

  {/* 🔹 Update Post Modal */}
    {showUpdateModal && (
    <UpdatePost 
    fetchPosts={fetchPosts} 
    post={post} 
    setShowModal={setShowUpdateModal} 
    />
    )}

            {/* 🔹 Delete Confirmation Modal */}
            <CardModal 
            openDeleteModal={openDeleteModal} 
            setOpenDeleteModal={setOpenDeleteModal} 
            loading={loading} 
            handleDelete={handleDeletePost} 
            title="Delete Post" 
            description="Post" />
          </>
        )}
      </div>
    </div>
  );
}
