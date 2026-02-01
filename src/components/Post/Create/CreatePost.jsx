import { useState, useRef } from "react";
import {
  Video,
  Image as ImageIcon,
  Smile,
  X,
  MapPin,
  Tag,
  Gift,
  Flag,
} from "lucide-react";
import { Card, CardHeader, CardBody, Button, Spinner } from "@heroui/react";
import { createPostApi } from "../../../services/main";
import toast from "react-hot-toast";

export default function CreatePost({fetchPosts}) {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleRemoveImage() {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleCreatePost(e) {
    e.preventDefault();
    if(!content.trim() && !selectedImage) return;

    setIsLoading(true);

    const formData = new FormData();
    if(content){
      formData.append("body", content);
    }
    if(selectedImage){
      formData.append("image", selectedImage);
    }
    await createPostApi(formData);
    await fetchPosts()
    setContent("");
    handleRemoveImage();
    toast.success("Post created successfully");
    setIsLoading(false);
    setShowModal(false);
  }

  return (
    <>
      {/* Create Post Card */}
      <Card className="mb-4 bg-white dark:bg-[#1e2939]  shadow-md">
        <CardBody className="p-4">
          <div className="flex gap-3 mb-4">
            <div className="relative w-10 h-10">
  <div className="w-full h-full rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 text-white flex items-center justify-center font-bold animate-pulse">
    C
  </div>
  {/*online indicator*/}
  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#242526] rounded-full"></span>
</div>



            <button
              onClick={() => setShowModal(true)}
              className="flex-1 text-left px-4 py-3 rounded-full bg-gray-100 dark:bg-[#3A3B3C] text-gray-500 hover:bg-gray-200 dark:hover:bg-[#4E4F50] transition-colors"
            >
              What's on your mind? Share a post...
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex border-t pt-3 gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition">
              <Video className="text-red-500" />
              <span className="text-sm text-gray-700 dark:text-[#B0B3B8]">Live video</span>
            </button>

            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition">
              <ImageIcon className="text-green-500" />
              <span className="text-sm text-gray-700 dark:text-[#B0B3B8]">Photo</span>
            </button>

            <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#3A3B3C] transition">
              <Smile className="text-yellow-500" />
              <span className="text-sm text-gray-700 dark:text-[#B0B3B8]">Feeling</span>
            </button>
          </div>
        </CardBody>
      </Card>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-xl bg-white dark:bg-[#1e2939] rounded-lg shadow-lg animate-fadeIn">
            <form onSubmit={handleCreatePost}>
              <CardHeader className="flex justify-between items-center border-b dark:border-[#3A3B3C] p-4">
                <div className="">
                  <h2 className="font-bold text-lg dark:text-white">Create Post</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition"
                >
                  <X className="text-gray-600 dark:text-[#B0B3B8]" />
                </button>
              </CardHeader>

              <CardBody className="space-y-4 p-4">
                <textarea
                autoFocus
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full resize-none bg-transparent text-lg min-h-[120px] focus:outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-[#B0B3B8]"
                />

                {/* Image Preview */}
                {imagePreview && (
                  <div className="relative rounded-xl overflow-hidden bg-gray-100 dark:bg-[#18191A]">
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-full max-h-[300px] object-cover transition-transform hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-3 right-3 bg-black/60 hover:bg-black text-white p-2 rounded-full transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* Add to post icons */}
                <div className="flex gap-2 flex-wrap border p-2 rounded-lg dark:border-[#3A3B3C]">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition"
                  >
                    <ImageIcon className="text-green-500" />
                  </button>

                  <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition">
                    <Tag className="text-blue-500" />
                  </button>

                  <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition">
                    <Smile className="text-yellow-500" />
                  </button>

                  <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition">
                    <MapPin className="text-red-500" />
                  </button>

                  <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition">
                    <Gift className="text-pink-500" />
                  </button>

                  <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition">
                    <Flag className="text-orange-500" />
                  </button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <Button
                  type="submit"
                  isDisabled={isLoading || (!content.trim() && !selectedImage)}
                  color="primary"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Spinner size="sm" color="white" />
                      Posting...
                    </>
                  ) : (
                    "Post"
                  )}
                </Button>
              </CardBody>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
