import PostModel from "./post.model";

type CreatePostModel = Omit<PostModel, "id">;

export default CreatePostModel;
