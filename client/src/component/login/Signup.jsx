import React ,{useState}from 'react'
import {Link} from 'react-router-dom'
import './style.css'
import axios from 'axios'

function Signup() {
    const [show,setShow] = useState(false)
    const [user,setuser] = useState("")
    const [tele,settele] = useState("")
    const [email,setemail] = useState("")
    const [pass,setpass] = useState("")
    const [message, setmessage] = useState("");

    const add = (e) =>{
        e.preventDefault();
        axios.post("http://localhost:5000/Register", {user, tele, email, pass})
        .then(Response=>{
           console.log(Response.data)
        });
        setmessage('allredy registered');
    }
  return (
    <div className="inscrire">
        <div className="inscrireforms">
            <h2 style={{textAlign : "center"}}>Register</h2>
            <div className="col-md-12 ">
                <label  className="form-label">Utilisateur</label>
                <input type="text" className="form-control text-left"name='nomUtilisateur' onChange={(e)=>setuser(e.target.value)}/>
            </div>
            <div className="col-md-12 ">
                <label  className="form-label">phone</label>
                <input type="text" className="form-control text-left"name='tele' onChange={(e)=>settele(e.target.value)}/>
            </div>
            <div className="col-md-12 ">
                <label  className="form-label">email</label>
                <input type="text" className="form-control text-left"name='email' onChange={(e)=>setemail(e.target.value)}/>
            </div>
            <div className="col-md-12">
                <label className="form-label">Mot de Passe</label>
                <div className="password">
                    <input type={!show ? "password" : "text"} className="form-control text-left col-md-10"  name='motdepasse' onChange={(e)=>setpass(e.target.value)} />
                    <button className='btn btn-info col-md-2' onClick={(e)=>{e.preventDefault();setShow(!show)}}>{!show ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}</button>
                </div>
            </div>
            <div className="col-md-12 ">
                <button className='btn btn-success mt-2' onClick={add}>Register</button>
            </div>
            <p className="forgot-password text-right">
                <Link className={"nav-link"} to="/Login" ><span style={{ color: '#23E717' }}>{message} Login</span> </Link>
            </p>
        </div>
    </div>
  )
}
export default Signup;