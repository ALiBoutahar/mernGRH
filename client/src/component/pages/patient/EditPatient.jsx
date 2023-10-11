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
  // const [ids, setids] = useState(id);

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
  },[id]);  
  
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
      id:id,
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
      <div className="row p-2">
        <div className=' col-md-6 '>
          <Link to={"/Patient"} className="btn btn-danger"><i className="fa fa-share"></i></Link>
        </div>
        <h1 className=' col-md-6 '>Modifier Patient</h1>
      </div>
    
    <div>
      <form className="row g-3">
      <div className="col-md-2 d-flex align-items-center">
          <img  src={`/images/files-persones/${image}`} alt="" width={170} height={170}/>
        </div> 
        <div className="col-md-10 row d-flex align-items-center">
          <div className="col-md-6 d-flex align-items-center">
            <label className="w-25 form-control text-center" style={{marginTop:"3%"}}> CIN </label>
            <input type="text" value= {cin} className=" form-control text-center" onChange={(e)=>setcin(e.target.value)}
            style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
          </div>  
          <div className="col-md-6 d-flex align-items-center">
            <label className="w-25 form-control text-center" style={{marginTop:"2%"}}> Valide </label>
            <input type="text" value= {valide} className=" form-control text-center" onChange={(e)=>setvalide(e.target.value)}
            style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
          </div>  
          <div className="col-md-6 d-flex align-items-center">
            <label className="w-25 form-control text-center" style={{marginTop:"3%"}}> Nom </label>
            <input type="text" value= {nom} className=" form-control text-center" onChange={(e)=>setnom(e.target.value)}
            style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
          </div>  
          <div className="col-md-6 d-flex align-items-center">
            <label className="w-25 form-control text-center" style={{marginTop:"3%"}}> Prenom </label>
            <input type="text" value= {prenom} className=" form-control text-center" onChange={(e)=>setprenom(e.target.value)}
            style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
          </div>
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
            <select id="type" name='type' className="form-control" onChange={(e)=>settype(e.target.value)} style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' , border: 'none'}}>
                <option selected disabled>{type}</option>
                <option value="stagiaire">stagiaire</option>
                <option value="employé">employé</option>
            </select>
          </div>

        {/* *************************************************** */}

        <div className="col-12  d-flex justify-content-end">
            <button type="submit" className="w-25 btn btn-success" onClick={Add}>Modifier</button>
        </div>
      </form>
    </div>
</div>
  )
}

export default EditPatient