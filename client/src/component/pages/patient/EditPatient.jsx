import React, { useEffect, useState } from 'react'
import { useParams , useNavigate , Link } from 'react-router-dom'
import axios from 'axios'

function EditPatient() {
  const navigate = useNavigate()
  const [cin, setcin] = useState("");
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [email, setemail] = useState("");
  const [tele, settele] = useState("");
  const [image, setimage] = useState("");
  const [service, setservice] = useState("");
  const [type, settype] = useState("");
  const [naissance, setnaissance] = useState("");
  const [valide, setvalide] = useState("");
  const {id} = useParams();
  const [ids, setids] = useState(id);

  useEffect(() => {
    axios.post("http://localhost:5000/persone_data",{id})
      .then(res => {
        setcin(res.data.data.cin);
        setnom(res.data.data.nom);
        setprenom(res.data.data.prenom);
        setemail(res.data.data.email);
        settele(res.data.data.tele);
        setimage(res.data.data.image);
        setservice(res.data.data.service);
        setnaissance(res.data.data.naissance);
        settype(res.data.data.type);
        setvalide(res.data.data.valide);
      });
  },[]);  
  
  const Add=(e)=>{
    e.preventDefault();
    setcin('');
    setnom('');
    setprenom('');
    setemail('');
    settele('');
    setimage('');
    setservice('');
    setnaissance('');
    settype('');
    setvalide('');
    
    const object ={
      id:ids,
      cin:cin,
      nom:nom,
      prenom:prenom,
      email:email,
      tele:tele,
      naissance:naissance,
      image:image,
      service:service,
      type:type,
      valide:valide,  
    };
    axios.post("http://localhost:5000/edit_personne", object)
    .then(Response=>{
       console.log(Response.data)
    });
    navigate(-1);
  } 

  return (
    <div className='container'>
      <Link to={"/Patient"} className="btn btn-danger mt-1"><i className="fa fa-share"></i></Link>
    <h1 className='mt-1'>
        Modifier Patient
    </h1>
    <div>
    <form className="row g-3">
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center"> CIN </label>
          <input type="text" value= {cin} className=" form-control text-center" onChange={(e)=>setcin(e.target.value)}
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>  
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center"> valide </label>
          <input type="text" value= {valide} className=" form-control text-center" onChange={(e)=>setvalide(e.target.value)}
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center"> Nom </label>
          <input type="text" value= {nom} className=" form-control text-center" onChange={(e)=>setnom(e.target.value)}
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>  
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center"> Prenom </label>
          <input type="text" value= {prenom} className=" form-control text-center" onChange={(e)=>setprenom(e.target.value)}
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center"> Phone </label>
          <input type="text" value= {tele} className=" form-control text-center" onChange={(e)=>settele(e.target.value)}
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center"> E-mail </label>
          <input type="text" value= {email} className=" form-control text-center" onChange={(e)=>setemail(e.target.value)}
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center"> Naissance </label>
          <input type="text" value= {naissance} className=" form-control text-center" onChange={(e)=>setnaissance(e.target.value)}
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center"> Image </label>
          <input type="text" value= {image} className=" form-control text-center" onChange={(e)=>setimage(e.target.value)}
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center"> Service </label>
          <input type="text" value= {service} className=" form-control text-center" onChange={(e)=>setservice(e.target.value)}
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>  
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center"> Type </label>
          <input type="text" value= {type} className=" form-control text-center" onChange={(e)=>settype(e.target.value)}
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>

      {/* *************************************************** */}

      <div className="col-12">
          <button type="submit" className="btn btn-success" onClick={Add}>Modifier</button>
          <Link to={"/Patient"} className="btn btn-warning mx-1">Annuler</Link>
      </div>
    </form>
    </div>
</div>
  )
}

export default EditPatient