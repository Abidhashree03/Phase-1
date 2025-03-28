
import { Link } from "react-router-dom";
import blogPosts from "./blogData";

const Home = () => {
  return (
    <div className="container">
      <h1>Blog Posts</h1>
      <ul>
        {blogPosts.map((post) => (
          <li key={post.id} className="post-item">
            <Link to={`/post/${post.id}`} className="post-title">{post.title}</Link>
            <p>{post.shortDescription}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
