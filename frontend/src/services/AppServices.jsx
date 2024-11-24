import axios from "axios";

export const getMenuItems = () => {
   return axios({method: "get", url: "http://localhost:9999/api/v1/public/get-menu", timeout: 4000});
}