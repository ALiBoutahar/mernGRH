import React ,{useState}from 'react'
import {Link} from 'react-router-dom'
// import RouterPath from '../SideNavBar/RouterPath'
import './style.css'
// import axios from 'axios'

function Login() {
    const [show , setShow] = useState(false)
    const [email,setEmail] = useState("")
    const [pass,setpass] = useState("")
    const Error = ({Perror : "Votre email Ou Mot de passe est incorrect"})
    const[Pmess ,setPmess]  = useState();

    const Login = (e) =>{
        e.preventDefault();
        fetch("http://localhost:5000/login", {
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                 Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                email,  
                pass,
            }),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data,"userRegister");
            if (data.status === "ok"){                
                window.localStorage.setItem("token", data.data.email);
                window.localStorage.setItem("loggedIn", true);
                window.location.href="/Acceuil";
            }
            else{
                setPmess(Error.Perror)
            }
        });
    }
  return (
        <div className="login">
            <div className="loginforms">
                <h2 style={{textAlign : "center"}}>Connecter</h2>
                <div className="col-md-12 ">
                    <label  className="form-label">Utilisateur</label>
                    <input type="text" className="form-control text-left"name='nomUtilisateur' onChange={(e)=>setEmail(e.target.value)}/>
                    {/* {<div style={{color : "red"}}>{Emess}</div>} */}
                </div>
                <div className="col-md-12">
                    <label className="form-label">Mot de Passe</label>
                    <div className="password">
                    <input type={!show ? "password" : "text"} className="form-control text-left col-md-10"  name='motdepasse' onChange={(e)=>setpass(e.target.value)} />
                    <button className='btn btn-info col-md-2' onClick={(e)=>{e.preventDefault();setShow(!show)}}>{!show ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}</button>
                    </div>
                    {<div style={{color : "red"}}>{Pmess}</div>}
                </div>
                <div className="col-md-12 ">
                    <button className='btn btn-success mt-2' onClick={Login}>Se Connecter</button>
                </div>
                <p className="forgot-password text-right">
                    <Link className={"nav-link"} to="/Signup" ><span style={{ color: 'blue' }}> Signup</span> </Link>
                </p>
            </div>
        </div>
  )
}

export default Login;