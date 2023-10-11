import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { Link } from 'react-router-dom'


// import './patient.css'
import SideNavBar from '../../SideNavBar/SideNavBar'
function Patients() {
    const navigate = useNavigate()
    const [date, setdate] = useState(new Date().toISOString().split('T')[0])
    const [patient, setPatient] = useState([])
    const [patientItem, setPatientItem] = useState([])
    const [absences, setabsences] = useState([])

    useEffect(() => {
        axios.post("http://localhost:5000/persone")
        .then(res => {
            const use = res.data.data;
            const result = use.filter(patient => {
                if (patient.absences) {
                    return !patient.absences.some(absence => absence.date === date);
                }
                return true;
            });
            setPatientItem(result);
            setPatient(result);
        });
    },[]);  

    const Rechercher = (e) => {
        if (e.target.value === "") {
            setPatient(patientItem)
            return;
        }
        else {
            const result = patient.filter(item => item.nom.toLowerCase().search(e.target.value.toLowerCase()) !== -1)
            setPatient(result)
        }
    }
    const Comp=(id)=>{
        setdate(new Date().toISOString().split('T')[0]);
        setabsences([...absences, {id:id, date: date, notif: "on" }]);
    }

    const addabcences=()=>{
        axios.post("http://localhost:5000/ajouter-absence", { absences }) 
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error("Error adding absences:", error);
        });
        navigate(-1);
    }

    const mapping = patient && patient.map(item => (
        <tr className='p-0' style={{backgroundColor: '#EAEDED '}} align='center' key={item._id}>
            <td className='p-0' colSpan={1}><img src={`/images/files-persones/${item.image}`} alt="" width={50}/></td>
            <td className='p-0' colSpan={1}><input type="text" className="form-control" id="cin" name='cin' value={item.cin} disabled /></td>
            <td className='p-0' colSpan={1}><input type="text" className="form-control" id="nom" name='nom' value={item.nom} disabled /></td>
            <td className='p-0' colSpan={1}><input type="text" className="form-control" id="prenom" name='prenom' value={item.prenom} disabled /></td>
            <td className='p-0' colSpan={1}>
                <div class="form-check form-switch">
                    <input className='form-check-input' type="checkbox" id='notif' name={item._id} onChange={()=>Comp(item._id)} />
                </div>
            </td>
        </tr>
    ))
    return (
 
    <div className="bodycontant">
        <div className='sidebar'>
            <SideNavBar/>
        </div> 
        <div className='content'></div>
        <div className='container mx-2 mt-1' >
            <div className='container'>
            <h1 className='w-75 mt-1'> ajouter les absances du {date}</h1>
            <div className='searchBar my-2'>
                <Link to={"/AfficherAbsences"} className=" btn btn-danger mx-2"><i className="fa fa-share"></i></Link>
                <input className="form-control mr-sm-2 mx-1" type="search" onChange={Rechercher} placeholder="Rechercher Persone avec le Nom" aria-label="Search" />
            </div>
            <table className="table table-fixed">
                <thead style={{backgroundColor: '#D7DBDD'}}>
                    <tr align='center'>
                        <td colSpan={1}>image</td>
                        <td colSpan={1}>Cin</td> 
                        <td colSpan={1}>Nom</td>
                        <td colSpan={1}>Prénom</td>
                        <td colSpan={1}>notif</td>
                    </tr>
                </thead>
                <tbody >
                    {mapping}
                    <tr align='center'>
                        <td colSpan={6}></td>
                        <td className='chose 'colSpan={2}>
                            <button className='btn btn-success'  onClick={()=>addabcences()}>Enregistrer</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    </div>  
    )
}

export default Patients