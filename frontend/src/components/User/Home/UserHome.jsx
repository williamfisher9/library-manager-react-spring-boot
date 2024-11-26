import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchItemByName, sendUserHomeRequest } from "../../../services/AppServices";
import './UserHome.css'

export default function UserHome(){
    const navigate = useNavigate();
    let [items, setItems]= useState([]);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if(window.localStorage.getItem('userId') == null || window.localStorage.getItem('username') == null || window.localStorage.getItem('password') == null){
            navigate('/login');
        } else {
            sendUserHomeRequest(window.localStorage.getItem('userId'), window.localStorage.getItem('username'), window.localStorage.getItem('password'))
            .then((res) => {
                console.log(res)
                setItems(res.data.response);
            }) 
        }
    }, [])

    const handleSearchValue = () => {
        searchItemByName(searchValue, window.localStorage.getItem('username'), window.localStorage.getItem('password'), window.localStorage.getItem('userId'))
        .then(res => {
            setItems(res.data.response)
        })
    }

    const handleSearchFieldChange = (event) => {
        setSearchValue(event.target.value);
    }

    return <div className="user-home-container">
        <div className="top-tool-bar">
            <div className="search-control-container">
                <input type="text" id="search-input" autoComplete="off" onChange={handleSearchFieldChange}/>
                <i className="search-icon fa-solid fa-magnifying-glass" onClick={handleSearchValue}></i>
            </div>

            <i className="icon fa-solid fa-arrow-down-wide-short"></i>

            <i className="icon fa-solid fa-arrow-up-wide-short"></i>

            <select>
                <option value="1">creation date</option>
                <option value="2">name</option>
                <option value="3">release year</option>
                <option value="4">rating</option>
            </select>
        </div>

        <div className="items-container">
            {
                items.map(item => {
                    console.log(item)
                    return <div className="item" key={item.id}>
                        <img src={item.poster} alt={item.name + ' image'} width="100%" height="100%" /> 
                    </div>
                })
            }
        </div>
    </div>
}