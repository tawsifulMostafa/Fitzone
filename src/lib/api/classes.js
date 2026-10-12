import { serverFetch } from "../core/server";


export const getAllClasses = async() => {
     const AllClasses = await serverFetch('/api/all-classes')
     return AllClasses;
}

export const getFeaturedClasses = async() =>{
     const featuredClass = await serverFetch("/api/featured-classes")
     return featuredClass;
}
export const getClassById = async(_id) => {
     const classById = await serverFetch(`/api/class/${_id}`)
     console.log(classById)
     return classById;
}