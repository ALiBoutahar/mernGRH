import React, { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './patient.css'
// import Swal from 'sweetalert2'
import SideNavBar from '../../SideNavBar/SideNavBar'
function Patients() {
    const [patient, setPatient] = useState([])
    const [patientItem, setPatientItem] = useState([])


    // useEffect(() => {
    //     axios.post("http://localhost:5000/list_produit")
    //     .then(res => {
    //         const use = res.data.data;
    //         setlist(use);
    //     });
    // },[]); 
    
    // const handleDelete=(id)=>{
    //     console.log(id);
    //     axios.post("http://localhost:5000/sup_produit", {id})
    //     .then(Response=>{
    //        console.log(Response.data)
    //     });
    //     setlist(list.filter((produit)=>{return produit._id !==id}))           
    // }


    // function getPatient() {
    //     axios.get('http://localhost/Pharmacie/backend/tables/Patients.php')
    //         .then(response => {
    //             setPatient(response.data)
    //             setPatientItem(response.data)
    //         })
    // }
    // useEffect(() => {
    //     document.title = "Patients"
    //     getPatient()
    // }, [])
    useEffect(() => {
        axios.post("http://localhost:5000/persone")
        .then(res => {
            const use = res.data.data;
            setPatient(use)
            setPatientItem(use)
        });
    },[]);  
    // const deletePatient = (ids) => {
    //     Swal.fire({
    //         title: 'es-tu sûr ?',
    //         text: "Vous ne pourrez pas revenir en arrière !",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Oui, Supprimer!',
    //         cancelButtonText: 'Annuler'
    //         }).then((result) => {
    //         if (result.isConfirmed){
    //           Swal.fire(
    //             'Supprimé!',
    //             'Notre Patient a été supprimé.',
    //             'success'
    //           )
    //           axios.delete(`http://localhost/Pharmacie/backend/tables/Patients.php/${ids}/delete`)
    //             .then(response => {
    //                 console.log(response.data)
    //                 getPatient()
    //             })
    //         }
    //     })
    // }
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

    const handleDelete=(id)=>{
        console.log(id);
        axios.post("http://localhost:5000/sup_personne", {id})
        .then(Response=>{
           console.log(Response.data)
        });
        setPatient(patient.filter((pers)=>{return pers._id !==id}))           
    }

    const mapping = patient && patient.map(item => (
        <tr style={{backgroundColor: '#EAEDED '}} align='center' key={item._id}>
            <td colSpan={1}>{item.nom}</td>
            <td colSpan={1}>{item.prenom}</td>
            <td colSpan={2}>{item.email}</td>
            <td colSpan={1}>{item.tele}</td>
            <td colSpan={1}>{item.service}</td>
            <td className='chose'colSpan={2}>
                {/* <button className='btn btn-danger' onClick={() => { deletePatient(item.id) }}><i className="fa fa-solid fa-trash"></i></button> */}
                <button className='btn btn-danger'  onClick={()=>handleDelete(item._id)}><i className="fa fa-solid fa-trash"></i></button>
                <Link to={`/Patient/${item._id}/EditPatient`} className='btn btn-warning'><i className="fa fa-pencil"></i></Link>
                <Link to={`/Patient/DetailsPatient/${item._id}`} className='btn btn-primary '><i className="fa fa-eye"></i></Link>
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
            <h1 className='mt-1'>
                Personne
            </h1>
            <div className='searchBar my-2'>
                <Link to={"/AjouterPatient"} className='btn btn-success mx-2'>Ajouter</Link>
                <input className="form-control mr-sm-2 mx-1" type="search" onChange={Rechercher} placeholder="Rechercher Persone avec le Nom" aria-label="Search" />
            </div>
            <table className="table table-fixed">
                <thead style={{backgroundColor: '#D7DBDD'}}>
                    <tr align='center'>
                        <td colSpan={1}>Nom</td>
                        <td colSpan={1}>Prénom</td>
                        <td colSpan={2}>email</td>
                        <td colSpan={1}>phone</td>
                        <td colSpan={1}>service</td>
                        <td colSpan={2}>Action</td>
                    </tr>
                </thead>
                <tbody >
                    {mapping}
                </tbody>
            </table>
        </div>
        </div>
    </div>
        
    )
}

export default Patients