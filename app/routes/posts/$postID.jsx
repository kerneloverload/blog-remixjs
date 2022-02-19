import { useLoaderData, Link, redirect } from "remix";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const post = await db.post.findUnique({
    where: { id: params.postID },
  });
  if (!post) throw new Error("Post not found");
  const data = { post };
  return data;
};

export const action = async ({ params, request }) => {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    const post = await db.post.findUnique({ where: { id: params.postID } });
    if (!post) throw new Error("Post not found");
    await db.post.delete({ where: { id: params.postID } });
    return redirect("/posts");
  }
};

const Posts = () => {
  const { post } = useLoaderData();
  return (
    <>
      <div className="page-header">
        <h2>{post.title}</h2>
        <Link className="btn btn-reverse" to="/posts">
          Back
        </Link>
      </div>
      <div className="page-content">
        <h1>{post.desc}</h1>
      </div>
      <div className="page-footer">
        <form method="POST">
          <input type="hidden" name="_method" value="delete" />
          <button className="btn btn-delete">delete</button>
        </form>
      </div>
    </>
  );
};

export default Posts;
