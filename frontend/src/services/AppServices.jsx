import axios from "axios";

export const getPublicMenuItems = () => {
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

export const filterItemsBy = (fieldName, username, password, userId) => {
   return axios.get(`http://localhost:9999/api/v1/user/${userId}/filter/${fieldName}`, {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}});
}

export const getPrivateMenuItems = (username, password, type) => {
   return axios.get(`http://localhost:9999/api/v1/user/get-menu/${type}`, {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}});
 }

 export const getMovieItemDetailsFromAPI = (name, year, username, password) => {
   return axios.get(`http://localhost:9999/api/v1/user/get-details/${name}/${year != '' ? year : 'nill'}`,  
      {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}});
 }

 export const cretaeMovieItem = (userId, username, password, item) => {
      return axios.post("http://localhost:9999/api/v1/user/create-item", {userId: userId, poster: item.Poster, rating: item.imdbRating, year: item.Year, name: item.Title, type: item.Type, details: JSON.stringify(item)}, 
        {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}})
 }

 export const deleteItemById = (id, username, password, userId) => {
   return axios.delete(`http://localhost:9999/api/v1/user/${userId}/item/${id}`, {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}});
 }

 export const  getItemById = (id, username, password) => {
   return axios.get("http://localhost:9999/api/v1/user/item/"+id, {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}});
 }

 export const flipWatched = (userId, username, password, watched, itemId) => {
      return axios.post("http://localhost:9999/api/v1/user/item/watched", {userId: userId, itemId: itemId, watched: watched}, 
      {headers: {"Authorization": `Basic ${btoa(username + ':' + password)}`}});
 }