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