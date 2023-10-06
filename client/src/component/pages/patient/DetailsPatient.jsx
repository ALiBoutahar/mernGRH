import React, {useState,useEffect} from "react"
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";
function DetailsPatient() {
  const [cin, setcin] = useState("");
  const [nom, setnom] = useState("");
  const [prenom, setprenom] = useState("");
  const [email, setemail] = useState("");
  const [tele, settele] = useState("");
  const [image, setimage] = useState("");
  const [cv, setcv] = useState("");
  const [service, setservice] = useState("");
  const [type, settype] = useState("");
  const [naissance, setnaissance] = useState("");
  const [competance, setcompetance] = useState([]);  
  const {id} = useParams();
    useEffect(() => {
      fetch("http://localhost:5000/persone_data", {
          method:"POST",
          crossDomain:true,
          headers:{
              "Content-Type":"application/json",
               Accept:"application/json",
              "Access-Control-Allow-Origin":"*",
          },
          body: JSON.stringify({
              id:id
          }),
      })
      .then((res)=>res.json())
      .then((data)=>{
        setcin(data.data.cin);
        setnom(data.data.nom);
        setprenom(data.data.prenom);
        setemail(data.data.email);
        settele(data.data.tele);
        setimage(data.data.image);
        setcv(data.data.cv);
        setservice(data.data.service);
        setnaissance(data.data.naissance);
        settype(data.data.type);
        setcompetance(data.data.competance);
      }); 
  },[]);  

  return (
    <div className='container'>
       <Link to={"/Patient"} className="btn btn-danger mt-1 mb-2"><i className="fa fa-share"></i></Link>
      <form className="row g-3">
        <div className="col-md-2 d-flex align-items-center">
          <img src={`/images/${image}`} alt="" width={100} height={100}/>
        </div>
        <div className="col-md-5 d-flex align-items-center">
          <label className="w-25 form-control text-center" style={{marginTop:"3%"}}> CIN </label>
          <input type="text" value= {cin} className=" form-control text-center"
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>  
        <div className="col-md-5 d-flex align-items-center">
          <label className="w-25 form-control text-center" style={{marginTop:"3%"}}> Nom </label>
          <input type="text" value= {nom} className=" form-control text-center"
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>  
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center" style={{marginTop:"3%"}}> Prenom </label>
          <input type="text" value= {prenom} className=" form-control text-center"
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center" style={{marginTop:"2%"}}> Phone </label>
          <input type="text" value= {tele} className=" form-control text-center"
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center" style={{marginTop:"2%"}}> E-mail </label>
          <input type="text" value= {email} className=" form-control text-center"
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center" style={{marginTop:"2%"}}> Naissance </label>
          <input type="text" value= {naissance} className=" form-control text-center"
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>
        
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center" style={{marginTop:"2%"}}> Service </label>
          <input type="text" value= {service} className=" form-control text-center"
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>  
        <div className="col-md-6 d-flex align-items-center">
          <label className="w-25 form-control text-center" style={{marginTop:"3%"}}> Type </label>
          <input type="text" value= {type} className=" form-control text-center"
          style={{marginLeft:"5%" , backgroundColor: '#e3f2fd' }}/>
        </div>
        <div className="row g-2 align-items-center" >
          <h3  className="mx-2">Competance</h3>
          {competance.map((p) => (
            <div className="col-md-3 d-flex align-items-center">
              <input type="text" value= {p.name} className=" form-control text-center"/>
              <input type="text" value= {p.value} className="w-25 form-control text-center" style={{color: 'red' }}/>
            </div>
          ))}
        </div>
        <iframe
          src={`/images/${cv}`}
          style={{ width: '100%', height: '500px', border: 'none' }}
          title="PDF Viewer"
          />
        </form>
  </div>
  )
}
export default DetailsPatient