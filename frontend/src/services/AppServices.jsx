import axios from "axios";

export const getMenuItems = () => {
   return axios({method: "get", url: "http://localhost:9999/api/v1/public/get-menu", timeout: 4000});
}

export const sendRegisterRequest = (firstName, lastName, emailAddress, password) => {
   return axios.post("http://localhost:9999/api/v1/public/signup", {firstName, lastName, username: emailAddress, password, roles: ['ROLE_USER']});
}

export const sendLoginRequest = (username, password) => {
   return axios.post("http://localhost:9999/api/v1/public/login", null, {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}});
}

export const sendUserHomeRequest = (id, username, password) => {
   return axios.post("http://localhost:9999/api/v1/user/home", {userId: id}, {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}});
}

export const searchItemByName = (name, username, password, userId) => {
   return axios.get(`http://localhost:9999/api/v1/user/${userId}/search/${name == "" ? "nill" : name}`, {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}})
}
