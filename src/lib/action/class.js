import { serverMutation } from "../core/server"

export const postClass = async (classData) => {
    const data = await serverMutation("/api/create/class", classData)
    return data;
}
export const editClass = async (id, classData) => {
    const updatedData = await serverMutation(
        `/api/edit/class/${id}`,
        classData,
        "PATCH"
    );

    return updatedData;
};