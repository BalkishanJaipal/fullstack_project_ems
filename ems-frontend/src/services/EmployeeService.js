import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/employees";

export const listEmployee = ()=>{
    return axios.get(REST_API_BASE_URL);
}

export const createEmployee = (emloyee)=>{
    return  axios.post(REST_API_BASE_URL,emloyee);
}

export const getEmployeeById = (employeeId)=>{
    return axios.get(`${REST_API_BASE_URL}/${employeeId}`);
}
export const updateEmployee = (employeeId, updatedEmployeeData) => {
    return axios.post(`${REST_API_BASE_URL}/${employeeId}`, updatedEmployeeData);
};

export const deleteEmployee = (employeeId)=>{
    return axios.delete(`${REST_API_BASE_URL}/${employeeId}`);
}