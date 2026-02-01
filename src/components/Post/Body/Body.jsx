
{/* 🔹 Post Body (Content) */}
export default function Body({post}) {
  return (
    <>
      {/* 🔹 Post Body */}
      {post.body && (
        <div className="px-4 pb-3">
          <p className="text-gray-800 dark:text-gray-100 whitespace-pre-line leading-relaxed">
            {post.body}
          </p>
        </div>
      )}
    </>
  )
}
