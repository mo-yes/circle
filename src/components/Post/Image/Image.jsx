{/* 🔹 Post Image */}
export default function Image({post}) {
  return (
    <>
      {/* 🔹 Post Image */}
      {post.image && (
        <div className="w-full">
          <img
            src={post.image}
            alt="Post"
            className="w-full object-cover max-h-96 "
          />
        </div>
      )}
    </>
  )
}
