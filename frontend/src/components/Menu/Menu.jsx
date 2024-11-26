import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import './Menu.css'
import logoImg from '../../assets/logo-transparent.png'
import logoTitle from '../../assets/title-transparent.png'
import { Link } from "react-router-dom";
import { getMenuItems } from "../../services/AppServices";

export default function Menu({location}){
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        if(location == '/'){
            getMenuItems().then(res => setMenuItems(res.data.response));
        }
    }, []);

    return <div className="menu-container">
        <Link to={'/'} className="logo-container" >
            <img src={logoImg} width="40px" height="60px" id="logoImg" />
            <img src={logoTitle} width="100px" height="60px" id="logoTitle" />
        </Link>

        {
            menuItems.map((item) => {
                return <Link to={item.routerLink} className="menu-item" key={item.id}>
                    <div className="menu-item-icon">
                        <i className={item.menuItemIcon}></i>
                    </div>
                    <div className="menu-item-title">
                        {item.menuItem}
                    </div>
                </Link>
            })
        }
    </div>
}

Menu.propTypes = {
    location: PropTypes.string
}