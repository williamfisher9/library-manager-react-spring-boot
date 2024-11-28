import { Outlet, useLocation } from "react-router";
import './App.css'
import Menu from './Menu/Menu';

export default function App(){
    const location = useLocation().pathname;
    return <div className="app-container">
        <Menu location={location}/>
        <Outlet />
    </div>
}