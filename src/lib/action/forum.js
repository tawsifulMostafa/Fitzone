import { serverMutation } from "../core/server"

export const postForum = async (forumData) => {
    const post = await serverMutation("/api/forum/post", forumData)
    return post;
}

//* like dislike
export const LikeAndDislike = async (reaction, forumId) => {
    return await serverMutation(
        `/api/post/forum/reaction/${forumId}`,
        { reaction }
    );
};

export const PostComment = async (newComment, forumId) => {
    const comment = await serverMutation(`/api/post/forum/comment/${forumId}`, { newComment })
    return comment;
}
export const editComment = async (updatedComment, commentId) => {
    const comment = await serverMutation(`/api/post/forum/comment/edit/${commentId}`,
        { updatedComment }, "PATCH")
    return comment;
}