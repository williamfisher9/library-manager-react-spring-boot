import './Home.css'
import logoImg from '../../assets/logo-transparent.png';
import { useEffect } from 'react';

export default function Home(){
    useEffect(() => {
        window.localStorage.clear();
    })

    return <div className="home-container">
        <img src={logoImg} width="200px" height="300px" />
       <h1 id='home-title'>LION KING</h1>
    </div>
}