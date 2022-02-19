import { useLoaderData, Link } from "remix";
import {db} from "~/utils/db.server";
export const loader = async() => {
  const data = {
    posts: await db.post.findMany(
      {
        orderBy:{createdAt: "desc"},
        select:{id:true, title:true, createdAt:true}
      }
    ),
  };
  return data;
};

const PostItems = () => {
  const { posts } = useLoaderData();
  return (
    <>
    <div className="page-header">
      <h1>Posts</h1>
        <Link className="btn" to="/posts/new">
            New Post
        </Link>
        </div>
      <ul className="posts-list">
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={post.id}>
              <h2>{post.title}</h2>
              {new Date(post.createdAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default PostItems;
