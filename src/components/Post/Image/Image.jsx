export default function Image({ post }) {
  return (
    <>
      {post.image && (
        <div className="w-full max-h-[420px] overflow-hidden">
          <img
            src={post.image}
            alt="Post"
            className="
              w-full h-full object-cover"
          />
        </div>
      )}
    </>
  );
}
