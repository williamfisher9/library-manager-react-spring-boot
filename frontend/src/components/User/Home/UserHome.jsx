import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendUserHomeRequest } from "../../../services/AppServices";


export default function UserHome(){
    const navigate = useNavigate();

    useEffect(() => {
        if(window.localStorage.getItem('userId') == null || window.localStorage.getItem('username') == null || window.localStorage.getItem('password') == null){
            navigate('/login');
        } else {
            console.log(window.localStorage.getItem('password'))
            console.log(window.localStorage.getItem('username'))
            console.log(sendUserHomeRequest(window.localStorage.getItem('userId'), window.localStorage.getItem('username'), window.localStorage.getItem('password')));
            
        }
    }, [])
}