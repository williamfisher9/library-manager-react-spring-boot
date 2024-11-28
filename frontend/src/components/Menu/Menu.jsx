import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './Menu.css'
import logoImg from '../../assets/logo-transparent.png'
import logoTitle from '../../assets/title-transparent.png'
import { getPrivateMenuItems, getPublicMenuItems } from "../../services/AppServices";
import { Link, useNavigate } from "react-router";

export default function Menu({location}){
    const [menuItems, setMenuItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(location == '/'){
            getPublicMenuItems().then(res => setMenuItems(res.data.response));
        } 
        
        if(location == '/user-home'){
            getPrivateMenuItems(window.localStorage.getItem('username'), window.localStorage.getItem('password'), 'home')
            .then((res) => setMenuItems(res.data.response));
        }

        if(location == '/login'){
            getPublicMenuItems().then(res => setMenuItems(res.data.response));
        }

        if(location == '/register'){
            getPublicMenuItems().then(res => setMenuItems(res.data.response));
        }
    }, [location]);

    const handleMenuRouter = (val) => {
        if(val[0] == '/'){
            navigate(val)
        } else {
            if(val == 'logUserOut'){
                navigate('/');
            }

            if(val == 'addItem'){
                navigate('/user-home/add');
            }
        }
    }

    return <div className="menu-container">
        <Link to={'/'} className="logo-container" >
            <img src={logoImg} width="40px" height="60px" id="logoImg" />
            <img src={logoTitle} width="100px" height="60px" id="logoTitle" />
        </Link>

        {
            menuItems.map((item) => {
                return <div className="menu-item" key={item.id} onClick={() => handleMenuRouter(item.routerLink || item.functionItem)}>
                    <div className="menu-item-icon">
                        <i className={item.menuItemIcon}></i>
                    </div>
                    <div className="menu-item-title">
                        {item.menuItem}
                    </div>
                </div>
            })
        }
    </div>
}

Menu.propTypes = {
    location: PropTypes.string
}