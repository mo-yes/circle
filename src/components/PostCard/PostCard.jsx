import Action from "../Post/Action/Action";
import Body from "../Post/Body/Body";
import Footer from "../Post/Footer/Footer";
import Header from "../Post/Header/Header";
import Image from "../Post/Image/Image";
import States from "../Post/States/States";

export default function PostCard({ post , fetchPosts , silentRefreshRef }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700 overflow-hidden my-6 transition-all duration-300 hover:shadow-md dark:hover:shadow-gray-600">
      {/* 🔹 Post Header */}
      <Header post={post} fetchPosts={fetchPosts} />

      {/* 🔹 Post Body */}
      {post.body && <Body post={post} />}

      {/* 🔹 Post Image */}
      {post.image && <Image post={post} />}

      {/* 🔹 Post Stats */}
      <States post={post} />

      {/* 🔹 Post Actions */}
      <Action />

      {/* 🔹 Comments Section */}
      <Footer post={post} fetchPosts={fetchPosts} silentRefreshRef={silentRefreshRef} />
    </div>
  );
}
