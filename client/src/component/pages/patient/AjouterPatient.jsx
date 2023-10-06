import { useState, useRef } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import SideNavBar from '../../SideNavBar/SideNavBar';

function AjouterPatient() {
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
    const [name, setname] = useState("");
    const [value, setvalue] = useState("");
    const [competances, setcompetances] = useState([]);
    const inputRef = useRef(null);


    const Comp=(e)=>{
        e.preventDefault();
        inputRef.current.focus();
        setname('');
        setvalue('');
        setcompetances([...competances, { name: name, value: value }]);
    }
    const Supp=(e)=>{
        e.preventDefault();
        setname('');
        setvalue('');
        setcompetances([]);
    }

    const handleDelete=(name)=>{
        setcompetances(competances.filter((pers)=>{return pers.name !==name}))           
    }

    const Add=(e)=>{
        e.preventDefault();
        setcin('');
        setnom('');
        setprenom('');
        setemail('');
        settele('');
        setservice('');
        setnaissance('');
        setcompetances([]);
        axios.post("http://localhost:5000/Add_persone", 
        {
            cin:cin,
            nom:nom,
            prenom:prenom,
            email:email,
            tele:tele,
            naissance:naissance,
            image:image,
            cv:cv,
            service:service,
            type:type,
            competance:competances,
            valide:0,  
        }, 
        {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
        }
        )
            .then(Response => {
            console.log(Response.data);
        });
    }
    
    return (
    // <div className="bodycontant">
    //     <div className='sidebar'>
    //     <SideNavBar/>
    //     </div>
        // <div className='content'></div> x = container
        <div className='x mx-2 mt-2' >
            <div className='container add' >
                <Link to={"/Patient"} className="btn btn-danger"><i className="fa fa-share"></i></Link>
                <h1 className='mt-2'>
                    Ajouter Personne
                </h1>
                <br />
                <div>
                    <form className="row g-3" enctype="multipart/form-data">
                        <div className="input-group col-12">
                            <div className="input-group row g-3 mx-1">
                                <button className="w-75 btn btn-outline-secondary border-right-0 " type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Ajouter Competances Obligatoir</button>
                                <label className="w-25 form-control text-center border-dark border-left-0 rounded-right"> {competances.length} </label>
                                <div className="dropdown-menu">
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <input type="text" className="form-control" id="cin" name='cin' value={name} ref={inputRef} onChange={(e)=>setname(e.target.value)} placeholder="Name "/>
                                        </div>
                                        <div className="col-4">
                                            <input type="text" className="form-control" id="service" name='service' value={value}  onChange={(e)=>setvalue(e.target.value)} placeholder="1 à 5 Niveau" />
                                        </div>
                                        <div className="col-4 text-center">
                                            <input type="submit" className="btn btn-success " onClick={Comp} value="Ajouter"/>
                                            <input type="submit" className="btn btn-danger mx-1" onClick={Supp} value="delete *"/>
                                        </div>
                                    </div>
                                    {competances.map((product) => (
                                    <div className="row g-3">
                                        <div className="col-md-4">
                                            <input type="text" className="form-control" id="cin" name='cin' value={product.name} />
                                        </div>
                                        <div className="col-4">
                                            <input type="text" className="form-control" id="service" name='service' value={product.value}  />
                                        </div>
                                        <div className="col-4 text-center">
                                            <input type="submit" className=' mt-1 btn btn-danger btn-sm' value="X" onClick={()=>handleDelete(product.name)}/>
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </div>    
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" id="cin" name='cin' value={cin} onChange={(e)=>setcin(e.target.value)} placeholder="CIN"/>
                        </div>
                        <div className="col-6">
                            <input type="text" className="form-control" id="service" name='service' value={service}  onChange={(e)=>setservice(e.target.value)} placeholder="SERVICE" />
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" id="nom" name='nom' value={nom} onChange={(e)=>setnom(e.target.value)} placeholder="NOM"/>
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" id="prenom" name='prenom' value={prenom} onChange={(e)=>setprenom(e.target.value)} placeholder="PRENOM"/>
                        </div>
                        <div className="col-md-6">
                            <input type="text" className="form-control" id="tele" name='tele' value={tele} onChange={(e)=>settele(e.target.value)} placeholder="PHONE"/>
                        </div>
                        <div className="col-md-6">
                            <input type="email" className="form-control" id="email" name='email' value={email} onChange={(e)=>setemail(e.target.value)} placeholder="E-MAIL"/>
                        </div>
                        <div className="col-6">
                            <label className="form-label">Date de naissance</label>
                            <input type="date" className="form-control" id="dateN" name='datenaissance'  onChange={(e)=>setnaissance(e.target.value)} placeholder="Entrez la date de naissance" />
                        </div>
                        <div className="col-6">
                            <label className="form-label">image</label>
                            <input type="file" className="form-control" id="image" name='image' onChange={(e)=>setimage(e.target.files[0])} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Type</label>
                            <select id="type" name='type' className="form-control" onChange={(e)=>settype(e.target.value)}>
                                <option selected disabled >Select Type</option>
                                <option value="Stagiair">Stagiair</option>
                                <option value="Employer">Employer</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label className="form-label">cv</label>
                            <input type="file" className="form-control" id="cv" name='cv' onChange={(e)=>setcv(e.target.files[0])} />
                        </div>
                        {/* *************************************************** */}
                        <div className="col-12">
                            <button type="submit" className="btn btn-success" onClick={Add}>Ajouter</button>
                            <Link to={"/Patient"} className="btn btn-warning mx-1">Annuler</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    // </div>
)    
}

export default AjouterPatient



