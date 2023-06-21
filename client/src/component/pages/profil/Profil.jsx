import React , {useState , useEffect} from 'react'
import axios from 'axios';
import './login.css'
function Profil() {
    const [isDisabled, setIsDisabled] = useState(true);
    const [show , setShow] = useState(false)
    const [utilisateur , setUtilisateur] = useState()
    const [motdepasse , setMotdepasse] = useState()
    const [email , setEmail] = useState()
    const [numero , setNumero]  = useState()
    // const [id , setid]  = useState(window.localStorage.getItem("token"))

    
    const Editting = (e) =>{
        e.preventDefault()
        setIsDisabled(!isDisabled)
        const data = {
            user : utilisateur,
            tele : numero,
            email : email,
            pass : motdepasse
        } 
        if(!isDisabled){
            axios.post("http://localhost:5000/edit_user",data)
            .then((Response)=>{
        })
        }
    }

    useEffect(()=>{
        fetch("http://localhost:5000/userData", {
            method:"POST",
            crossDomain:true,
            headers:{
                "Content-Type":"application/json",
                 Accept:"application/json",
                "Access-Control-Allow-Origin":"*",
            },
            body: JSON.stringify({
                token:window.localStorage.getItem("token"),
            }),
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data.data)
            setUtilisateur(data.data.user)
            setMotdepasse(data.data.pass)
            setEmail(data.data.email)
            setNumero(data.data.tele)
            
        });
    },[])
  return (
    <div className="container">
        <form className='mt-2 mx-5' id='login'> 
            <h1 className="align-center"> <i className="fa fa-user align-center"></i> Profile</h1>
            <br />
            <div className="col-md-12 ">
                <label  className="form-label">Utilisateur</label>
                <input type="text" className="form-control " disabled={isDisabled} value={utilisateur || ""} name='nomUtilisateur' onChange={e=>{setUtilisateur(e.target.value)}} />
            </div>
            <div className="col-md-12">
                <label className="form-label">Mot de Passe</label>
                <div className="password">
                    <input type={!show ? "password" : "text"} className="form-control col-md-9" id='pass'  disabled={isDisabled} value={motdepasse || ""} name='motdepasse' onChange={e=>{setMotdepasse(e.target.value)}}/>
                    <button className='btn btn-info col-md-2 mx-3' onClick={(e)=>{e.preventDefault();setShow(!show)}}>{!show ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}</button>
                </div>
            </div>
            <div className="col-md-12">
                <label  className="form-label">E-mail</label>
                <input type="text" className="form-control" disabled={isDisabled} value={email || ""} name='email' onChange={e=>{setEmail(e.target.value)}}/>
            </div>
            <div className="col-md-12">
                <label  className="form-label">Numéro</label>
                <input type="text" className="form-control"  disabled={isDisabled} value={numero || ""} name='numero' onChange={e=>{setNumero(e.target.value)}} />
            </div>
            <hr className="style1"></hr>
            <button className='btn btn-warning' onClick={Editting}>Modifier</button>
            {!isDisabled ? <button className='btn btn-danger mx-2' onClick={()=>setIsDisabled(!isDisabled)}>Annuler</button> : ""}
        </form>
    
    </div>
  )
}

export default Profil