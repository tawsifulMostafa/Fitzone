import { serverMutation } from "../core/server"

export const postForum = async(forumData) => {
    const post = await serverMutation("/api/forum/post" , forumData)
    return post;
}