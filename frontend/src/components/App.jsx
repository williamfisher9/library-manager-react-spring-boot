import './App.css'
import { Outlet, useLocation } from 'react-router-dom';
import Menu from './Menu/Menu';

export default function App(){
    const location = useLocation().pathname;
    return <div className="app-container">
        <Menu location={location}/>
        <Outlet />
    </div>
}