import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:9000/api/v1",
});

export const getAllTasks = async (page) => {
    try {
        const response = await axiosInstance({
            method: "GET",
            url: `/tasks-get/${page}`,
        })
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

export const createTask = async (data) => {
    try {
        const response = await axiosInstance({
            method: "PUT",
            url: `/tasks-create/`,
            data
        })
        return response.data;
    } catch (error) {
        console.error("Error creating data:", error);
    }
}

export const updateTask = async (data) => {
    try {
        const response = await axiosInstance({
            method: "PUT",
            url: `/tasks-update/`,
            data,
        })
        return response.data;
    } catch (error) {
        console.error("Error updating data:", error);
    }
}