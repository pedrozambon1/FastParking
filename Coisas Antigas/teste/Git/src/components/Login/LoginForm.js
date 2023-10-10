import React, { useState } from "react"
import "./LoginForm.css"
import Axios from "axios"

const LoginForm = () => {

    const [values, setValues] = useState();
    console.log(values);
    
    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));   
    };

    const handleClickButton = () => {
        Axios.post("http://localhost:3001/register", {
            email: values.email,
            senha: values.senha,
        }).then((response) => {
            console.log(response);
        });
    };

    return(
        <div className="cover">
            <h1>
            Cadastrar
            </h1>

            <input type="text" 
            name="email" 
            placeholder="Email"
            onChange={handleChangeValues}
            />


            <input type="text"
            name="senha"
            placeholder="Senha"
            onChange={handleChangeValues}
            />

            <button onClick={() => handleClickButton()}>Cadastrar</button>

            <p className="text">Ou entre usando</p>
            
            <div className="alt-login">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-google"></i>
            </div>
            <div>
            <p>Email ou senha</p>
            </div>
        </div>
    )
}

export default LoginForm;