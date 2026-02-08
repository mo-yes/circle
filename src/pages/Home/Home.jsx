import { useEffect, useRef, useState } from "react";
import { getPostsApi } from "../../services/main";
import CreatePost from "../../components/Post/Create/CreatePost";
import PostCard from "../../components/PostCard/PostCard";
import PostSkeleton from "../../components/Post/Create/Skeleton/PostSkeleton";
import toast from "react-hot-toast";
import { updateCommentApi } from "../../services/CommentServices";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const silentRefreshRef = useRef(false); // ← skip Skeleton & loading


  async function fetchPosts() {
  if (!silentRefreshRef.current){
    setLoading(true);
  }

  setError(null)
  const data = await getPostsApi();

  if (data?.message === "success") {
    setPosts(data.posts);
  }else {
    setError(data);
    toast.error(data || "Something went wrong");
  }

  if (!silentRefreshRef.current) {
    setLoading(false);
  }

  silentRefreshRef.current = false; // ← skip Skeleton & loading
}
async function updateCommentHandler(commentId, newContent, postId) {

  const response = await updateCommentApi(commentId, newContent);

  if (response?.message === "success") {

    const updatedComment = response.comment;

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.map(comment =>
                comment._id === commentId
                  ? updatedComment
                  : comment
              )
            }
          : post
      )
    );
  }
}


  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10 border-b dark:border-gray-700">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Circle
          </h1>
        </div>
      </header> */}

      <div className="max-w-2xl mx-auto p-4">
        {/* Create Post Components */}
        <CreatePost fetchPosts={fetchPosts} />

        {loading ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center text-red-500">
            {error}
          </div>
        ) : (
          <div className="space-y-4">
            {posts.length ? (
              posts.map((post) => <PostCard key={post._id}
                                    post={post}
                                    fetchPosts={fetchPosts}
                                    silentRefreshRef={silentRefreshRef}
                                    updateCommentHandler={updateCommentHandler}
                                      />)
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-500 dark:text-gray-300">
                  No posts yet. Create the first one!
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
