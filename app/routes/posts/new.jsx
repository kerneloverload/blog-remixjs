import { Link, redirect } from "remix";
import { db } from "~/utils/db.server";
export const action = async ({ request }) => {
  const formFields = await request.formData();
  const title = formFields.get("title");
  const desc = formFields.get("desc");

  const formInput = { title, desc };
  const post = await db.post.create({data: formInput});
  return redirect(`${post.id}`);
};
const newPost = () => {
  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
        <Link className="btn btn-reverse" to="/posts">
          Back
        </Link>
      </div>
      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="desc">Description</label>
            <textarea type="text" name="desc" id="desc" />
          </div>
          <button type="submit" className="btn btn-block">
            Add Post
          </button>
        </form>
      </div>
    </>
  );
};
export default newPost;
