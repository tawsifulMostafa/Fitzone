import { serverFetch, serverProtectedFetch } from "../core/server";


export const getAllClasses = async() => {
     const AllClasses = await serverFetch('/api/all-classes')
     return AllClasses;
}

export const getFeaturedClasses = async() =>{
     const featuredClass = await serverFetch("/api/featured-classes")
     return featuredClass;
}
export const getClassById = async(_id) => {
     const classById = await serverProtectedFetch(`/api/class/${_id}`)
     return classById;
}
export const trainersClass = async() => {
     const cls = await serverProtectedFetch("/api/my/class")
     return cls;
}