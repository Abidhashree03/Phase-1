
import { useParams } from "react-router-dom";
import blogPosts from "./blogData";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return <h2>Post not found</h2>;
  }

  return (
    <div className="container">
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;
