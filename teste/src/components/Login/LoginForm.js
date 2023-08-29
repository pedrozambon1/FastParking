import React, { useState } from "react"
import "./LoginForm.css"
import Axios from "axios"

const LoginForm = () => {

    const [values, setValues] = useState({
        emailLog: "",
        senhaLog: "",
        emailCad: "",
        senhaCad: ""
    });

    //EVENTO CADASTRO
    const handleRegister = () => {

        const regData = {
            email: values.emailCad,
            senha: values.senhaCad,
        };

        Axios.post("http://localhost:3001/register", regData )
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    //EVENTO lOGIN
    const handleLogin = () => {

        const loginData = {
            email: values.emailLog,
            senha: values.senhaLog,
        };

        Axios.post("http://localhost:3001/login", loginData )
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return(
            <div className="cover">
                <div className="cadastro">
                    <h1>
                        Cadastrar
                    </h1>

            <input type="text" 
            name="emailLog" 
            placeholder="Email"
            value={values.emailCad}
            onChange={(e) =>
                setValues({ ...values, emailCad: e.target.value })}
            />


            <input type="text"
            name="senhaLog"
            placeholder="Senha"
            value={values.senhaCad}
            onChange={(e) =>
                setValues({ ...values, senhaCad: e.target.value })}
            />

            <button onClick={() => handleRegister()}>Cadastrar</button>

            </div>
            
            <div className="login">
                <h1>
                    Login
                </h1>
                
                <input type="text" 
                name="emailCad" 
                placeholder="Email"
                value={values.emailLog}
                onChange={(e) =>
                    setValues({ ...values, emailLog: e.target.value })}
                />
                
                <input type="text"
                name="senhaCad"
                placeholder="Senha"
                value={values.senhaLog}
                onChange={(e) =>
                    setValues({ ...values, senhaLog: e.target.value })}
                />

            <button onClick={() => handleLogin()} >Login</button>

            <p className="text">Ou entre usando</p>
            
            <div className="alt-login">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-google"></i>
            </div>
            
            </div>
        </div>
    )
}

export default LoginForm;