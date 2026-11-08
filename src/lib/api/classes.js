import { serverFetch, serverProtectedFetch } from "../core/server";


export const getAllClasses = async (page = 1) => {
     const AllClasses = await serverFetch(`/api/all-classes?page=${page}`);
     return AllClasses;
};
export const getFeaturedClasses = async () => {
     const featuredClass = await serverFetch("/api/featured-classes")
     return featuredClass;
}
export const getClassById = async (classId) => {
     const classById = await serverProtectedFetch(`/api/class/${classId}`)
     return classById;
}
export const trainersClass = async () => {
     const cls = await serverProtectedFetch("/api/my/class")
     return cls;
}
export const pendingClasses = async () => {
     const classes = await serverProtectedFetch("/api/pending/classes")
     return classes
}