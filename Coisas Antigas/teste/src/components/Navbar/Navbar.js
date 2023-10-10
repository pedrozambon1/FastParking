import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

//DEPENDÊNCIAS
import { Component } from "react";
import { MenuData } from "./MenuData";
import "./Navbarstyles.css"

//PÁGINAS
import Cameraspg from '../../pages/Router/Cameras';

export default class Navbar extends Component {

    state ={clicked:false};

    handlerClick=()=>{
        this.setState({clicked:
        !this.state.clicked})
    }
    
    render(){
        return(
            <Router>
           <nav className="NavbarItems">
            <h1 className="logo">
                React <i className="fab fa-react"></i>
            </h1>
            <div className="menu-icons" onClick={this.handlerClick}>
                <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
            </div>

            <ul className={this.state.clicked ? "nav-menu active": "nav-menu"}>
                
                    {MenuData.map((item, index) =>{
                        return (
                            <li key= {index}>
                                <Link className={item.cName} to={item.router}><i className={item.icon}></i>{item.title}</Link>

                            </li>
                        );
                    })}
                
            </ul>
           </nav>

           <div style={{ paddingTop: '180px' }}>
        <Routes>
            <Route exact path="/Home" element={<Home />} />
            <Route exact path="/Sobre" element={<Sobre />} />
            <Route exact path="/Servicos" element={<Servicos />} />
            <Route exact path="/Cameras" element={<Cameras />} />
        </Routes>
        </div>
        </Router>
        )
    }
}

function Home() {
    return ;
}

function Sobre() {
    return <h2>Home</h2>;
}
function Servicos() {
    return <h2>Home</h2>;
}
function Cameras() {
    return (
        
          <Cameraspg />
        
      );
}
