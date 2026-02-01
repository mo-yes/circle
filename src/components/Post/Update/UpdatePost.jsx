import { useState, useRef, useEffect } from "react";
import { X, Image as ImageIcon, Smile, Tag, MapPin, Gift, Flag, Video } from "lucide-react";
import { Card, CardHeader, CardBody, Button, Spinner } from "@heroui/react";
import { updatPostApi } from "../../../services/main";
import toast from "react-hot-toast";

export default function UpdatePost({ fetchPosts, post, setShowModal }) {
  // الحالة الابتدائية
  const [content, setContent] = useState(post.body || "");
  const [selectedImage, setSelectedImage] = useState(null); // صورة جديدة
  const [imagePreview, setImagePreview] = useState(post.image || null); // عرض الصورة
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  // تحديث preview لو الصورة اتعدلت
  useEffect(() => {
    if (!selectedImage && post.image) {
      setImagePreview(post.image);
    }
  }, [selectedImage, post.image]);

  // اختيار صورة جديدة
  function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  // إزالة الصورة
  function handleRemoveImage() {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // تحديث البوست
  async function handleUpdatePost(e) {
    e.preventDefault();

    // منع البوست الفاضي (لا نص ولا صورة)
    if (!content.trim() && !imagePreview) {
      toast.error("Post cannot be empty!");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("body", content);
    if (selectedImage) formData.append("image", selectedImage);

    try {
      await updatPostApi(formData, post._id);
      await fetchPosts();
      toast.success("Post updated successfully");
      setShowModal(false);
    } catch (err) {
      toast.error("Error updating post");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl bg-white dark:bg-[#1e2939] rounded-lg shadow-lg animate-fadeIn">
        <form onSubmit={handleUpdatePost}>
          <CardHeader className="flex justify-between items-center border-b dark:border-[#3A3B3C] p-4">
            <h2 className="font-bold text-lg dark:text-white">Update Post</h2>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-[#3A3B3C] transition"
            >
              <X className="text-gray-600 dark:text-[#B0B3B8]" />
            </button>
          </CardHeader>

          <CardBody className="space-y-4 p-4">
            {/* نص البوست */}
            <textarea
              autoFocus
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full resize-none bg-transparent text-lg min-h-[120px] focus:outline-none text-black dark:text-white placeholder-gray-500 dark:placeholder-[#B0B3B8]"
            />

            {/* عرض الصورة */}
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

            {/* أيقونات إضافية */}
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

            {/* زر التحديث */}
            <Button
              type="submit"
              isDisabled={isLoading || (!content.trim() && !imagePreview)}
              color="primary"
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" color="white" />
                  Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </CardBody>
        </form>
      </Card>
    </div>
  );
}
