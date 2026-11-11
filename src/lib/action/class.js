import { serverMutation } from "../core/server"

export const postClass = async (classData) => {
    return await serverMutation("/api/create/class", { classData })
}
export const editClass = async (id, classData) => {
    const updatedData = await serverMutation(
        `/api/edit/class/${id}`,
        classData,
        "PATCH"
    );

    return updatedData;
};
export const deleteClass = async (id, classData) => {
    const removeTarget = await serverMutation(`/api/class/delete/${id}`, classData, "DELETE")
    return removeTarget;
}
export const editStatus = async (classId, newStatus) => {
    return await serverMutation(`/api/status/class/${classId}`, { newStatus }, "PATCH")
}