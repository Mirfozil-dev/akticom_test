import { API_URL } from "./constants";
import axios from "axios";


export const GET_CLIENTS = (params) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/clients`, { params })
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const GET_CLIENT_BY_ID = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}/clients/${id}`)
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const POST_CLIENT = (body) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}/clients`, body)
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const PUT_CLIENT = (id, body) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_URL}/clients/${id}`, body)
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}

export const DELETE_CLIENT = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_URL}/clients/${id}`)
        .then(response => resolve(response))
        .catch(err => reject(err));
    })
}
