import './Home.css'
import logoImg from '../../assets/logo-transparent.png';

export default function Home(){
    return <div className="home-container">
        <img src={logoImg} width="200px" height="300px" />
       <h1 id='home-title'>LION KING</h1>
    </div>
}