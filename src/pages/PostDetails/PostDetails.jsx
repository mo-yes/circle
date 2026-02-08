import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostByIdApi } from "../../services/main";

import Header from "../../components/Post/Header/Header";
import Body from "../../components/Post/Body/Body";
import Image from "../../components/Post/Image/Image";
import States from "../../components/Post/States/States";
import Action from "../../components/Post/Action/Action";
import Footer from "../../components/Post/Footer/Footer";
import LoadingPage from "../Loading/LoadingPage";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  async function fetchPost() {
    const response = await getPostByIdApi(id);
    if (response?.post) {
      setPost(response.post);
    }
  }
  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return <LoadingPage/>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">

        <Header post={post} fetchPosts={fetchPost} />

        {post.body && <Body post={post} />}

        {post.image && (
          <div className="my-4">
            <Image post={post} />
          </div>
        )}

        <States post={post} />

        <Action post={post} />

        <Footer post={post} fetchPosts={fetchPost} />

      </div>
    </div>
  );
}
